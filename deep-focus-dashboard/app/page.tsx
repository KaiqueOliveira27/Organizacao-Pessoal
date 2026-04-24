'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Wallet, ArrowRightLeft, PieChart as PieChartIcon, 
  Target, TrendingUp, FileText, Calendar as CalendarIcon, Moon, 
  Sun, ArrowDown, ArrowUp, PiggyBank, Droplets, Lightbulb, Wifi, 
  CreditCard, Home, Award, Zap, ChevronDown, ChevronRight,
  Briefcase, ShoppingCart, Dumbbell, Receipt, Plus
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { BankIcon } from '@/components/BankIcon';

// Types
interface Bank {
  id: string;
  name: string;
  type: string;
  value: number;
}

interface Bill {
  id: string;
  name: string;
  date: string;
  value: number;
  iconName: string;
  color: string;
}

const iconMap: Record<string, any> = {
  CreditCard, ShoppingCart, Briefcase, Receipt, Droplets, Lightbulb, Wifi, Home
};

const COLORS = ['#10B981', '#1e293b'];

export default function Dashboard() {
  // State
  const [userName] = useState('Kaique');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [banks, setBanks] = useState<Bank[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);

  // Initialize data from localStorage or defaults
  useEffect(() => {
    const savedBanks = localStorage.getItem('banks');
    const savedBills = localStorage.getItem('bills');

    if (savedBanks) {
      setBanks(JSON.parse(savedBanks));
    } else {
      setBanks([
        { id: '1', name: 'Nubank', type: 'Conta Principal', value: 3250 },
        { id: '2', name: 'Mercado Pago', type: 'Carteira Digital', value: 1200 },
        { id: '3', name: 'Santander', type: 'Conta Corrente', value: 5420 },
        { id: '4', name: 'Bradesco', type: 'Poupança', value: 2180 }
      ]);
    }

    if (savedBills) {
      setBills(JSON.parse(savedBills));
    } else {
      setBills([
        { id: '1', name: 'Cartão Nubank', date: 'Vencimento: 18/05', value: 850, iconName: 'CreditCard', color: 'text-indigo-400' },
        { id: '2', name: 'Parcela iPhone', date: 'Vencimento: 22/05', value: 450, iconName: 'ShoppingCart', color: 'text-sky-400' },
        { id: '3', name: 'Assinatura Adobe', date: 'Vencimento: 25/05', value: 124, iconName: 'Briefcase', color: 'text-rose-400' }
      ]);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (banks.length > 0) localStorage.setItem('banks', JSON.stringify(banks));
  }, [banks]);

  useEffect(() => {
    if (bills.length > 0) localStorage.setItem('bills', JSON.stringify(bills));
  }, [bills]);

  const [cashFlowData] = useState([
    { name: 'Dez', entradas: 4800, saidas: 3800 },
    { name: 'Jan', entradas: 5200, saidas: 3100 },
    { name: 'Fev', entradas: 5600, saidas: 3500 },
    { name: 'Mar', entradas: 5100, saidas: 3200 },
    { name: 'Abr', entradas: 6400, saidas: 3400 },
    { name: 'Mai', entradas: 7850, saidas: 3860 },
  ]);

  const [donutData] = useState([
    { name: 'Concluído', value: 66 },
    { name: 'Restante', value: 34 }
  ]);

  const [projectionData] = useState([
    { name: 'Start', value: 15840 },
    { name: '6m', value: 21840 },
    { name: '1a', value: 27840 },
    { name: '2a', value: 39840 },
    { name: '5a', value: 75840 }
  ]);

  // Effects
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Helpers
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const totalBalance = banks.reduce((acc, bank) => acc + bank.value, 0);

  const addBank = () => {
    const name = prompt('Nome do Banco:');
    const valueStr = prompt('Saldo inicial:');
    if (name && valueStr) {
      const value = parseFloat(valueStr.replace(',', '.'));
      setBanks([...banks, { id: Date.now().toString(), name, type: 'Conta', value }]);
    }
  };

  const addBill = () => {
    const name = prompt('Nome da Conta:');
    const date = prompt('Data de Vencimento (ex: 20/05):');
    const valueStr = prompt('Valor:');
    if (name && date && valueStr) {
      const value = parseFloat(valueStr.replace(',', '.'));
      setBills([...bills, { 
        id: Date.now().toString(), 
        name, 
        date: `Vencimento: ${date}`, 
        value, 
        iconName: 'Receipt', 
        color: 'text-indigo-400' 
      }]);
    }
  };

  const getIcon = (name: string) => iconMap[name] || Receipt;

  return (
    <main className="p-4 md:p-8 w-full max-w-[1400px] mx-auto overflow-x-hidden">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl text-white font-bold flex items-center gap-3 mb-1">
            {currentTime.getHours() >= 18 || currentTime.getHours() < 6 ? (
              <Moon className="w-6 h-6 text-indigo-400" fill="currentColor" />
            ) : (
              <Sun className="w-6 h-6 text-yellow-400" fill="currentColor" />
            )}
            {getGreeting()}, {userName}!
          </h2>
          <p className="text-slate-400 text-sm">
            {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} • {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#13151D] border border-[#1F222E] px-4 py-2.5 rounded-xl text-slate-300 text-sm hover:bg-[#1a1d27] transition-colors font-medium">
            <CalendarIcon className="w-4 h-4 text-slate-400" /> 
            {currentTime.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} 
            <ChevronDown className="w-4 h-4 ml-2 text-slate-500" />
          </button>
        </div>
      </header>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        <div className="bg-[#13151D] p-5 rounded-2xl border border-[#1F222E] flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10">
            <Wallet className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium mb-1.5">Saldo Total</p>
            <p className="text-2xl font-bold text-emerald-500 mb-1">{formatCurrency(totalBalance)}</p>
            <p className="text-[10px] font-medium text-emerald-500 flex items-center">
              <ArrowUp className="w-3 h-3 mr-0.5" /> 8,5% <span className="text-slate-500 font-normal ml-1">em relação ao mês passado</span>
            </p>
          </div>
        </div>

        <div className="bg-[#13151D] p-5 rounded-2xl border border-[#1F222E] flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-400">
            <ArrowDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium mb-1.5">Entradas</p>
            <p className="text-2xl font-bold text-emerald-500 mb-1">{formatCurrency(7850)}</p>
            <p className="text-[10px] text-slate-500">Total previsto</p>
          </div>
        </div>

        <div className="bg-[#13151D] p-5 rounded-2xl border border-[#1F222E] flex items-center gap-4">
           <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-400">
            <ArrowUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium mb-1.5">Saídas</p>
            <p className="text-2xl font-bold text-rose-500 mb-1">{formatCurrency(3860)}</p>
            <p className="text-[10px] text-slate-500">Total previsto</p>
          </div>
        </div>

        <div className="bg-[#13151D] p-5 rounded-2xl border border-[#1F222E] flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10">
            <PiggyBank className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium mb-1.5">Investido</p>
            <p className="text-2xl font-bold text-emerald-500 mb-1">{formatCurrency(4000)}</p>
            <p className="text-[10px] font-medium text-emerald-500 flex items-center">
              <ArrowUp className="w-3 h-3 mr-0.5" /> 12,3% <span className="text-slate-500 font-normal ml-1">este mês</span>
            </p>
          </div>
        </div>

      </div>

      {/* MIDDLE ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* CONTAS / BANCOS */}
        <div className="bg-[#13151D] rounded-2xl border border-[#1F222E] flex flex-col p-6">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-semibold text-slate-200">Meus Bancos</h3>
             <button 
                onClick={addBank}
                className="flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg font-medium hover:bg-emerald-500/20 transition-colors"
              >
               <Plus className="w-3 h-3" /> Adicionar
             </button>
           </div>
           
           <div className="flex flex-col gap-4 flex-1">
              {banks.map(b => (
                <div key={b.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 p-1.5 -mx-1.5 rounded-lg transition-colors">
                   <div className="flex items-center gap-3">
                      <BankIcon bank={b.name} />
                      <div>
                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{b.name}</p>
                        <p className="text-[11px] text-slate-500">{b.type}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <p className="text-sm font-bold text-slate-200">{formatCurrency(b.value)}</p>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* FLUXO DE CAIXA */}
        <div className="bg-[#13151D] rounded-2xl border border-[#1F222E] flex flex-col p-6 xl:col-span-1">
           <div className="flex items-center justify-between mb-2">
             <h3 className="font-semibold text-slate-200">Fluxo de Caixa</h3>
             <button className="flex items-center gap-1.5 bg-[#0B0D14] border border-[#1F222E] px-3 py-1.5 rounded-lg text-slate-400 text-xs font-medium hover:bg-slate-800/50">
               Mensal <ChevronDown className="w-3 h-3" />
             </button>
           </div>
           
           <div className="flex items-center gap-4 mb-6 text-[10px] font-medium border-b border-white/5 pb-4">
              <div className="flex items-center gap-1.5 text-slate-400">
                <div className="w-2 h-2 rounded-sm bg-emerald-500" /> Entradas
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <div className="w-2 h-2 rounded-sm bg-rose-500" /> Saídas
              </div>
           </div>

           <div className="h-[240px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11 }} 
                    dy={10} 
                  />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#13151D', borderRadius: '12px', border: '1px solid #1F222E' }}
                     itemStyle={{ color: '#F8FAFC' }}
                     cursor={{ fill: '#1F222E', opacity: 0.4 }}
                  />
                  <Bar dataKey="entradas" fill="#10B981" barSize={10} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="saidas" fill="#EF4444" barSize={10} radius={[2, 2, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* CONTAS A PAGAR */}
        <div className="bg-[#13151D] rounded-2xl border border-[#1F222E] flex flex-col p-6">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-semibold text-slate-200">Próximos Pagamentos</h3>
             <button 
                onClick={addBill}
                className="flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg font-medium hover:bg-emerald-500/20 transition-colors"
              >
               <Plus className="w-3 h-3" /> Adicionar
             </button>
           </div>

            <div className="flex flex-col gap-4 flex-1">
              {bills.map(c => {
                const Icon = getIcon(c.iconName);
                return (
                  <div key={c.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 p-1.5 -mx-1.5 rounded-lg transition-colors">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/30`}>
                          <Icon className={`w-5 h-5 ${c.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{c.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{c.date}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-slate-200">{formatCurrency(c.value)}</p>
                        <p className="inline-block mt-0.5 px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] rounded-full font-bold uppercase tracking-wider">Pendente</p>
                     </div>
                  </div>
                );
              })}
           </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
         
         {/* META RESERVA DE EMERGÊNCIA */}
         <div className="bg-[#13151D] p-6 rounded-2xl border border-[#1F222E] flex flex-col md:flex-row gap-6 xl:col-span-2">
            
            <div className="flex flex-col flex-1 md:border-r border-[#1F222E] md:pr-8">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-200">Meta: Reserva de Emergência</h3>
                  <button className="text-[11px] text-emerald-500 font-medium hover:underline">Editar meta</button>
               </div>
               
               <div className="flex gap-6 items-center flex-1">
                  {/* Donut Chart */}
                  <div className="relative w-36 h-36 shrink-0">
                     <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                             <Pie
                               data={donutData}
                               innerRadius={54}
                               outerRadius={70}
                               paddingAngle={0}
                               dataKey="value"
                               stroke="none"
                               cornerRadius={40}
                             >
                               {donutData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                               ))}
                             </Pie>
                         </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                         <span className="text-2xl font-black text-white tracking-tight">66%</span>
                         <span className="text-[10px] text-slate-400 font-medium">Concluído</span>
                     </div>
                  </div>

                  {/* Meta Stats */}
                  <div className="flex flex-col justify-center space-y-4">
                     <div>
                       <p className="text-[10px] text-slate-400 font-medium mb-1">Objetivo</p>
                       <p className="text-sm font-bold text-white">{formatCurrency(24000)}</p>
                     </div>
                     <div>
                       <p className="text-[10px] text-slate-400 font-medium mb-1">Guardado até agora</p>
                       <p className="text-sm font-bold text-white">{formatCurrency(15840)}</p>
                     </div>
                     <div>
                       <p className="text-[10px] text-slate-400 font-medium mb-1">Valor mensal</p>
                       <p className="text-sm font-bold text-white">{formatCurrency(1000)}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* PROJEÇÃO DE CRESCIMENTO */}
            <div className="flex-1 flex flex-col">
               <p className="text-sm font-bold text-slate-200 mb-0.5">Projeção de crescimento</p>
               <p className="text-[11px] text-slate-500 mb-6">Com aportes de R$ 1.000,00 por mês</p>

               <div className="flex gap-3 mb-6">
                  <div className="bg-slate-800/30 p-2.5 rounded-lg flex-1 border border-transparent hover:border-slate-700 transition-colors">
                     <p className="text-[10px] text-slate-400 font-medium mb-1 line-clamp-1">6 meses</p>
                     <p className="font-bold text-[13px] text-white tracking-tight">R$ 21.840</p>
                  </div>
                  <div className="bg-slate-800/30 p-2.5 rounded-lg flex-1 border border-transparent hover:border-slate-700 transition-colors">
                     <p className="text-[10px] text-slate-400 font-medium mb-1 line-clamp-1">1 ano</p>
                     <p className="font-bold text-[13px] text-white tracking-tight">R$ 27.840</p>
                  </div>
                  <div className="bg-slate-800/30 p-2.5 rounded-lg flex-1 border border-transparent hover:border-slate-700 transition-colors">
                     <p className="text-[10px] text-slate-400 font-medium mb-1 line-clamp-1">2 anos</p>
                     <p className="font-bold text-[13px] text-white tracking-tight">R$ 39.840</p>
                  </div>
                  <div className="bg-slate-800/30 p-2.5 rounded-lg flex-1 border border-transparent hover:border-slate-700 transition-colors">
                     <p className="text-[10px] text-slate-400 font-medium mb-1 line-clamp-1">5 anos</p>
                     <p className="font-bold text-[13px] text-white tracking-tight">R$ 75.840</p>
                  </div>
               </div>

               <div className="h-[80px] w-full mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                         type="monotone" 
                         dataKey="value" 
                         stroke="#10B981" 
                         strokeWidth={2}
                         fill="url(#colorProj)" 
                         activeDot={{ r: 4, fill: '#10B981', stroke: '#0B0D14', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>

            </div>

         </div>

         {/* ÚLTIMAS TRANSAÇÕES */}
         <div className="bg-[#13151D] rounded-2xl border border-[#1F222E] flex flex-col p-6 xl:col-span-1">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-semibold text-slate-200">Últimas Transações</h3>
               <button className="text-[11px] text-emerald-500 font-medium hover:underline">Ver todas</button>
             </div>

              <div className="flex flex-col gap-4 flex-1 justify-between">
                {[
                  { name: 'Salário', date: '02/05/2024', val: 'R$ 7.850,00', icon: Briefcase, bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', color: 'text-emerald-500' },
                  { name: 'Mercado', date: '01/05/2024', val: '- R$ 350,00', icon: ShoppingCart, bg: 'bg-rose-500/10 text-rose-500 border-rose-500/20', color: 'text-rose-500' },
                  { name: 'Academia', date: '30/04/2024', val: '- R$ 89,90', icon: Dumbbell, bg: 'bg-slate-800 text-slate-300 border-slate-700/50', color: 'text-rose-500' },
                  { name: 'Freelance', date: '28/04/2024', val: 'R$ 1.200,00', icon: CreditCard, bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', color: 'text-emerald-500' },
                ].map(t => (
                  <div key={t.name} className="flex items-center justify-between group cursor-pointer hover:bg-slate-800/30 p-1.5 -mx-1.5 rounded-lg transition-colors">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${t.bg}`}>
                          <t.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{t.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{t.date}</p>
                        </div>
                     </div>
                     <p className={`text-sm font-bold ${t.color}`}>{t.val}</p>
                  </div>
                ))}
             </div>
         </div>

      </div>

      {/* FOOTER MESSAGE */}
      <div className="bg-[#13151D] py-3.5 rounded-xl border border-[#1F222E] flex justify-center items-center gap-2 text-slate-400 text-xs font-medium">
         <Zap className="w-4 h-4 text-indigo-500" fill="currentColor" /> "Organização hoje, liberdade amanhã."
      </div>

    </main>
  );
}
