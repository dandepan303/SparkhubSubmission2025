"use client";

import { DefaultAPIRet, Offering, OfferingGetRet, OfferingPostArgs, User } from "@/types";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import axios from "axios";
import { parseError } from "@/lib/util/server_util";
import OfferingCard from "./offering";
import Message from "@/components/ui/message";
import Sidebar from "@/components/dashboard/dashboard-sidebar";
import Header from "@/components/dashboard/dashboard-header";
import { useSidebar } from "@/components/context/sidebar-context";
import FloatingMessage from "@/components/ui/floating-message";
import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";

export default function Inventory({ userId }: { userId: string }) {
    const router = useRouter();
    const [status, setStatus] = useState<{ status: "success" | "error" | "page-loading" | "loading" | "null"; message: string }>({
        status: "loading",
        message: "",
    });

    const [inventoryUser, setInventoryUser] = useState<User | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newOffering, setNewOffering] = useState({
        description: "",
        cost: 0,
        quantity: 1,
    });

    const { profile, session, user } = useAuth();
    const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar();

    const userName = useMemo(() => {
        return user?.data?.user_metadata?.name || user?.data?.email?.split("@")[0] || "User";
    }, [user?.data?.user_metadata?.name, user?.data?.email]);

    const loadOfferings = useCallback(async () => {
        try {
            setStatus({ status: "loading", message: "" });
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

            const {
                data: { user },
            }: { data: { user: User } } = await axios.get(`/api/profile?id=${userId}`, {
                signal: controller.signal,
                withCredentials: true,
                validateStatus: () => true,
                headers: { Authorization: `Bearer ${session?.data?.access_token}` },
            });

            if (!user) {
                setStatus({ status: "error", message: "There was an issue loading the inventory" });
                return [];
            }

            setStatus({ status: "success", message: "" });
            setInventoryUser(user);
        } catch (error: any) {
            console.error("/component/inventory fetch_offering error");
            await parseError(error.message, error.code);

            setStatus({ status: "error", message: "There was an issue loading the inventory" });
        }
    }, [userId, session?.data?.access_token, setStatus, setInventoryUser]);

    const upsertOffering = useCallback(
        async (offeringData: OfferingPostArgs) => {
            try {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 1000 * 60);

                const { data: res }: { data: OfferingGetRet } = await axios.post("/api/profile/offering", offeringData, {
                    signal: controller.signal,
                    withCredentials: true,
                    validateStatus: () => true,
                    headers: { Authorization: `Bearer ${session?.data?.access_token}` },
                });

                setStatus(res);
                if (res.status === "success") {
                    setShowCreateForm(false);
                    setNewOffering({ description: "", cost: 0, quantity: 1 });
                    loadOfferings();
                }
            } catch (error: any) {
                console.error("/component/inventory upsert_offering error");
                await parseError(error.message, error.code);

                setStatus({ status: "error", message: "There was an issue saving your changes" });
            }
        },
        [session?.data?.access_token, setShowCreateForm, setNewOffering, loadOfferings, setStatus]
    );

    const deleteOffering = useCallback(
        async (offeringId: string) => {
            try {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

                const { data: res }: { data: DefaultAPIRet } = await axios.delete("/api/profile/offering", {
                    signal: controller.signal,
                    withCredentials: true,
                    validateStatus: () => true,
                    headers: { Authorization: `Bearer ${session?.data?.access_token}` },
                    data: { offeringId },
                });

                setStatus(res);
                if (res.status === "success") {
                    loadOfferings();
                }
            } catch (error: any) {
                console.error("/component/inventory delete error");
                await parseError(error.message, error.code);

                setStatus({ status: "error", message: "There was an issue deleting your offer" });
            }
        },
        [session?.data?.access_token, loadOfferings, setStatus]
    );

    const spendOffering = useCallback(
        async (offeringId: string) => {
            try {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 1000 * 60);

                const { data: res }: { data: DefaultAPIRet } = await axios.post(
                    "/api/profile/spend",
                    { offeringId: offeringId, quantity: 1 },
                    {
                        signal: controller.signal,
                        withCredentials: true,
                        validateStatus: () => true,
                        headers: { Authorization: `Bearer ${session?.data?.access_token}` },
                        data: { offeringId },
                    }
                );

                setStatus(res);
                if (res.status === "success") {
                    loadOfferings();
                }
            } catch (error: any) {
                console.error("/component/inventory delete error");
                await parseError(error.message, error.code);

                setStatus({ status: "error", message: "There was an issue deleting your offer" });
            }
        },
        [session?.data?.access_token, setStatus, loadOfferings]
    );

    const handleCreateOffering = (e: React.FormEvent) => {
        e.preventDefault();
        if (newOffering.description.trim()) {
            const offering: OfferingPostArgs = {
                description: newOffering.description,
                cost: newOffering.cost,
                quantity: newOffering.quantity,
            };

            upsertOffering(offering);
        }
    };

    // Load offerings
    useEffect(() => {
        if (session.loading || profile.loading) return;

        if (!profile) {
            router.push("auth/sign-in/?message=Please+sign+in+first");
            return;
        }

        loadOfferings();
    }, [session.loading, profile.loading, loadOfferings, profile, router]);

    if (status.status === "loading" || session.loading || profile.loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Sidebar and Header */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={toggleSidebar}
                user={{
                    name: userName,
                    email: user?.data?.email || "No email set",
                }}
            />
            <Header
                sidebarOpen={sidebarOpen}
                onSidebarToggle={toggleSidebar}
                user={{
                    name: userName,
                    email: user?.data?.email || "no email set",
                }}
            />

            {/* Floating Message */}
            <div className={`fixed transition-all duration-300 ${sidebarOpen ? "lg:left-64" : "lg:left-16"} left-0 pointer-events-none top-20 right-0 z-[60]`}>
                {status.message && status.message.trim() !== "" && (
                    <div className="pointer-events-auto flex justify-center pt-4">
                        <FloatingMessage type={status.status === "success" ? "success" : "error"}>{status.message}</FloatingMessage>
                    </div>
                )}
            </div>

            <main className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"} pb-20 lg:pb-0`}>
                <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 lg:pt-24">
                    <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
                        {/* Header Section */}
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
                                {userId === user?.data?.id ? "My" : `${inventoryUser.name}\'s`}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Inventory</span>
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">Manage your skills, services, and offerings. Share what you're great at with your community.</p>
                        </div>

                        {/* Status Messages */}
                        {status.status === "success" && status.message && (
                            <div className="mb-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 backdrop-blur-sm">
                                <div className="flex items-center">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 font-medium text-green-800">{status.message}</p>
                                </div>
                            </div>
                        )}

                        {status.status === "error" && status.message && (
                            <div className="mb-6 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 p-4 backdrop-blur-sm">
                                <div className="flex items-center">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 font-medium text-red-800">{status.message}</p>
                                </div>
                            </div>
                        )}

                        {/* Add New Offering Section */}
                        {userId === user?.data?.id && (
                            <div className="mb-8">
                                {!showCreateForm ? (
                                    <div className="text-center">
                                        <button
                                            onClick={() => setShowCreateForm(true)}
                                            className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                            style={{
                                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                                            }}
                                        >
                                            <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add New Offering
                                            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-md">
                                        <h3 className="mb-6 text-2xl font-bold text-gray-900">Create New Offering</h3>
                                        <form onSubmit={handleCreateOffering} className="space-y-6">
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
                                                <textarea value={newOffering.description} onChange={(e) => setNewOffering({ ...newOffering, description: e.target.value })} placeholder="Describe your skill or service..." className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none" rows={3} required />
                                            </div>

                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">Estimated Value ($)</label>
                                                    <input type="number" value={newOffering.cost} onChange={(e) => setNewOffering({ ...newOffering, cost: Number(e.target.value) })} placeholder="0" min="0" step="0.01" className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-semibold text-gray-700">Quantity Available</label>
                                                    <input type="number" value={newOffering.quantity} onChange={(e) => setNewOffering({ ...newOffering, quantity: Number(e.target.value) })} placeholder="1" min="1" className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <button type="submit" className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700">
                                                    Create Offering
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowCreateForm(false);
                                                        setNewOffering({ description: "", cost: 0, quantity: 1 });
                                                    }}
                                                    className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-50"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Offerings Grid */}
                        {inventoryUser.offerings && inventoryUser.offerings.length > 0 ? (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Your Offerings</h2>
                                <div className="grid gap-6 sm:grid-cols-2">                                    {inventoryUser.offerings.map((offering) => (
                                        <div
                                            key={offering.id}
                                            className="group relative transform rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                            style={{
                                                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)",
                                            }}
                                        >
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                            <OfferingCard offering={offering} onUpdate={upsertOffering} onDelete={deleteOffering} onSpend={spendOffering} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="py-16 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-gray-100 to-gray-200">
                                    <span className="text-4xl">📦</span>
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900">No Offerings Yet</h3>
                                <p className="mb-6 text-gray-600">Start by creating your first offering to share your skills with the community.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
