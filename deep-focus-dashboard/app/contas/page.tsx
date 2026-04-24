'use client';

import React, { useState, useEffect } from 'react';
import { Receipt, Plus, ChevronLeft, Calendar as CalendarIcon, Filter, Search } from 'lucide-react';
import Link from 'next/link';

interface Bill {
  id: string;
  name: string;
  date: string;
  value: number;
  status: 'Pendente' | 'Pago' | 'Atrasado';
}

export default function ContasAPagar() {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const savedBills = localStorage.getItem('bills');
    if (savedBills) {
      setBills(JSON.parse(savedBills));
    }
  }, []);

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
            <span className="text-slate-300">Contas a Pagar</span>
          </div>
          <h2 className="text-3xl text-white font-bold flex items-center gap-3">
            <Receipt className="w-8 h-8 text-indigo-400" />
            Contas a Pagar
          </h2>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
          <Plus className="w-5 h-5" /> Nova Conta
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* FILTERS & SEARCH */}
        <div className="bg-[#13151D] p-4 rounded-2xl border border-[#1F222E] flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar conta..." 
              className="w-full bg-[#0B0D14] border border-[#1F222E] rounded-xl py-2 pl-10 pr-4 text-slate-300 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0B0D14] border border-[#1F222E] px-4 py-2 rounded-xl text-slate-400 text-sm hover:bg-slate-800/50 transition-colors">
              <Filter className="w-4 h-4" /> Filtros
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0B0D14] border border-[#1F222E] px-4 py-2 rounded-xl text-slate-400 text-sm hover:bg-slate-800/50 transition-colors">
              <CalendarIcon className="w-4 h-4" /> Maio
            </button>
          </div>
        </div>

        {/* BILLS LIST */}
        <div className="bg-[#13151D] rounded-2xl border border-[#1F222E] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F222E] bg-slate-800/20">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Conta</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F222E]">
              {bills.length > 0 ? (
                bills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">{bill.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-400">{bill.date.replace('Vencimento: ', '')}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">{formatCurrency(bill.value)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Pendente
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-emerald-500 transition-colors text-xs font-bold">PAGAR</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-slate-500 text-sm italic">Nenhuma conta encontrada para este período.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
