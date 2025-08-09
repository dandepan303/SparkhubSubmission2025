import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';
import { DefaultAPIRet, OfferingGetRet, OfferingPostArgs, OfferingDeleteArgs } from '@/types';

export async function GET(request: Request) {
  try {
    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user) return NextResponse.json<OfferingGetRet>({ status: 'error', message: 'Please sign in first' }, { status: 401 });
    if (error)
      return NextResponse.json<OfferingGetRet>({ status: 'error', message: await parseError(error.message, (error as any).code) }, { status: 401 });

    const userId = data.user.id;

    // Get all offerings for the user
    const offerings = await prisma.offering.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json<OfferingGetRet>({ status: 'success', message: '', offerings }, { status: 200 });
  } catch (err: any) {
    console.log('api/profile/offering/route.ts get error');
    return NextResponse.json<OfferingGetRet>({ status: 'error', message: await parseError(err.message, err.code) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { offeringId, description, cost, quantity }: OfferingPostArgs = await request.json();

    // Basic validation
    if (!description || typeof description !== 'string')
      return NextResponse.json({ status: 'error', message: 'Description is required' }, { status: 400 });
    if (typeof cost !== 'number' || !Number.isFinite(cost) || Math.floor(cost) !== cost || cost < 0)
      return NextResponse.json({ status: 'error', message: 'Cost must be a non-negative integer' }, { status: 400 });
    if (quantity != null && (typeof quantity !== 'number' || Math.floor(quantity) !== quantity || quantity < 0))
      return NextResponse.json({ status: 'error', message: 'Quantity, if provided, must be a non-negative integer' }, { status: 400 });

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Please sign in first' }, { status: 401 });
    if (error)
      return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, (error as any).code) }, { status: 401 });

    const userId = data.user.id;

    if (offeringId) {
      await prisma.offering.upsert({
        where: {
          id: offeringId,
        },
        update: {
          description,
          cost,
          quantity,
          updatedAt: new Date(),
        },
        create: {
          description,
          cost,
          quantity,
          userId,
        },
      });
    } else {
      await prisma.offering.create({
        data: {
          description,
          cost,
          quantity,
          userId,
        },
      });
    }

    return NextResponse.json<DefaultAPIRet>(
      { status: 'success', message: offeringId ? 'Offering updated successfully' : 'Offering created successfully' },
      { status: 200 },
    );
  } catch (err: any) {
    console.log('api/profile/offering/route.ts post error');
    return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(err.message, err.code) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { offeringId } = await request.json();

    if (!offeringId) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Offering ID is required to delete' }, { status: 400 });

    // Authenticate user
    const supabase = await createServerSupabaseClient();
    const auth = request.headers.get('authorization');
    const token = auth?.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (!data?.user) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'Please sign in first' }, { status: 401 });
    if (error) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: await parseError(error.message, error.code) }, { status: 401 });

    const userId = data.user.id;

    // Verify the offering belongs to the user
    const existingOffering = await prisma.offering.findFirst({
      where: {
        id: offeringId,
        userId: userId,
      },
    });

    if (!existingOffering) return NextResponse.json<DefaultAPIRet>({ status: 'error', message: 'You cannot delete this item' }, { status: 404 });

    // Delete the offering
    await prisma.offering.delete({
      where: {
        id: offeringId,
      },
    });

    return NextResponse.json<DefaultAPIRet>({ status: 'success', message: 'Offering deleted successfully' }, { status: 200 });
  } catch (err: any) {
    console.log('api/profile/offering/route.ts delete error');
    return NextResponse.json({ status: 'error', message: await parseError(err.message, err.code) }, { status: 500 });
  }
}
