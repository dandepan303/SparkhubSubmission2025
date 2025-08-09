import { NextResponse } from 'next/server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma/prisma';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, CompleteJobArgs } from '@/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CompleteJobArgs>;
    const { jobId } = body;

    // Validate required fields
    if (!jobId || typeof jobId !== 'string') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Missing required field: jobId' }, { status: 400 });
    }

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<DefaultAPIRet>(
        { status: 'error', message: await parseError(authError?.message || 'Please sign in to complete jobs', (authError as any)?.code) },
        { status: 401 },
      );
    }

    // Fetch the job to validate ownership and status
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        worker: {
          select: { id: true, name: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    // Check if job belongs to the current user (hirer)
    if (job.hirerId !== user.id) {
      return NextResponse.json<DefaultAPIRet>(
        { status: 'error', message: 'You are not authorized to complete this job' },
        { status: 403 },
      );
    }

    // Check if job is in progress (can only complete jobs that are in progress)
    if (job.status !== 'IN_PROGRESS') {
      return NextResponse.json<DefaultAPIRet>({ 
        status: 'error', 
        message: job.status === 'COMPLETED' ? 'Job is already completed' : 'Job must be in progress to be completed' 
      }, { status: 400 });
    }

    // Ensure job has a worker assigned
    if (!job.worker) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job has no assigned worker' }, { status: 400 });
    }

    // Update job status to completed and add notification to worker
    await prisma.$transaction(async tx => {
      // Update job status to completed
      await tx.job.update({
        where: { id: jobId },
        data: {
          status: 'COMPLETED',
        },
      });

      // Add notification to the worker
      await tx.user.update({
        where: { id: job.worker!.id },
        data: {
          notifications: {
            push: `Job completed: ${job.title}. You can now receive ratings and the hirer can spend your offerings!`,
          },
          newNotifications: true,
        },
      });
    });

    return NextResponse.json<DefaultAPIRet>({ status: 'success', message: 'Job completed successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('api/job/complete/route.ts POST error:', error);
    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 500 });
  }
}
