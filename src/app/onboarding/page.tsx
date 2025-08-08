'use client'

import Onboard from "@/components/onboard";
import FloatingMessage from "@/components/ui/floating-message";
import { useSearchParams } from "next/navigation";

export default function OnboardPage() {
	const searchParams = useSearchParams();
	const message = searchParams.get('message');

	return (
		<div className='w-full h-full'>
			{message && <FloatingMessage>{message}</FloatingMessage>}
			<Onboard />
		</div>
	);
}