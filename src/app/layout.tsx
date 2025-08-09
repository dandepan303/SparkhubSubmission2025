import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import AuthProtecter from "@/components/auth/auth-protecter";

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AuthProvider>
                    <AuthProtecter>
                        <script src="https://accounts.google.com/gsi/client" async defer></script>

                        {children}
                    </AuthProtecter>
                </AuthProvider>
            </body>
        </html>
    );
}
