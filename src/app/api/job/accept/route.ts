import { NextResponse } from 'next/server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma/prisma';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, AcceptJobArgs, User, GetJobApplicantsRet } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    // Validate required parameter
    if (!jobId || typeof jobId !== 'string') {
      return NextResponse.json<GetJobApplicantsRet>({ status: 'error', message: 'Missing required parameter: jobId' }, { status: 400 });
    }

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error: authError } = await supabase.auth.getUser(token);
    const user = data?.user;

    if (authError || !user) {
      return NextResponse.json<GetJobApplicantsRet>(
        { status: 'error', message: await parseError(authError?.message || 'Please sign in to view applicants', (authError as any)?.code) },
        { status: 401 },
      );
    }

    // Fetch the job with its applications
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        hirerId: true,
        status: true,
        title: true,
        applications: {
          select: {
            id: true,
            email: true,
            name: true,
            contactInfo: true,
            ratingTo: {
              where: { type: 'HIRER' },
              select: {
                id: true,
                value: true,
                text: true,
                type: true,
                fromId: true,
                toId: true,
                jobId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json<GetJobApplicantsRet>({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    // Check if user is authorized to view applicants (must be the hirer)
    if (job.hirerId !== user.id) {
      return NextResponse.json<GetJobApplicantsRet>(
        { status: 'error', message: 'You are not authorized to view applicants for this job' },
        { status: 403 },
      );
    }

    return NextResponse.json<GetJobApplicantsRet>(
      {
        status: 'success',
        message: '',
        applicants: job.applications.map(applicant => ({
          ...applicant,
          ratingTo: applicant.ratingTo.map(rating => ({
            ...rating,
            type: rating.type as string,
            createdAt: rating.createdAt.toISOString(),
            updatedAt: rating.updatedAt.toISOString(),
          })),
        })),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('api/job/accept/route.ts GET error:', error);
    return NextResponse.json<GetJobApplicantsRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AcceptJobArgs>;
    const { jobId, workerId } = body;

    // Validate required fields
    if (!jobId || typeof jobId !== 'string') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Missing required field: jobId' }, { status: 400 });
    }
    if (!workerId || typeof workerId !== 'string') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Missing required field: workerId' }, { status: 400 });
    }

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json<DefaultAPIRet>(
        { status: 'error', message: await parseError(authError?.message || 'Please sign in to accept jobs', (authError as any)?.code) },
        { status: 401 },
      );
    }

    // Fetch the job with its applications to validate ownership and status
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        applications: {
          select: { id: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    // Check if job belongs to the current user (hirer)
    if (job.hirerId !== user.id) {
      return NextResponse.json<DefaultAPIRet>(
        { status: 'error', message: 'You are not authorized to accept applicants for this job' },
        { status: 403 },
      );
    }

    // Check if job is still searching (not already accepted or completed)
    if (job.status !== 'SEARCHING') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job is not accepting applications' }, { status: 400 });
    }

    // Check if the worker ID is in the job's applications
    const isApplicant = job.applications.some(applicant => applicant.id === workerId);
    if (!isApplicant) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Worker has not applied to this job' }, { status: 400 });
    }

    // Verify the worker exists
    const worker = await prisma.user.findUnique({
      where: { id: workerId },
      select: { id: true, name: true },
    });

    if (!worker) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Worker not found' }, { status: 404 });
    }

    // Perform the job acceptance in a transaction
    await prisma.$transaction(async tx => {
      // Clear all applications and set the worker
      await tx.job.update({
        where: { id: jobId },
        data: {
          applications: {
            set: [],
          },
          workerId: workerId,
          status: 'IN_PROGRESS',
        },
      });

      // Add notification to the accepted worker
      await tx.user.update({
        where: { id: workerId },
        data: {
          notifications: {
            push: `Congratulations! You have been accepted for the job: ${job.title}`,
          },
          newNotifications: true,
        },
      });
    });

    return NextResponse.json<DefaultAPIRet>({ status: 'success', message: 'Job applicant accepted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('api/job/accept/route.ts POST error:', error);
    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 500 });
  }
}
