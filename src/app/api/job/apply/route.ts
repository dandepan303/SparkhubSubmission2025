import { NextResponse } from 'next/server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma/prisma';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, ApplyJobArgs } from '@/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplyJobArgs;
    const jobId = body?.jobId;

    if (!jobId || typeof jobId !== 'string') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Missing required field: jobId' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json<DefaultAPIRet>(
        { status: 'error', message: await parseError(authError?.message || 'Please sign in to apply', (authError as any)?.code) },
        { status: 401 },
      );
    }

    // Ensure job exists and is open for applications
    const job = await prisma.job.findUnique({ where: { id: jobId }, select: { id: true, status: true } });
    if (!job) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job not found' }, { status: 404 });
    }
    if (job.status !== 'SEARCHING') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job is not accepting applications' }, { status: 400 });
    }

    // Prevent duplicate applications
    const alreadyApplied = await prisma.job.findFirst({
      where: { id: jobId, applications: { some: { id: user.id } } },
      select: { id: true },
    });
    if (alreadyApplied) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'You have already applied to this job' }, { status: 409 });
    }

    // Connect user to job applications
    await prisma.job.update({ where: { id: jobId }, data: { applications: { connect: { id: user.id } } } });

    return NextResponse.json<DefaultAPIRet>({ status: 'success', message: 'Application submitted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 500 });
  }
}
