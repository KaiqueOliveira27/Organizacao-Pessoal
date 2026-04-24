'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Target, TrendingUp, Calendar as CalendarIcon, Receipt
} from 'lucide-react';

const navItems = [
  { name: 'Início', href: '/', icon: LayoutDashboard },
  { name: 'Contas', href: '/contas', icon: Receipt },
  { name: 'Metas', href: '/metas', icon: Target },
  { name: 'Invest', href: '/investimentos', icon: TrendingUp },
  { name: 'Agenda', href: '/calendario', icon: CalendarIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#13151D] border-t border-[#1F222E] flex justify-around items-center px-2 pt-3 pb-5 lg:hidden z-50">
      {navItems.map((item) => {
        const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
              active 
                ? 'text-emerald-500' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
