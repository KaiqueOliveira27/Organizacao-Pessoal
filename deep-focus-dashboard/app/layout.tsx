import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Deep Focus Dashboard',
  description: 'Painel pessoal de organização financeira e rotina.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-[#0A0B10] text-slate-50 selection:bg-[#10B981] selection:text-white">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-[#0A0B10] pb-20 lg:pb-0">
            {children}
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
