import type { Metadata } from 'next';
import { GeistSans } from 'next/font/google';
import { GeistMono } from 'next/font/google';
import { Nunito } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth/auth-provider';
import AuthProtecter from '@/components/auth/auth-protecter';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'TradeSpace',
  description: 'Enabling trust and exchange in places with cash shortages',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${nunito.variable} font-nunito antialiased`}
      >
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