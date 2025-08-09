import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, JobCreateArgs } from '@/types';

export async function POST(request: Request) {
  try {
    const { title, description, location, payment }: JobCreateArgs = await request.json();

    // Basic validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Title is required' }, { status: 400 });
    }
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Description is required' }, { status: 400 });
    }
    if (!location || typeof location !== 'string' || location.trim().length === 0) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Location is required' }, { status: 400 });
    }
    if (typeof payment !== 'number' || !Number.isFinite(payment) || Math.floor(payment) !== payment || payment < 0) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Payment must be a non-negative integer' }, { status: 400 });
    }

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Please sign in first' }, { status: 401 });
    }
    if (error) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, (error as any).code) }, { status: 401 });
    }

    const userId = data.user.id;

    // Create job with hirer relation to user
    const job = await prisma.job.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        payment,
        hirerId: userId,
        status: 'SEARCHING',
      },
    });

    return NextResponse.json<DefaultAPIRet>({ status: 'success', message: 'Job created successfully' }, { status: 201 });
  } catch (err: any) {
    console.log('api/job/create/route.ts post error:');

    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(err.message, err.code) }, { status: 500 });
  }
}
