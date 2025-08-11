import { publicUserData } from '@/lib/config';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';

// get db user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // getting current user id
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (error) return NextResponse.json({ user: null }, { status: 200 });

    // fetching db data
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: (data?.user.id === id)
        ? {
            id: true,
            name: true,
            role: true,
            contactInfo: true,
            offerings: true,
            applications: true,
            jobsCreated: true,
            jobsWorking: true,
            ratingFrom: true,
            ratingTo: true,
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
    console.log('/api/profile get error');
    parseError(error.message, error.code);

    return NextResponse.json({ user: null }, { status: 200 });
  }
}
