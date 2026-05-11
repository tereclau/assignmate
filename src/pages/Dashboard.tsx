import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  Pause,
  AlertCircle, 
  TrendingUp,
  ChevronRight,
  Plus,
  Zap
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatDateTime, cn } from '../lib/utils';
import { HighlightText } from '../components/HighlightText';

import { TaskPriority, TaskStatus } from '../types';
import { useDebounce } from '../hooks/useDebounce';

interface DashboardProps {
  onAddTask: () => void;
  onUpgrade?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onAddTask, onUpgrade }) => {
  const { tasks, user, searchQuery } = useData();
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Safe data extraction
  const taskList = Array.isArray(tasks) ? tasks : [];
  
  const searchLower = debouncedSearch.toLowerCase().trim();
  const filteredSnapshot = taskList.filter(t => {
    // Hide completed tasks from dashboard
    if (t.status === 'Completed') return false;
    
    if (!searchLower) return true;
    return (
      (t.title || "").toLowerCase().includes(searchLower) ||
      (t.description || "").toLowerCase().includes(searchLower)
    );
  });
  
  const activeTasks = taskList.filter(t => t.status !== 'Completed');
  
  const stats = [
    { label: 'Tugas Aktif', value: activeTasks.length, icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Belum Selesai', value: activeTasks.filter(t => t.status !== 'In Progress').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Prioritas Tinggi', value: activeTasks.filter(t => t.priority === 'High').length, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const chartData = [
    { name: 'Sen', tasks: 4 },
    { name: 'Sel', tasks: 3 },
    { name: 'Rab', tasks: 6 },
    { name: 'Kam', tasks: 8 },
    { name: 'Jum', tasks: 5 },
    { name: 'Sab', tasks: 2 },
    { name: 'Min', tasks: 1 },
  ];

  const pieData = [
    { name: 'Selesai', value: tasks.filter(t => t.status === 'Completed').length, color: '#10B981' },
    { name: 'Progres', value: tasks.filter(t => t.status === 'In Progress').length, color: '#F59E0B' },
    { name: 'Tertunda', value: tasks.filter(t => t.status === 'Pending').length, color: '#6366F1' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-32 md:pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 flex items-center gap-2 leading-tight">
            Halo, {user?.name.split(' ')[0] || 'Mahasiswa'}! 👋
          </h1>
          <p className="text-slate-500 font-medium italic mt-1 opacity-80">Beban tugas kamu hari ini terpantau {taskList.length > 5 ? 'padat' : 'terkendali'}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {!user?.isPremium && (
            <button 
              onClick={onUpgrade}
              className="flex-1 sm:flex-none glass-indigo text-indigo-600 px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-95"
            >
              <Zap className="w-5 h-5 fill-indigo-100" /> Go Pro
            </button>
          )}
          <button 
            onClick={onAddTask}
            className="flex-[2] sm:flex-none bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" /> <span className="hidden xs:inline">Tambah</span> Tugas
          </button>
        </div>
      </div>

      {!user?.isPremium && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 sm:p-8 rounded-[2.5rem] text-white overflow-hidden relative group shadow-2xl shadow-indigo-100"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left transition-transform group-hover:translate-x-2 duration-500">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 tracking-tight">Siap Jadi Lulusan Terbaik? 🎓</h2>
              <p className="text-indigo-50 font-medium max-w-lg opacity-90 text-sm sm:text-base">Buka akses eksklusif ke Tampilan Kalender, Tugas Kelompok, dan Analitik Lanjutan untuk performa akademik maksimal.</p>
            </div>
            <button 
              onClick={onUpgrade}
              className="w-full md:w-auto bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-950/20 shrink-0 whitespace-nowrap active:scale-95"
            >
              Cek Penawaran Pro
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl -ml-24 -mb-24 group-hover:scale-150 transition-transform duration-700" />
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-5 rounded-[2rem] flex items-center gap-5 group hover:scale-[1.02] transition-all cursor-default"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">{stat.label}</p>
              <p className="text-3xl font-display font-bold text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">Distribusi Tugas Mingguan</h3>
              <p className="text-sm text-slate-500 font-medium">Statistik penyelesaian tugas kamu</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
              <TrendingUp className="w-3 h-3" /> +12% dibanding pekan lalu
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="tasks" 
                  fill="#4F46E5" 
                  radius={[8, 8, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="glass p-8 rounded-3xl">
          <h3 className="font-display text-xl font-bold text-slate-900 mb-8 text-center">Status Keaktifan</h3>
          <div className="h-60 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 transition-colors hover:bg-slate-100 uppercase tracking-tighter font-inter font-bold">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Snapshot */}
      <div className="glass p-5 sm:p-8 rounded-[2.5rem]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="font-display text-xl font-bold text-slate-900">Deadline Terdekat</h3>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1 bg-indigo-50 sm:bg-transparent py-2.5 sm:py-0 rounded-xl transition-all">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {filteredSnapshot.length > 0 ? (
            filteredSnapshot.slice(0, 5).map((task, i) => {
              try {
                return (
                  <div key={task.id || i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[1.5rem] glass-indigo/50 sm:glass border-none sm:border-slate-100 hover:border-indigo-200 hover:bg-white transition-all group gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                        task.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-white text-slate-600'
                      )}>
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                          <HighlightText text={task.title || 'Tanpa Judul'} search={debouncedSearch} />
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Deadline: {formatDateTime(task.dueDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-16 sm:pl-0">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                        task.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                      )}>
                        {task.status || 'Pending'}
                      </div>
                      
                      {task.status !== 'Completed' && (
                        <div className="flex items-center gap-2">
                          {task.status === 'Pending' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); useData().updateTask(task.id, { status: 'In Progress' }); }}
                              className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                              title="Kerjakan"
                            >
                              <Clock className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {task.status === 'In Progress' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); useData().updateTask(task.id, { status: 'Pending' }); }}
                              className="p-1.5 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
                              title="Tunda"
                            >
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button 
                            onClick={(e) => { e.stopPropagation(); useData().updateTask(task.id, { status: 'Completed' }); }}
                            className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                            title="Selesai"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              } catch (e) {
                console.error("Kesalahan render snapshot tugas:", e);
                return null;
              }
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 font-medium italic">Data tidak tersedia atau belum ada tugas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
