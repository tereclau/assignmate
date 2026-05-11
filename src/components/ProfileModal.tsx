import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Mail, Camera, Clipboard, LogOut, ChevronRight, Save, Image as ImageIcon, Star, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const { user, updateUser, logout } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [user, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama tidak boleh kosong';
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      updateUser(formData);
      setIsEditing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for base64 storage
        alert('File terlalu besar. Maksimal 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-lg glass bg-white/90 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden border-white/60"
          >
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />

            {/* Header / Cover */}
            <div className="h-32 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all active:scale-95 border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 sm:px-10 pb-10">
              {/* Profile Pic Overlap */}
              <div className="relative -mt-16 mb-8 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-2xl bg-white overflow-hidden relative group">
                    {formData.avatar ? (
                      <img 
                        src={formData.avatar} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt="profile"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <UserIcon className="w-16 h-16" />
                      </div>
                    )}
                    {isEditing && formData.avatar && (
                      <button 
                        onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                        className="absolute inset-0 bg-rose-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        title="Hapus Foto"
                      >
                        <X className="w-8 h-8" />
                      </button>
                    )}
                  </div>
                  {isEditing && (
                    <motion.button 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-1 right-1 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-90 z-10 border-2 border-white"
                    >
                      <Camera className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">{user.name}</h2>
                    {user.isPremium && (
                      <div className="px-2.5 py-1 bg-linear-to-r from-amber-400 to-amber-600 border border-amber-300 rounded-lg flex items-center gap-1.5 shadow-lg shadow-amber-100">
                        <Star className="w-3.5 h-3.5 text-white fill-white" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">PRO</span>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-500 font-medium tracking-tight opacity-70 mb-4">{user.email}</p>
                  
                  {user.bio && (
                    <div className="mt-6 p-5 glass-indigo rounded-3xl inline-block max-w-[90%] border-indigo-100/50">
                      <p className="text-sm text-indigo-900/70 leading-relaxed font-medium italic">"{user.bio}"</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 mt-10">
                    {!user.isPremium && (
                      <button 
                        onClick={onUpgrade}
                        className="flex items-center justify-between p-5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-3xl text-white shadow-xl shadow-indigo-100 transition-all group active:scale-95"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md shadow-sm text-white group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 fill-white" />
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-lg block leading-tight">Upgrade ke Pro</span>
                            <span className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest opacity-80">Buka Semua Fitur Premium</span>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-white/60 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}

                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-between p-5 bg-white hover:bg-indigo-50/50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-400 group-hover:text-indigo-600 group-hover:bg-white transition-colors">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-700 tracking-tight">Edit Profil Akun</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-between p-5 bg-white hover:bg-rose-50/50 rounded-3xl border border-slate-100 hover:border-rose-100 transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-rose-50 rounded-xl text-rose-300 group-hover:text-rose-500 group-hover:bg-white transition-colors">
                          <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-700 tracking-tight">Keluar dari Sesi</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-rose-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <UserIcon className="w-3.5 h-3.5 text-indigo-500" /> Nama Lengkap
                    </label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder:font-medium"
                      placeholder="Nama kamu..."
                    />
                    {errors.name && <p className="text-[10px] font-black text-rose-500 ml-1 uppercase tracking-wider">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-indigo-500" /> Alamat Email
                    </label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder:font-medium"
                      placeholder="email@universitas.ac.id"
                    />
                    {errors.email && <p className="text-[10px] font-black text-rose-500 ml-1 uppercase tracking-wider">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Clipboard className="w-3.5 h-3.5 text-indigo-500" /> Bio Singkat
                    </label>
                    <textarea 
                      value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 placeholder:font-medium resize-none min-h-[100px]"
                      placeholder="Beritahu dunia tentang dirimu..."
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-8 py-5 bg-slate-100 text-slate-600 font-black uppercase tracking-widest text-[11px] rounded-[1.5rem] hover:bg-slate-200 transition-all active:scale-95"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex-1 px-8 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-[1.5rem] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
