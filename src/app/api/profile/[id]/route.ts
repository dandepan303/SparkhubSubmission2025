import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';
import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// get db user
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // getting current user id
    const supabase = await createServerSupabaseClient();

    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user) return NextResponse.json({ status: 'error', message: 'Please sign in first' }, { status: 401 });
    if (error) return NextResponse.json({ status: 'error', message: await parseError(error.message, error.code) }, { status: 401 });

    // fetching db data
    const user = await prisma.user.findUnique({
      where: { id: data.user.id },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
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
    console.log('Route: /api/route name error', error);

    return NextResponse.json({ user: null }, { status: 200 });
  }
}
