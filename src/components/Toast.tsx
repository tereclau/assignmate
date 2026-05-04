import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Toast: React.FC = () => {
  const { activeNotification } = useData();

  return (
    <div className="fixed top-6 right-6 z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        {activeNotification && (
          <motion.div
            key={activeNotification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pointer-events-auto min-w-[320px] max-w-sm glass p-5 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-l-4 overflow-hidden flex items-start gap-4"
            style={{ 
              borderLeftColor: activeNotification.type === 'success' ? '#10B981' : activeNotification.type === 'error' ? '#EF4444' : '#6366F1'
            }}
          >
            <div className="mt-1 shadow-sm rounded-full p-0.5">
              {activeNotification.type === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              {activeNotification.type === 'error' && <AlertCircle className="w-6 h-6 text-rose-500" />}
              {activeNotification.type === 'info' && <Info className="w-6 h-6 text-indigo-500" />}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 leading-tight">{activeNotification.message}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                Sekarang
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
