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
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-slate-900">Tambah Tugas Baru</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Nama Tugas
              </label>
              <input 
                autoFocus
                type="text" 
                required
                placeholder="Contoh: Makalah Ekonomi Mikro"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" /> Tenggat Waktu
                </label>
                <input 
                  type="datetime-local" 
                  min={new Date().toISOString().slice(0, 16)}
                  required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-indigo-500" /> Prioritas
                </label>
                <select 
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
                >
                  <option value="Low">Rendah</option>
                  <option value="Medium">Sedang</option>
                  <option value="High">Tinggi</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500" /> Pilih Mata Kuliah / Proyek
              </label>
              <select 
                value={formData.projectId}
                onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium appearance-none"
              >
                <option value="">Tanpa Proyek</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-indigo-500" /> Catatan Tambahan
              </label>
              <textarea 
                rows={3}
                placeholder="Detail tugas atau instruksi dosen..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input 
                type="checkbox" 
                id="groupTask"
                checked={formData.isGroupTask}
                onChange={e => setFormData({ ...formData, isGroupTask: e.target.checked })}
                className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="groupTask" className="text-sm font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
                <Users className="w-4 h-4 text-indigo-500" /> Ini adalah tugas kelompok
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Buat Tugas Sekarang
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
