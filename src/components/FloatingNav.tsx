import React from 'react';
import { motion } from 'motion/react';
import { 
  CircleDashed, 
  Phone, 
  Users2, 
  MessageCircle, 
  UserCircle 
} from 'lucide-react';
import { cn } from '../lib/utils';

export const FloatingNav: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-2xl px-6 py-4 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 flex items-center gap-2 sm:gap-6"
      >
        <NavButton icon={CircleDashed} label="Pembaruan" />
        <NavButton icon={Phone} label="Panggilan" />
        <NavButton icon={Users2} label="Komunitas" />
        <NavButton 
          icon={MessageCircle} 
          label="Chat" 
          active 
          badge="42" 
        />
        <NavButton 
          icon={UserCircle} 
          label="Anda" 
          badge="1"
          isProfile
        />
      </motion.div>
    </div>
  );
};

interface NavButtonProps {
  icon: any;
  label: string;
  active?: boolean;
  badge?: string;
  isProfile?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, active, badge, isProfile }) => (
  <button className={cn(
    "relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-3xl transition-all duration-300 group",
    active ? "bg-slate-100/80 scale-105" : "hover:bg-slate-50"
  )}>
    <div className="relative">
      <Icon className={cn(
        "w-6 h-6 transition-transform group-active:scale-90",
        active ? "text-slate-900 stroke-[2.5px]" : "text-slate-600 stroke-[2px]",
        isProfile && "text-cyan-600/70"
      )} />
      
      {badge && (
        <span className="absolute -top-2 -right-3 bg-[#10b981] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm min-w-[20px]">
          {badge}
        </span>
      )}
    </div>
    <span className={cn(
      "text-[10px] font-bold tracking-tight",
      active ? "text-slate-900" : "text-slate-500"
    )}>
      {label}
    </span>
  </button>
);
