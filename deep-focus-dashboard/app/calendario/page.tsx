'use client';

import React, { useState, useMemo } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, CheckCircle2, Circle, Calendar as CalendarIcon } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Dummy Tasks initially
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Pagar fatura do cartão', completed: true, date: new Date() },
    { id: '2', title: 'Reunião de alinhamento', completed: false, date: new Date() },
    { id: '3', title: 'Academia', completed: false, date: new Date() }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const daysInMonth = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const selectedDateTasks = tasks.filter(t => isSameDay(t.date, selectedDate));
  const completedTasks = selectedDateTasks.filter(t => t.completed).length;
  const progressPercent = selectedDateTasks.length === 0 ? 0 : Math.round((completedTasks / selectedDateTasks.length) * 100);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, {
      id: Math.random().toString(),
      title: newTaskTitle,
      completed: false,
      date: selectedDate
    }]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <main className="p-4 md:p-8 w-full max-w-[1400px] mx-auto min-h-screen text-slate-100 flex flex-col lg:flex-row gap-8">
      
      {/* CALENDAR SECTION */}
      <div className="flex-1 bg-[#13151D] p-6 rounded-2xl border border-[#1F222E] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold capitalize text-white">
              {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
            </h2>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={goToToday} className="px-3 py-1.5 text-xs font-semibold bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition">Hoje</button>
             <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg">
                <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Grid Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
            <div key={d} className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-widest py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Grid Days */}
        <div className="grid grid-cols-7 gap-2 flex-1">
          {daysInMonth.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = isSameDay(day, selectedDate);
            const isTodayDate = isToday(day);
            const dayTasksCount = tasks.filter(t => isSameDay(t.date, day)).length;
            const completedCount = tasks.filter(t => isSameDay(t.date, day) && t.completed).length;

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                className={`
                  min-h-[60px] md:min-h-[80px] p-1 md:p-2 rounded-xl border flex flex-col items-center md:items-start transition-all relative
                  ${!isCurrentMonth ? 'opacity-40 pointer-events-none hover:bg-transparent' : 'hover:border-emerald-500/50 hover:bg-emerald-500/5'}
                  ${isSelected ? 'border-emerald-500 bg-emerald-500/10' : 'border-[#1F222E] bg-[#0A0B10]/50'}
                `}
              >
                <span className={`
                  w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs md:text-sm font-bold mb-1 md:mb-2
                  ${isTodayDate ? 'bg-emerald-500 text-white' : (isSelected ? 'text-emerald-500' : 'text-slate-300')}
                `}>
                  {format(day, 'd')}
                </span>
                
                {dayTasksCount > 0 && (
                  <div className="w-full mt-auto space-y-1">
                    <div className="flex flex-wrap justify-center md:justify-start gap-1">
                       {/* Pips for tasks */}
                       {Array.from({ length: Math.min(dayTasksCount, 3) }).map((_, idx) => (
                         <div key={idx} className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${idx < completedCount ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                       ))}
                       {dayTasksCount > 3 && <span className="text-[8px] text-slate-500 leading-none lg:block hidden">+{dayTasksCount - 3}</span>}
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* SIDE PANEL: TASKS */}
      <div className="w-full lg:w-[380px] bg-[#13151D] p-6 rounded-2xl border border-[#1F222E] flex flex-col h-[500px] lg:h-[calc(100vh-4rem)] lg:sticky lg:top-8 mb-4 lg:mb-0">
        <h3 className="text-lg font-bold mb-1 text-white">
          {isToday(selectedDate) ? 'Hoje' : format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
        </h3>
        <p className="text-xs text-slate-400 mb-6 font-medium">Seu planejamento diário</p>

        {/* Progress */}
        <div className="mb-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-300">Progresso de Tarefas</span>
            <span className="text-xs font-bold text-emerald-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#0A0B10] rounded-full overflow-hidden border border-slate-700/50">
             <div 
               className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" 
               style={{ width: `${progressPercent}%` }} 
             />
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin">
          {selectedDateTasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2 opacity-60">
              <CalendarIcon className="w-10 h-10 mb-2" />
              <p className="text-sm font-medium">Nenhuma tarefa para este dia.</p>
              <p className="text-xs">Adicione uma nova tarefa abaixo.</p>
            </div>
          ) : (
            selectedDateTasks.map(task => (
              <div 
                key={task.id} 
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  task.completed 
                    ? 'border-emerald-500/20 bg-emerald-500/5 opacity-70' 
                    : 'border-[#1F222E] bg-[#0A0B10] hover:border-slate-600'
                }`}
              >
                <button onClick={() => toggleTask(task.id)} className="mt-0.5 shrink-0 group">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                  )}
                </button>
                <p className={`text-sm font-medium transition-all pt-0.5 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                  {task.title}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Add Input */}
        <form onSubmit={addTask} className="relative mt-auto pt-4 border-t border-[#1F222E]">
          <input 
            type="text" 
            placeholder="Adicionar nova tarefa..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full bg-[#0A0B10] border border-[#1F222E] rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors shadow-inner"
          />
          <button 
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="absolute right-2 top-[26px] bg-emerald-500 text-[#0A0B10] p-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

      </div>
    </main>
  );
}
