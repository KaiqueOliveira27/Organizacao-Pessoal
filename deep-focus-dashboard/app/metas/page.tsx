'use client';

import React from 'react';
import { Target, Plus, ChevronRight, Award, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Metas() {
  return (
    <main className="p-4 md:p-8 w-full max-w-[1400px] mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-300">Metas</span>
          </div>
          <h2 className="text-3xl text-white font-bold flex items-center gap-3">
            <Target className="w-8 h-8 text-indigo-400" />
            Minhas Metas
          </h2>
        </div>
        <button className="flex items-center gap-2 bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20">
          <Plus className="w-5 h-5" /> Nova Meta
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GOAL CARD EXAMPLE */}
        <div className="bg-[#13151D] p-6 rounded-3xl border border-[#1F222E] flex flex-col group hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md">Em Andamento</span>
          </div>
          
          <h4 className="text-lg font-bold text-white mb-1">Reserva de Emergência</h4>
          <p className="text-slate-500 text-xs mb-6">Fundo para imprevistos e segurança financeira.</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-400">Progresso</span>
              <span className="text-white">66%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '66%' }} />
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-auto">
            <div>
              <p className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">Meta</p>
              <p className="text-sm font-bold text-white">R$ 24.000,00</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">Faltam</p>
              <p className="text-sm font-bold text-slate-400">R$ 8.160,00</p>
            </div>
          </div>
          
          <button className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
            Ver detalhes <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* EMPTY STATE / ADD CARD */}
        <div className="bg-[#13151D] p-6 rounded-3xl border border-dashed border-[#1F222E] flex flex-col items-center justify-center text-center min-h-[300px] hover:bg-slate-800/20 transition-colors cursor-pointer">
           <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
             <Target className="w-8 h-8 text-slate-600" />
           </div>
           <p className="text-slate-400 font-medium mb-1">Crie um novo objetivo</p>
           <p className="text-[11px] text-slate-500 max-w-[200px]">Defina metas claras para alcançar sua liberdade financeira.</p>
        </div>
      </div>
    </main>
  );
}
