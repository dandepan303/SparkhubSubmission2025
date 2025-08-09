import { publicUserData } from '@/lib/config';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';

// get db user
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // getting current user id
    const supabase = await createServerSupabaseClient();

    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);
    if (error) return NextResponse.json({ status: 'error', message: await parseError(error.message, error.code) }, { status: 401 });

    // fetching db data
    const user = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: data?.user
        ? {
            id: true,
            name: true,
            contactInfo: true,
            offerings: true,
            jobApplications: true,
            jobsCreated: true,
            jobsWorking: true,
            ratingsGiven: true,
            ratingsReceived: true,
            createdAt: true,
            updatedAt: true,
          }
        : publicUserData,
    });

    if (!user) return NextResponse.json({ user: null }, { status: 200 });

    return NextResponse.json(
      {
        user: {
          ...user,
          createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
          updatedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : user.updatedAt,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log('/api/profile/[id] get error');
    parseError(error.message, error.code);

    return NextResponse.json({ user: null }, { status: 200 });
  }
}
