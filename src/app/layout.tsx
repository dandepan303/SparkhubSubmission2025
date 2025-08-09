import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import AuthProtecter from "@/components/auth/auth-protecter";
import AnimatePresenceWrapper from "@/components/ui/AnimatePresenceWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TradeSpace",
    description: "Enabling trust and exchange in places with cash shortages",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* Add a background class to the body element */}
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
                <AuthProvider>
                    <AuthProtecter>
                        <script src="https://accounts.google.com/gsi/client" async defer></script>
                        <AnimatePresenceWrapper>
                            {children}
                        </AnimatePresenceWrapper>
                    </AuthProtecter>
                </AuthProvider>
            </body>
        </html>
    );
}