import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  Bell,
  User as UserIcon,
  Zap
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { cn } from '../lib/utils';

export const Sidebar: React.FC<{ 
  activeTab: string; 
  onTabChange: (tab: string) => void;
  onProfileClick: () => void;
}> = ({ 
  activeTab, 
  onTabChange,
  onProfileClick
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useData();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tugas Saya', icon: CheckSquare },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'calendar', label: 'Kalender', icon: CalendarIcon },
    { id: 'group', label: 'Tugas Kelompok', icon: Users },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-white/40 backdrop-blur-3xl border-r border-white/40 hidden md:flex flex-col sticky top-0 z-30"
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <CheckSquare className="text-white w-5 h-5 shadow-sm" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900">AssignMate</span>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto">
            <CheckSquare className="text-white w-5 h-5" />
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-3 rounded-[1.25rem] transition-all duration-300 group relative active:scale-95",
              activeTab === item.id 
                ? "glass bg-white/80 text-indigo-700 shadow-lg shadow-indigo-100/50" 
                : "text-slate-500 hover:bg-white/40 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0 transition-transform duration-300",
              activeTab === item.id ? "text-indigo-600 scale-110" : "text-slate-400 group-hover:text-slate-600 group-hover:scale-110"
            )} />
            {!isCollapsed && <span className="font-bold tracking-tight">{item.label}</span>}
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute right-2 w-1.5 h-1.5 bg-indigo-600 rounded-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        {!isCollapsed && !user?.isPremium && (
          <div className="glass bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-5 rounded-[2rem] mb-6 relative overflow-hidden group shadow-xl shadow-indigo-200">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-3 shadow-sm border border-white/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Dapatkan Pro</p>
              <p className="text-[10px] text-indigo-100 font-bold mb-4 leading-relaxed opacity-90">Akses fitur eksklusif & kolaborasi tanpa batas.</p>
              <button 
                onClick={() => onTabChange('pricing')}
                className="w-full bg-white text-indigo-600 py-3 rounded-xl text-[10px] font-black hover:bg-indigo-50 transition-all uppercase tracking-[0.15em] shadow-lg active:scale-95"
              >
                Upgrade Sekarang
              </button>
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        )}

        <div className="space-y-2">
          {!isCollapsed && user?.isPremium && (
            <div className="bg-linear-to-br from-indigo-600 to-violet-700 p-4 rounded-2xl text-white mb-4 relative overflow-hidden group shadow-lg shadow-indigo-100">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-indigo-100 uppercase tracking-wider mb-1">Status Akun</p>
                  <p className="font-bold text-sm tracking-tight">Premium Member</p>
                </div>
                <Users className="w-5 h-5 text-indigo-200/50" />
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          )}
          
          <button
            onClick={onProfileClick}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group mb-2"
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                className="w-10 h-10 rounded-xl bg-slate-100 object-cover"
                alt="avatar"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
            {!isCollapsed && (
              <div className="text-left overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">Lihat Profil</p>
              </div>
            )}
          </button>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5 mx-auto" /> : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Sembunyikan Menu</span>
              </>
            )}
          </button>
          
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="font-medium">Keluar</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
