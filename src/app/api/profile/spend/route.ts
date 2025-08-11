import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, SpendArgs } from '@/types';

export async function POST(request: Request) {
  try {
    const { offeringId, quantity }: SpendArgs = await request.json();

    // Basic validation
    if (!offeringId || typeof offeringId !== 'string' || offeringId.trim().length === 0) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Offering ID is required' }, { status: 400 });
    }
    if (quantity !== undefined && (typeof quantity !== 'number' || !Number.isFinite(quantity) || Math.floor(quantity) !== quantity || quantity <= 0)) {
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Quantity must be a positive integer' }, { status: 400 });
    }

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Please sign in first' }, { status: 401 });
    if (error) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, (error as any).code) }, { status: 401 });

    const userId = data.user.id;

    // Get the offering with owner information
    const offering = await prisma.offering.findUnique({
      where: { id: offeringId },
      include: {
        owner: {
          include: {
            jobsCreated: {
              where: {
                workerId: userId,
                status: 'COMPLETED'
              }
            }
          }
        }
      }
    });

    if (!offering) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Offering not found' }, { status: 404 });

    // Check if the user has worked for the offering owner and completed jobs
    const completedJobs = offering.owner.jobsCreated;
    if (completedJobs.length === 0) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'You must complete a job with this user before making purchases' }, { status: 403 });

    // Find a suitable job with sufficient payment
    const spendQuantity = quantity || 1;
    const totalCost = offering.cost * spendQuantity;
    
    const suitableJob = completedJobs.find(job => job.payment >= totalCost);
    if (!suitableJob) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Insufficient payment available from completed jobs' }, { status: 403 });

    // Check offering quantity if it's limited
    if (offering.quantity !== null && offering.quantity < spendQuantity) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: `Insufficient quantity available. Only ${offering.quantity} remaining` }, { status: 400 });

    // Perform the transaction
    await prisma.$transaction(async (tx) => {
      // Reduce job payment
      await tx.job.update({
        where: { id: suitableJob.id },
        data: {
          payment: suitableJob.payment - totalCost
        }
      });

      // Reduce offering quantity if applicable
      if (offering.quantity !== null) {
        await tx.offering.update({
          where: { id: offeringId },
          data: {
            quantity: offering.quantity - spendQuantity
          }
        });
      }

      // notify
      const notification = `${data.user.user_metadata.name} purchased ${spendQuantity} x "${offering.description}" for $${totalCost}`;
      await tx.user.update({
        where: { id: offering.userId },
        data: {
          notifications: {
            push: notification,
          },
          newNotifications: true,
        },
      });
    });

    return NextResponse.json<DefaultAPIRet>({ 
      status: 'success', 
      message: `Successfully purchased ${spendQuantity} x "${offering.description}" for $${totalCost}` 
    }, { status: 200 });

  } catch (err: any) {
    console.log('api/profile/spend/route.ts post error:', err);
    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(err.message, err.code) }, { status: 500 });
  }
}
