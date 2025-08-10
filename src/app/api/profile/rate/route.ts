import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, RateJobArgs } from '@/types';

export async function POST(request: Request) {
  try {
    const body: RateJobArgs = await request.json();
    const { jobId, value, text } = body;

    // Validate required fields
    if (!jobId || typeof jobId !== 'string') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Missing required field: jobId' }, { status: 400 });
    }
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 1 || value > 5) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Rating value must be a number between 1 and 5' }, { status: 400 });
    }
    if (text !== undefined && (typeof text !== 'string' || text.length > 500)) {
      return NextResponse.json<DefaultAPIRet>(
        { status: 'error', message: 'Rating text must be a string with maximum 500 characters' },
        { status: 400 },
      );
    }

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    const user = authData?.user;

    if (authError || !user) {
      return NextResponse.json<DefaultAPIRet>(
        { status: 'error', message: await parseError(authError?.message || 'Please sign in before rating', authError.code) },
        { status: 401 },
      );
    }

    // Fetch the job to validate it exists and is completed
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        status: true,
        hirerId: true,
        workerId: true,
        title: true,
      },
    });

    if (!job) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    // Check if job is completed
    if (job.status !== 'COMPLETED') {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job must be completed before rating' }, { status: 400 });
    }

    // Determine user role and rating type
    let ratingType: 'HIRER' | 'WORKER';
    let toId: string;

    if (job.workerId === user.id) {
      // User is the worker, rating the hirer
      ratingType = 'HIRER';
      toId = job.hirerId;
    } else if (job.hirerId === user.id) {
      // User is the hirer, rating the worker
      if (!job.workerId) {
        return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Job has no assigned worker to rate' }, { status: 400 });
      }
      ratingType = 'WORKER';
      toId = job.workerId;
    } else {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'You are not authorized to rate this job' }, { status: 403 });
    }

    // Check if user has already rated this job with this rating type
    const existingRating = await prisma.rating.findFirst({
      where: {
        jobId: jobId,
        fromId: user.id,
        type: ratingType,
      },
    });

    if (existingRating) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'You have already rated this job' }, { status: 409 });
    }

    // Create the rating
    const rating = await prisma.rating.create({
      data: {
        value: value,
        text: text || null,
        type: ratingType,
        fromId: user.id,
        toId: toId,
        jobId: jobId,
      },
      include: {
        from: {
          select: { id: true, name: true },
        },
        to: {
          select: { id: true, name: true },
        },
        job: {
          select: { id: true, title: true },
        },
      },
    });

    // Add notification to the rated user
    const notificationMessage = `You received a ${value}-star rating from ${rating.from.name} for job: ${job.title}`;
    await prisma.user.update({
      where: { id: toId },
      data: {
        notifications: {
          push: notificationMessage,
        },
        newNotifications: true,
      },
    });

    return NextResponse.json<DefaultAPIRet>(
      {
        status: 'success',
        message: 'Successfully saved rating',
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('api/profile/rate/route.ts POST error:', error);
    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 500 });
  }
}
