import { NextResponse } from 'next/server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import prisma from '@/lib/prisma/prisma';
import { parseError } from '@/lib/util/server_util';
import { EmailSignUpRet } from '@/types';

/* 
	reference types.ts for the sign in args and ret structures
*/

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;
  const password = body.password;
  const name = body.name;

  if (!email || !password || !name) {
    const retBody: EmailSignUpRet = { status: 'error', message: 'Not all fields provided: email, password, name' };
    return NextResponse.json(retBody, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();

  let auth_data_ = null;
  let user_created: boolean = false;

  try {
    // Auth sign up
    const { data: auth_data, error: auth_error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          role: 'user',
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      },
    });

    // Auth errros
    if (auth_error)
      return NextResponse.json<EmailSignUpRet>({ status: 'error', message: await parseError(auth_error.message, auth_error.code) }, { status: 400 });
    if (!auth_data.user)
      return NextResponse.json<EmailSignUpRet>({ status: 'error', message: 'There was an issue signing up. Please try again' }, { status: 500 });

    auth_data_ = auth_data;

    // DB sign up
    try {
      const db_data = await prisma.user.upsert({
        where: { id: auth_data.user.id },
        create: {
          id: auth_data.user.id,
          email: email,
          name: name,
        },
        update: {
          name: name,
        },
      });
    } catch (error: any) {
      return NextResponse.json<EmailSignUpRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 400 });
    }

    user_created = true;

    return NextResponse.json<EmailSignUpRet>(
      { status: 'success', message: `Welcome ${name}. Please confirm your email`, redirectUrl: '/enable-mfa' },
      { status: 200 },
    );
  } catch (error: any) {
    console.log('app/api/signup post error');

    if (auth_data_?.user && user_created) {
      const supabase = createAdminSupabaseClient();
      await supabase.auth.admin.deleteUser(auth_data_.user.id);
    }

    return NextResponse.json<EmailSignUpRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 500 });
  }
}
