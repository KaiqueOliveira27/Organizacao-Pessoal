'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Target, TrendingUp, Calendar as CalendarIcon,
  Award, ChevronDown, Receipt
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Contas a Pagar', href: '/contas', icon: Receipt },
  { name: 'Metas', href: '/metas', icon: Target },
  { name: 'Investimentos', href: '/investimentos', icon: TrendingUp },
  { name: 'Calendário', href: '/calendario', icon: CalendarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] h-screen bg-[#13151D] border-r border-[#1F222E] flex-col pt-6 pb-4 px-4 sticky top-0 hidden lg:flex shrink-0">
      {/* LOGO */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
          <TrendingUp className="text-emerald-500 w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Meu Controle</h1>
          <p className="text-slate-500 text-[11px] font-medium tracking-wide">Foco • Disciplina • Liberdade</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                active 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-emerald-500' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOCO DE HOJE WIDGET */}
      <div className="bg-slate-800/30 p-4 rounded-xl mb-4 border border-[#1F222E] flex items-start gap-4">
        <div className="bg-indigo-500/10 p-2 rounded-lg">
           <Award className="w-6 h-6 text-indigo-400 shrink-0" />
        </div>
        <div>
          <p className="text-sm border-b border-indigo-500/10 pb-1 text-slate-200 font-bold mb-1">Foco de hoje</p>
          <p className="text-[11px] text-slate-400 leading-snug">Pequenas decisões,<br/>grandes resultados.</p>
        </div>
      </div>

      {/* USER PROFILE */}
      <div className="flex items-center gap-3 px-3 py-3 hover:bg-slate-800/50 rounded-xl cursor-pointer border border-transparent hover:border-[#1F222E] transition-all">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">U</div>
        <div className="flex-1">
          <p className="text-sm text-white font-medium mb-0.5">Usuário</p>
          <p className="text-[10px] text-slate-500">Focado e disciplinado</p>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </div>
    </aside>
  );
}
