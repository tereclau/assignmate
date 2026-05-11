import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Calendar, 
  Tag, 
  AlignLeft,
  Users
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { TaskPriority, TaskStatus } from '../types';
import { cn } from '../lib/utils';

export const NewTaskModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addTask, projects } = useData();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium' as TaskPriority,
    projectId: '',
    isGroupTask: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) return;
    
    addTask({
      ...formData,
      status: 'Pending'
    });
    setFormData({ title: '', description: '', dueDate: '', priority: 'Medium', projectId: '', isGroupTask: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative glass bg-white/90 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border-white/60"
        >
          <div className="p-8 border-b border-indigo-50/50 flex items-center justify-between bg-white/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">Tambah Tugas Baru</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all active:scale-90"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-7">
            <div className="space-y-2.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Nama Tugas
              </label>
              <input 
                autoFocus
                type="text" 
                required
                placeholder="Contoh: Makalah Ekonomi Mikro"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder:font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div className="space-y-2.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Tenggat Waktu
                </label>
                <input 
                  type="datetime-local" 
                  min={new Date().toISOString().slice(0, 16)}
                  required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-indigo-500" /> Prioritas
                </label>
                <div className="relative">
                  <select 
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                  >
                    <option value="Low">🟢 Rendah</option>
                    <option value="Medium">🟡 Sedang</option>
                    <option value="High">🔴 Tinggi</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-indigo-500" /> Mata Kuliah / Proyek
              </label>
              <select 
                value={formData.projectId}
                onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
              >
                <option value="">📚 Tanpa Proyek (Mandiri)</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>🎯 {p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <AlignLeft className="w-3.5 h-3.5 text-indigo-500" /> Catatan Tambahan
              </label>
              <textarea 
                rows={3}
                placeholder="Detail tugas atau instruksi dosen..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder:font-medium resize-none"
              />
            </div>

            <div className="flex items-center gap-3 py-2 px-1 group cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, isGroupTask: !prev.isGroupTask }))}>
              <div className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                formData.isGroupTask ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100" : "border-slate-200 bg-white"
              )}>
                {formData.isGroupTask && <Plus className="w-4 h-4 text-white" />}
              </div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 cursor-pointer select-none">
                <Users className={cn("w-4 h-4 transition-colors", formData.isGroupTask ? "text-indigo-600" : "text-slate-400")} /> Ini adalah tugas kelompok
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.15em] text-xs hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-[0.98] mt-4"
            >
              <Plus className="w-5 h-5" /> Buat Tugas Baru
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
