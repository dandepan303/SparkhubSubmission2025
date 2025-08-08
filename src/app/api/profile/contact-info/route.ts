import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseError } from '@/lib/util/server_util';

export async function POST(request: Request) {
	const { contactInfo } = await request.json();

	try {
		const supabase = await createServerSupabaseClient();
		
		const auth = request.headers.get('authorization');
		const token = auth?.split(' ')[1];
		const {data, error} = await supabase.auth.getUser(token);

		if (!data?.user) return NextResponse.json({ status: 'error', message: 'Please sign in first' }, { status: 401 });
		if (error) return NextResponse.json({ status: 'error', message: await parseError(error.message, error.code) }, { status: 401 });

		await prisma.user.update({
			where: { id: data.user.id },
			data: { contactInfo: contactInfo }
		});

		return NextResponse.json({ status: 'success', message: 'Contact info updated' }, { status: 200 });
	} catch (err: any) {
		console.log('api/profile/contact-info/route.ts post error');
		return NextResponse.json({ status: 'error', message: await parseError(err.message, err.code) }, { status: 500 });
	}
}