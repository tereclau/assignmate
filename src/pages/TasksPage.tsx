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
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Tugas Saya</h1>
          <p className="text-slate-500 font-medium">Kelola dan selesaikan kewajiban akademikmu.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass p-1 rounded-xl flex items-center">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-400 hover:text-slate-600")}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-400 hover:text-slate-600")}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={onAddTask}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus className="w-5 h-5" /> Tambah Tugas
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan judul, deskripsi, prioritas, atau status..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-12 py-3 glass rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <XCircle className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['All', 'Pending', 'In Progress', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border",
                filter === f 
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
              )}
            >
              {f === 'All' ? 'Semua' : f === 'In Progress' ? 'Sedang Dikerjakan' : f === 'Pending' ? 'Tertunda' : 'Selesai'}
            </button>
          ))}
        </div>
      </div>

      {/* Task Content */}
      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                layout
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "glass p-6 rounded-[2rem] group transition-all hover:scale-[1.01] hover:border-indigo-200",
                  viewMode === 'list' && "flex items-center justify-between"
                )}
              >
                <div className={cn(viewMode === 'list' ? "flex items-center gap-6" : "space-y-4")}>
                  <div className="flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateTask(task.id, { status: task.status === 'Completed' ? 'Pending' : 'Completed' })}
                        className="transition-colors"
                      >
                        {task.status === 'Completed' ? (
                          <CheckCircle className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 group-hover:text-indigo-400" />
                        )}
                      </button>
                      <div className={cn(
                        "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                        getPriorityColor(task.priority)
                      )}>
                        {task.priority}
                      </div>
                      {task.status === 'Pending' && (
                        <button 
                          onClick={() => updateTask(task.id, { status: 'In Progress' })}
                          className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase border border-amber-100 hover:bg-amber-100 transition-colors"
                        >
                          Kerjakan
                        </button>
                      )}
                      {task.status === 'In Progress' && (
                        <div className="flex gap-1">
                          <button 
                            onClick={() => updateTask(task.id, { status: 'Completed' })}
                            className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase border border-emerald-100 hover:bg-emerald-100 transition-colors"
                          >
                            Selesai
                          </button>
                          <button 
                            onClick={() => updateTask(task.id, { status: 'Pending' })}
                            className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase border border-slate-100 hover:bg-slate-100 transition-colors"
                          >
                            Tunda
                          </button>
                        </div>
                      )}
                    </div>
                    {viewMode === 'grid' && (
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                    <div>
                      <h3 className={cn(
                        "font-display font-bold text-lg text-slate-900 group-hover:text-indigo-700 transition-colors truncate",
                        task.status === 'Completed' && "line-through text-slate-400 opacity-60"
                      )}>
                        <HighlightText text={task.title || ''} search={debouncedSearch} />
                      </h3>
                      <p className="text-slate-500 text-sm font-medium line-clamp-1 mt-1">
                        <HighlightText text={task.description || ''} search={debouncedSearch} />
                      </p>
                    </div>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDateTime(task.dueDate)}
                    </div>
                    {task.isGroupTask && (
                      <div className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Kelompok
                      </div>
                    )}
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div className="flex items-center gap-4">
                     <div className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap",
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
            <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">Tugas tidak ditemukan</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2 leading-relaxed">
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
