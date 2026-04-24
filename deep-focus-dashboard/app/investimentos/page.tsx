'use client';

import React, { useState } from 'react';
import { TrendingUp, Plus, ArrowUpRight, PieChart as PieChartIcon, Wallet, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import Link from 'next/link';

const data = [
  { name: 'Jan', value: 12000 },
  { name: 'Fev', value: 12500 },
  { name: 'Mar', value: 13200 },
  { name: 'Abr', value: 14800 },
  { name: 'Mai', value: 15840 },
];

export default function Investimentos() {
  const [totalInvested] = useState(15840);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <main className="p-4 md:p-8 w-full max-w-[1400px] mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-300">Investimentos</span>
          </div>
          <h2 className="text-3xl text-white font-bold flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            Investimentos
          </h2>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
          <Plus className="w-5 h-5" /> Novo Aporte
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* TOTAL PATRIMONY CARD */}
        <div className="lg:col-span-2 bg-[#13151D] p-8 rounded-3xl border border-[#1F222E] flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium mb-2">Patrimônio Total</p>
            <h3 className="text-4xl font-black text-white tracking-tight mb-4">{formatCurrency(totalInvested)}</h3>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>+ R$ 1.040,00 (7.1%) este mês</span>
            </div>
          </div>
          
          <div className="h-[120px] w-full mt-8 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Decorative background circle */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
        </div>

        {/* ALLOCATION CARD */}
        <div className="bg-[#13151D] p-6 rounded-3xl border border-[#1F222E] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-white">Alocação</h4>
            <PieChartIcon className="w-5 h-5 text-slate-500" />
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-4">
             {[
               { name: 'Renda Fixa', val: '75%', color: 'bg-emerald-500' },
               { name: 'Cripto', val: '15%', color: 'bg-indigo-500' },
               { name: 'Ações', val: '10%', color: 'bg-amber-500' }
             ].map(item => (
               <div key={item.name} className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full ${item.color}`} />
                   <span className="text-sm text-slate-300 font-medium">{item.name}</span>
                 </div>
                 <span className="text-sm text-white font-bold">{item.val}</span>
               </div>
             ))}
          </div>
          
          <button className="mt-8 w-full py-3 bg-[#0B0D14] border border-[#1F222E] rounded-xl text-slate-400 text-sm font-bold hover:bg-slate-800/50 hover:text-white transition-all flex items-center justify-center gap-2">
            Ver detalhes <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RECENT MOVEMENTS */}
        <div className="bg-[#13151D] p-6 rounded-2xl border border-[#1F222E]">
          <h4 className="font-bold text-white mb-6">Movimentações Recentes</h4>
          <div className="space-y-4">
            {[
              { type: 'Aporte', asset: 'Tesouro Selic', val: '+ R$ 500,00', date: '15 Mai' },
              { type: 'Aporte', asset: 'Bitcoin', val: '+ R$ 200,00', date: '10 Mai' },
              { type: 'Rendimento', asset: 'CDB Itaú', val: '+ R$ 42,50', date: '05 Mai' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0B0D14] rounded-xl border border-transparent hover:border-[#1F222E] transition-colors">
                <div>
                  <p className="text-sm font-bold text-white">{m.asset}</p>
                  <p className="text-[10px] text-slate-500">{m.type} • {m.date}</p>
                </div>
                <p className="text-sm font-bold text-emerald-500">{m.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ASSET LIST (SIMPLIFIED) */}
        <div className="bg-[#13151D] p-6 rounded-2xl border border-[#1F222E]">
          <h4 className="font-bold text-white mb-6">Ativos</h4>
          <div className="space-y-4">
            {[
              { name: 'Nubank (Renda Fixa)', val: 'R$ 8.250,00' },
              { name: 'Binance (BTC/ETH)', val: 'R$ 3.590,00' },
              { name: 'Santander (Ações)', val: 'R$ 4.000,00' },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0B0D14] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-300">{a.name}</span>
                </div>
                <p className="text-sm font-bold text-white">{a.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
