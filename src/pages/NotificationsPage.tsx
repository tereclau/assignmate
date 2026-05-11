import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock, 
  Search,
  Trash2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatDate, formatTime, cn } from '../lib/utils';

export const NotificationsPage: React.FC = () => {
  const { notifications } = useData();

  return (
    <div className="space-y-6 sm:space-y-8 pb-32 md:pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">Notifikasi</h1>
          <p className="text-slate-500 font-medium opacity-80">Riwayat aktivitas dan pembaruan sistem kamu.</p>
        </div>
      </div>

      <div className="glass rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-none sm:border-white/60">
        <div className="p-6 sm:p-8 border-b border-indigo-50/50 bg-white/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-[1.25rem] flex items-center justify-center shadow-sm ring-1 ring-slate-100">
              <Bell className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Riwayat Aktivitas</h2>
          </div>
          <span className="hidden xs:block text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-white/60">
            {notifications.length} Info
          </span>
        </div>

        <div className="divide-y divide-slate-100/50">
          <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
              notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 sm:p-6 flex items-start gap-4 sm:gap-5 hover:bg-indigo-50/30 transition-colors group cursor-default"
                >
                  <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                    notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    notif.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                  )}>
                    {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                    {notif.type === 'error' && <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                    {notif.type === 'info' && <Info className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1">
                      <p className="font-bold text-slate-900 truncate group-hover:text-indigo-700 transition-colors leading-tight">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap bg-white/50 px-2 py-1 rounded-lg border border-white/60 w-fit">
                        <Clock className="w-3 h-3" />
                        {formatTime(notif.timestamp)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      {formatDate(notif.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 sm:py-24 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Bell className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">Belum ada notifikasi</h3>
                <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2 px-4 opacity-70">
                  Semua pembaruan tugas dan aktivitas kamu akan muncul di sini secara real-time.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
