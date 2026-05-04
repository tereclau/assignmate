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
  User as UserIcon
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
      className="h-screen bg-white/40 backdrop-blur-3xl border-r border-white/40 flex flex-col sticky top-0 z-30"
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

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-indigo-50 text-indigo-700" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0",
              activeTab === item.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="space-y-2">
          {!isCollapsed && user?.isPremium && (
            <div className="bg-linear-to-br from-indigo-600 to-violet-700 p-4 rounded-2xl text-white mb-4 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-xs font-medium text-indigo-100 uppercase tracking-wider mb-1">Status Akun</p>
                <p className="font-bold text-sm">Premium Member</p>
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
