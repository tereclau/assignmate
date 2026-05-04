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
import { formatDate, formatTime } from '../lib/utils';

export const NotificationsPage: React.FC = () => {
  const { notifications } = useData();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">Notifikasi</h1>
          <p className="text-slate-500 font-medium">Riwayat aktivitas dan pembaruan sistem kamu.</p>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/20 bg-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="font-display text-xl font-bold text-slate-900">Riwayat Aktivitas</h2>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
            {notifications.length} Notifikasi
          </span>
        </div>

        <div className="divide-y divide-slate-50">
          <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
              notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 flex items-start gap-5 hover:bg-slate-50/50 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    notif.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                  }`}>
                    {notif.type === 'success' && <CheckCircle2 className="w-6 h-6" />}
                    {notif.type === 'error' && <AlertCircle className="w-6 h-6" />}
                    {notif.type === 'info' && <Info className="w-6 h-6" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <p className="font-bold text-slate-900 truncate group-hover:text-indigo-700 transition-colors">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 whitespace-nowrap bg-slate-100 px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(notif.timestamp)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      {formatDate(notif.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">Belum ada notifikasi</h3>
                <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2">
                  Semua pembaruan tugas dan aktivitas kamu akan muncul di sini.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
