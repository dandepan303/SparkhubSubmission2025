import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { parseError } from "@/lib/util/server_util";
import { DefaultAPIRet, Job, JobGetRet } from '@/types';
import { publicUserData } from '@/lib/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id');

    // Authenticate user (optional - you might want to allow public access to jobs)
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];

    if (token) {
      const { data, error } = await supabase.auth.getUser(token);
      if (error) {
        return NextResponse.json<JobGetRet>({ status: 'error', message: await parseError(error.message, (error as any).code) }, { status: 401 });
      }
    }

    // Get all jobs with related data
    const jobs = await prisma.job.findMany({
      where: jobId ? { id: jobId } : {},
      include: {
        hirer: {
          select: publicUserData,
        },
        worker: {
          select: publicUserData,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json<JobGetRet>(
      {
        status: 'success',
        message: 'Jobs retrieved successfully',
        jobs,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.log('api/job/route.ts GET error:', err);
    return NextResponse.json<JobGetRet>({ status: 'error', message: await parseError(err.message, err.code) }, { status: 500 });
  }
}
