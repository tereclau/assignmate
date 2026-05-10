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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 overflow-hidden"
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
            <div className="h-32 bg-linear-to-r from-indigo-600 to-violet-700 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-8 pb-8">
              {/* Profile Pic Overlap */}
              <div className="relative -mt-16 mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-xl bg-slate-100 overflow-hidden relative group">
                    {formData.avatar ? (
                      <img 
                        src={formData.avatar} 
                        className="w-full h-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
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
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 p-2.5 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition-all active:scale-90 z-10"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h2 className="text-2xl font-display font-bold text-slate-900">{user.name}</h2>
                    {user.isPremium && (
                      <div className="px-2 py-0.5 bg-amber-100 border border-amber-200 rounded-md flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">PRO</span>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-500 font-medium">{user.email}</p>
                  
                  {user.bio && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl inline-block max-w-sm">
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{user.bio}"</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 mt-8">
                    {!user.isPremium && (
                      <button 
                        onClick={onUpgrade}
                        className="flex items-center justify-between p-4 bg-linear-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 rounded-2xl border border-indigo-100 hover:border-indigo-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 fill-indigo-600" />
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-indigo-900 block">Upgrade ke Pro</span>
                            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Buka Semua Fitur</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}

                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-indigo-600">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-700">Edit Profil</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
                    </button>

                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-between p-4 bg-rose-50/50 hover:bg-rose-50 rounded-2xl border border-rose-100/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-rose-400 group-hover:text-rose-600">
                          <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-rose-700">Keluar Akun</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-rose-300 group-hover:text-rose-400" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-indigo-500" /> Nama Lengkap
                    </label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.name && <p className="text-xs font-bold text-rose-500 ml-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-500" /> Alamat Email
                    </label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                      placeholder="email@contoh.com"
                    />
                    {errors.email && <p className="text-xs font-bold text-rose-500 ml-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-indigo-500" /> Upload
                      </label>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 text-sm font-bold text-slate-600"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                         Atau URL
                      </label>
                      <input 
                        type="text"
                        value={formData.avatar}
                        onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-xs font-medium"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                         Opsi
                      </label>
                      <button 
                        disabled={!formData.avatar}
                        onClick={() => setFormData({ ...formData, avatar: '' })}
                        className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2 text-sm font-bold text-rose-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                      <Clipboard className="w-4 h-4 text-indigo-500" /> Bio Singkat
                    </label>
                    <textarea 
                      value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium resize-none min-h-[80px]"
                      placeholder="Tulis sedikit tentang dirimu..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex-1 px-8 py-4 bg-linear-to-r from-indigo-600 to-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Save className="w-5 h-5" />
                      Simpan
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
