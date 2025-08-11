import { NextResponse } from 'next/server';
import { parseError } from '@/lib/util/server_util';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NotificationsGetRet } from '@/types';
import prisma  from '@/lib/prisma/prisma';

export async function GET(request: Request) {
  try { 
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user?.id || error) return NextResponse.json<NotificationsGetRet>({ status: 'error', message: 'Please sign in before viewing notifications' }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: {
        notifications: true,
        newNotifications: true,
      }
    });

    if (!user) return NextResponse.json<NotificationsGetRet>({ status: 'error', message: 'There was an issue loading your notifications' });

    console.log(user);

    return NextResponse.json<NotificationsGetRet>({status: 'success', message: 'Successfully loaded notifications', notifications: user.notifications, newNotifications: user.newNotifications})

  } catch (error: any) {
    console.log('/api/profile/notification get error');

    return NextResponse.json<NotificationsGetRet>({ status: 'error', message: await parseError(error.message, error.code)}, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user?.id || error) return NextResponse.json<NotificationsGetRet>({ status: 'error', message: 'Please sign in before viewing notifications' }, { status: 401 });
    
    await prisma.user.update({
      where: { id: data.user.id },
      data: {
        newNotifications: false,
      },
    })
  } catch (error: any) {
    console.log('/api/profile/notification get error');

    return NextResponse.json<NotificationsGetRet>({ status: 'error', message: await parseError(error.message, error.code)}, { status: 200 });   
  }
}