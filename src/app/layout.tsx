import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { SidebarProvider } from "@/components/context/sidebar-context";
import AuthProtecter from "@/components/auth/auth-protecter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
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
    <html lang="en" className={`${nunito.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-black antialiased">
        <AuthProvider>
          <SidebarProvider>
            <AuthProtecter>
              <script src="https://accounts.google.com/gsi/client" async defer></script>
              {children}
            </AuthProtecter>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}