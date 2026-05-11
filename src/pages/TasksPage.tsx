import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  CheckCircle, 
  Circle,
  Plus,
  LayoutGrid,
  List as ListIcon,
  Flag,
  Calendar,
  XCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatDateTime, cn } from '../lib/utils';
import { TaskPriority, TaskStatus } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { HighlightText } from '../components/HighlightText';

export const TasksPage: React.FC<{ onAddTask: () => void }> = ({ onAddTask }) => {
  const { tasks, updateTask, deleteTask, searchQuery, setSearchQuery } = useData();
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredTasks = useMemo(() => {
    const list = Array.isArray(tasks) ? tasks : [];
    const searchLower = debouncedSearch.toLowerCase().trim();

    return list.filter(task => {
      // 1. Status Filter
      const matchesStatus = filter === 'All' || task.status === filter;
      
      // 2. Search Query Filter
      if (!searchLower) return matchesStatus;

      const title = (task.title || "").toLowerCase();
      const desc = (task.description || "").toLowerCase();
      const priority = (task.priority || "").toLowerCase();
      const status = (task.status || "").toLowerCase();

      const matchesSearch = 
        title.includes(searchLower) ||
        desc.includes(searchLower) ||
        priority.includes(searchLower) ||
        status.includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [tasks, filter, debouncedSearch]);

  if (!tasks) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Menyiapkan Data...</h2>
      </div>
    );
  }

  const getPriorityColor = (p: TaskPriority) => {
    switch(p) {
      case 'High': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-32 md:pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Tugas Saya</h1>
          <p className="text-slate-500 font-medium opacity-80">Kelola dan selesaikan kewajiban akademikmu.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="glass p-1 rounded-2xl flex items-center bg-white/40">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-400 hover:text-slate-600")}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600")}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={onAddTask}
            className="flex-1 sm:flex-none bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> <span className="xs:inline">Tambah Tugas</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        <div className="relative flex-1 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Cari tugas..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 glass bg-white/40 rounded-[1.5rem] focus:ring-2 focus:ring-indigo-100 outline-none font-medium transition-all focus:bg-white/80"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <XCircle className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {['All', 'Pending', 'In Progress', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border active:scale-95",
                filter === f 
                  ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200" 
                  : "bg-white/40 glass text-slate-500 border-white/60 hover:border-indigo-200 hover:text-indigo-600"
              )}
            >
              {f === 'All' ? 'Semua' : f === 'In Progress' ? 'Progres' : f === 'Pending' ? 'Tunda' : 'Selesai'}
            </button>
          ))}
        </div>
      </div>

      {/* Task Content */}
      <div className={cn(
        "grid gap-4 sm:gap-6",
        viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, i) => (
              <motion.div
                layout
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "p-5 sm:p-6 rounded-[2rem] group transition-all hover:scale-[1.02] border-none",
                  viewMode === 'list' ? "flex items-center justify-between glass" : "glass bg-white/60"
                )}
              >
                <div className={cn(viewMode === 'list' ? "flex items-center gap-6" : "space-y-4")}>
                  <div className="flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateTask(task.id, { status: task.status === 'Completed' ? 'Pending' : 'Completed' })}
                        className="transition-transform active:scale-90"
                      >
                        {task.status === 'Completed' ? (
                          <CheckCircle className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-200 group-hover:text-indigo-400" />
                        )}
                      </button>
                      <div className={cn(
                        "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm",
                        getPriorityColor(task.priority)
                      )}>
                        {task.priority}
                      </div>
                    </div>
                    {viewMode === 'grid' && (
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className={cn(
                      "font-display font-bold text-lg text-slate-900 group-hover:text-indigo-700 transition-colors truncate leading-tight",
                      task.status === 'Completed' && "line-through text-slate-400 opacity-60"
                    )}>
                      <HighlightText text={task.title || ''} search={debouncedSearch} />
                    </h3>
                    <p className="text-slate-500 text-sm font-medium line-clamp-1 mt-1 opacity-70">
                      <HighlightText text={task.description || ''} search={debouncedSearch} />
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/50 px-3 py-2 rounded-xl shadow-sm border border-white/60">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDateTime(task.dueDate)}
                    </div>
                    {task.isGroupTask && (
                      <div className="bg-indigo-100/50 text-indigo-700 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                        Kelompok
                      </div>
                    )}
                  </div>

                  {/* Mobile Actions Overlay on Grid */}
                  <div className="flex sm:hidden gap-2 mt-4">
                    {task.status === 'Pending' && (
                      <button 
                        onClick={() => updateTask(task.id, { status: 'In Progress' })}
                        className="flex-1 bg-amber-500 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
                      >
                        Kerjakan
                      </button>
                    )}
                    {task.status === 'In Progress' && (
                      <>
                        <button 
                          onClick={() => updateTask(task.id, { status: 'Completed' })}
                          className="flex-1 bg-emerald-500 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
                        >
                          Selesai
                        </button>
                        <button 
                          onClick={() => updateTask(task.id, { status: 'Pending' })}
                          className="flex-1 bg-slate-400 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
                        >
                          Tunda
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div className="flex items-center gap-4">
                     <div className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
                        task.status === 'Completed' ? "bg-emerald-100 text-emerald-700" :
                        task.status === 'In Progress' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                      )}>
                        {task.status}
                      </div>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 sm:py-24 text-center glass rounded-[3rem] border-white/60">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-200" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">Tugas tidak ditemukan</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2 leading-relaxed px-4">
                {debouncedSearch 
                  ? `Tidak ada hasil untuk "${debouncedSearch}". Coba kata kunci lain.` 
                  : "Belum ada tugas dalam kategori ini. Silakan buat tugas baru."}
              </p>
              {debouncedSearch && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4"
                >
                  Bersihkan Pencarian
                </button>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
