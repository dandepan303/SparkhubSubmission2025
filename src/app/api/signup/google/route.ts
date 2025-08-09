import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';

import { GoogleSignUpArgs, DefaultAPIRet } from '@/types';
import { parseError } from '@/lib/util/server_util';

// create db user after google sign up
export async function POST(request: Request) {
  // Request parameter verification
  const body = await request.json();
  const { userId, email, name }: GoogleSignUpArgs = body;

  if (!userId || !email) {
    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Please provide all required information' }, { status: 400 });
  }

  try {
    try {
      await prisma.user.upsert({
        where: { id: userId },
        update: {
          email: email,
          name: name,
        },
        create: {
          id: userId,
          email: email,
          name: name,
          role: 'user'
        },
      });
    } catch (err: any) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(err.message, err.code) }, { status: 409 });
    }

    return NextResponse.json<DefaultAPIRet>({ status: 'success', message: '' }, { status: 200 });
  } catch (err: any) {
    console.log('Route: /api/profile post error');
    parseError(err);

    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Server error. Please refresh or try again later' }, { status: 500 });
  }
}
