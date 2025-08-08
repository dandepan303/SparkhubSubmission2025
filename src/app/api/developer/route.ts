import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminSupabaseClient } from '@/lib/supabase/admin';
import { parseError } from '@/lib/util/server_util';
import { DeveloperDeleteArgs, DeveloperDeleteRet } from '@/types';
import { isAuthorized } from '@/lib/util/util';
import prisma from '@/lib/prisma/prisma';

export async function DELETE(request: Request) {
  try {
    const { deleteAuth, deleteUserDb, targetUserId } = (await request.json()) as DeveloperDeleteArgs;

    if (!deleteAuth && !deleteUserDb) {
      return NextResponse.json<DeveloperDeleteRet>({ status: 'error', message: 'Specify at least one action: deleteAuth or deleteUserDb' }, { status: 400 });
    }

    // Authenticated user check
    const supabase = await createServerSupabaseClient();

    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data: userData, error: authError } = await supabase.auth.getUser(token);

    if (!userData?.user) return NextResponse.json<DeveloperDeleteRet>({ status: 'error', message: 'Please sign in to access this' }, { status: 401 });
    if (authError) return NextResponse.json<DeveloperDeleteRet>({ status: 'error', message: await parseError(authError.message, authError.code) }, { status: 401 });

    // Require developer role
    const userRole = (userData.user.user_metadata as any)?.role || (userData.user.app_metadata as any)?.role;
    if (!isAuthorized(userRole, 'developer')) {
      return NextResponse.json<DeveloperDeleteRet>({ status: 'error', message: 'You do not have access to this' }, { status: 403 });
    }

    const userIdToDelete = targetUserId || userData.user.id;

    // Delete auth users
    if (deleteAuth) {
      const admin = createAdminSupabaseClient();
      const { error: deleteAuthError } = await admin.auth.admin.deleteUser(userIdToDelete);
      if (deleteAuthError) return NextResponse.json<DeveloperDeleteRet>({ status: 'error', message: await parseError(deleteAuthError.message, (deleteAuthError as any).code) }, { status: 400 });
    }

    // Delete db users and related data with Prisma, then seed developer users
    if (deleteUserDb) {
      // Delete dependent records first to satisfy foreign keys
      await prisma.$transaction([
        prisma.offering.deleteMany({}),
        prisma.inventory.deleteMany({}),
        prisma.rating.deleteMany({}),
        prisma.jobApplication.deleteMany({}),
        prisma.job.deleteMany({}),
        prisma.user.deleteMany({}),
      ]);
    }

    // Seed developer users
    const devEmails = process.env.DEVELOPERS.split(',');
    
    if (devEmails && devEmails.length > 0) {
      const devUsers: { id: string; email: string; name: string }[] = [];

      // developer auth sign up
      for (const email of devEmails) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: process.env.DEVELOPER_ADMIN_PASSWORD!,
          options: {
            data: {
              role: 'admin',
            },
          },
        });

        if (signUpError || !signUpData?.user) {
          continue; 
        }

        devUsers.push({
          id: signUpData.user.id,
          email: email,
          name: 'admin'
        })
      }

      // developer db sign up
      await prisma.$transaction(
        devUsers.map(dev =>
          prisma.user.upsert({
            where: { id: dev.id },
            update: { email: dev.email, name: dev.name },
            create: { id: dev.id, email: dev.email, name: dev.name },
          })
        )
      );
    }

    return NextResponse.json<DeveloperDeleteRet>({ status: 'success', message: 'Successfully processed developer request' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json<DeveloperDeleteRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 500 });
  }
}
