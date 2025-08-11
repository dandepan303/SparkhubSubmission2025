'use client';

import { DefaultAPIRet, JobCreateArgs } from '@/types';
import { useState, useMemo } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import axios from 'axios';
import { parseError } from '@/lib/util/server_util';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/dashboard-sidebar';
import Header from '@/components/dashboard/dashboard-header';
import { useSidebar } from '@/components/context/sidebar-context';
import FloatingMessage from '@/components/ui/floating-message';

export default function CreateJobPage() {
	const [status, setStatus] = useState<{ status: 'success' | 'error' | 'loading' | 'null'; message: string }>({
		status: 'null',
		message: '',
	});

	const { session, user } = useAuth();
	const router = useRouter();
	const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar();

	const userName = useMemo(() => {
		return user?.data?.user_metadata?.name || user?.data?.email?.split("@")[0] || "User";
	}, [user?.data?.user_metadata?.name, user?.data?.email]);

	const createJob = async (title: string, description: string, location: string, payment: number) => {
		try {
			setStatus({ status: 'loading', message: '' });

			const controller = new AbortController();
			setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

			const jobData: JobCreateArgs = {
				title,
				description,
				location,
				payment,
			};

			const { data: res }: { data: DefaultAPIRet } = await axios.post('/api/job/create', jobData, {
				signal: controller.signal,
				withCredentials: true,
				validateStatus: () => true,
				headers: { Authorization: `Bearer ${session?.data?.access_token}` },
			});

			if (res.status === 'error') {
				setStatus({ status: 'error', message: res.message });
			} else {
				setStatus({ status: 'success', message: 'Job created successfully!' });
				// Redirect to dashboard after successful creation
				setTimeout(() => {
					router.push('/profile');
				}, 1500);
			}
		} catch (error: any) {
			console.log('/create-job createJob error');
			await parseError(error.message, error.code);

			setStatus({ status: 'error', message: 'There was an issue creating the job' });
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<Sidebar
				isOpen={sidebarOpen}
				onToggle={toggleSidebar}
				user={{
					name: userName,
					email: user?.data?.email || 'no email set',
				}}
			/>
			<Header
				sidebarOpen={sidebarOpen}
				onSidebarToggle={toggleSidebar}
				user={{
					name: userName,
					email: user?.data?.email || 'no email set',
				}}
			/>

			{/* Status Messages - Positioned like in dashboard */}
			<div className={`fixed transition-all duration-300 ${sidebarOpen ? 'lg:left-64' : 'lg:left-16'} left-0 pointer-events-none top-20 right-0 z-[60]`}>
				{status.status === 'success' && status.message && (
					<div className="pointer-events-auto flex justify-center pt-4">
						<FloatingMessage type="success">
							{status.message}
						</FloatingMessage>
					</div>
				)}
				{status.status === 'error' && status.message && (
					<div className="pointer-events-auto flex justify-center pt-4">
						<FloatingMessage type="error">
							{status.message}
						</FloatingMessage>
					</div>
				)}
			</div>

			<main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} pt-20 lg:pt-24 pb-20 lg:pb-0`}>
				<div className="min-h-screen bg-white">
					<div className="relative z-10 mx-auto max-w-4xl px-6 py-8">
						{/* Header Section */}
						<div className="mb-8 text-center">
							<h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
								Create
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Job</span>
							</h1>
							<p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
								Post a new job opportunity and connect with talented professionals in your community.
							</p>
						</div>

						{/* Job Creation Form */}
						<div className="rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-md">
							<form onSubmit={(e) => {
								e.preventDefault();
								const formData = new FormData(e.currentTarget);
								const title = formData.get('title') as string;
								const description = formData.get('description') as string;
								const location = formData.get('location') as string;
								const payment = Number(formData.get('payment'));
								
								if (title && description && location && payment >= 0) {
									createJob(title, description, location, payment);
								}
							}} className="space-y-6">
								<div>
									<label className="mb-2 block text-sm font-semibold text-gray-700">
										Job Title
									</label>
									<input
										type="text"
										name="title"
										placeholder="Enter job title..."
										className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
										required
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-semibold text-gray-700">
										Description
									</label>
									<textarea
										name="description"
										placeholder="Describe the job requirements and responsibilities..."
										className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
										rows={4}
										required
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-semibold text-gray-700">
										Location
									</label>
									<input
										type="text"
										name="location"
										placeholder="Enter job location..."
										className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
										required
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-semibold text-gray-700">
										Payment ($)
									</label>
									<input
										type="number"
										name="payment"
										placeholder="0"
										min="0"
										step="1"
										className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
										required
									/>
								</div>

								<div className="flex gap-4">
									<button
										type="submit"
										disabled={status.status === 'loading'}
										className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
									>
										{status.status === 'loading' ? 'Creating Job...' : 'Create Job'}
									</button>
									<button
										type="button"
										onClick={() => router.back()}
										className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:scale-105"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}