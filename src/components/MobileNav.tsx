import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  PlusSquare,
  Bell,
  User 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddTask: () => void;
  onProfileClick: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ 
  activeTab, 
  onTabChange, 
  onAddTask,
  onProfileClick 
}) => {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Beranda' },
    { id: 'tasks', icon: CheckSquare, label: 'Tugas' },
    { id: 'add', icon: PlusSquare, label: 'Tambah', action: onAddTask },
    { id: 'notifications', icon: Bell, label: 'Info' },
    { id: 'profile', icon: User, label: 'Profil', action: onProfileClick },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="glass bg-white/80 backdrop-blur-2xl rounded-3xl p-2 flex items-center justify-around shadow-2xl shadow-indigo-200/50 border-white/60">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => tab.action ? tab.action() : onTabChange(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300",
                isActive ? "text-indigo-600" : "text-slate-400"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 bg-indigo-50 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
              <Icon className={cn("w-6 h-6 relative z-10 transition-transform duration-300", isActive && "scale-110")} />
              <span className="text-[10px] font-bold uppercase tracking-tighter mt-1 relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  );
};
