'use client'

import { useState } from "react";
import Sidebar from "./DashboardSidebar";

export default function DashboardWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

	return (
		<div className='w-full h-full'>
			<Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
			<main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "lg:ml-64" : "lg:ml-16"}`}>
				{children}
			</main>
		</div>
	);
}