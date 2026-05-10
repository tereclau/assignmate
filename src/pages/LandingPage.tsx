import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar: React.FC<{ onAuth: () => void; onPricing?: () => void }> = ({ onAuth, onPricing }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-xl border-b border-white/40">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <CheckCircle2 className="text-white w-5 h-5" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight">AssignMate</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Fitur</a>
        <button onClick={onPricing} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Harga</button>
        <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Tentang</a>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onAuth} className="text-sm font-semibold text-slate-700 px-4 py-2 hover:text-indigo-600 transition-colors">Masuk</button>
        <button onClick={onAuth} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-inter font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200/50">Mulai Sekarang</button>
      </div>
    </div>
  </nav>
);

export const LandingPage: React.FC<{ onAction: () => void; onUpgrade?: () => void }> = ({ onAction, onUpgrade }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
              Platform Produktivitas Akademik #1
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-bold text-slate-900 leading-tight mb-8 tracking-tighter">
              Kuasai <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_auto]">Tugas</span> Kamu,<br />
              Bukan Sebaliknya.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              AssignMate membantu mahasiswa mengelola deadline, koordinasi tim, dan memantau progres akademik dalam satu dashboard premium yang intuitif.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onAction}
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
              >
                Coba Gratis Sekarang <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold text-slate-600 hover:bg-slate-100 transition-all">
                Lihat Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">Fitur Cerdas untuk Mahasiswa</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto italic">Dirancang untuk mengatasi tantangan dunia perkuliahan yang serba cepat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Pengingat Deadline', desc: 'Notifikasi otomatis untuk tugas yang akan jatuh tempo agar kamu tidak pernah ketinggalan.' },
              { icon: Users, title: 'Koordinasi Kelompok', desc: 'Kelola tugas tim dengan mudah, bagi tanggung jawab, dan pantau progres teman sekelompok.' },
              { icon: BarChart3, title: 'Analisis Progres', desc: 'Visualisasikan beban kerja kamu dalam seminggu dengan grafik interaktif yang informatif.' },
              { icon: Zap, title: 'Fokus Mode', desc: 'Prioritaskan tugas paling mendesak dengan algoritma cerdas AssignMate.' },
              { icon: Calendar, title: 'Tampilan Kalender', desc: 'Visualisasikan semua deadline kamu dalam format kalender yang intuitif dan bersih.' },
              { icon: ShieldCheck, title: 'Aman & Terpercaya', desc: 'Data kamu tersimpan dengan aman dan sinkron antar perangkat secara otomatis.' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl glass transition-all group hover:scale-[1.02]"
              >
                <div className="w-14 h-14 bg-white/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 transition-colors">
                  <f.icon className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">Pilih Paket Belajarmu</h2>
            <p className="text-slate-500 font-medium">Investasi terbaik untuk masa depan akademik kamu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="glass p-10 rounded-3xl group hover:scale-[1.02] transition-transform">
              <h3 className="font-display text-xl font-bold mb-2 tracking-tight">Basic</h3>
              <p className="text-slate-500 mb-6 font-medium">Untuk mahasiswa hemat.</p>
              <div className="mb-8">
                <span className="text-4xl font-display font-bold tracking-tighter">Gratis</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Hingga 5 Tugas Aktif', '1 Tugas Kelompok', 'Dashboard Dasar', 'Pengingat Browser'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold tracking-tight">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onAction}
                className="w-full py-4 rounded-2xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition-all uppercase tracking-widest text-xs"
              >
                Daftar Sekarang
              </button>
            </div>
            {/* Premium Plan */}
            <div className="bg-indigo-600/90 backdrop-blur-xl p-10 rounded-3xl text-white shadow-2xl shadow-indigo-200/50 relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 px-6 py-1 font-bold text-xs rounded-bl-xl uppercase tracking-wider">Terpopuler</div>
              <h3 className="font-display text-xl font-bold mb-2 tracking-tight">Pro</h3>
              <p className="text-indigo-100 mb-6 font-medium">Untuk mahasiswa ambisius.</p>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold tracking-tighter">Rp 15rb</span>
                <span className="text-indigo-200 text-sm font-bold">/bulan</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Tugas Tanpa Batas', 'Tim Tanpa Batas', 'Analitik Lanjutan', 'Prioritas AI', 'Semua Fitur Baru'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-indigo-50 font-bold tracking-tight">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400" /> {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onUpgrade}
                className="w-full py-4 rounded-2xl bg-white text-indigo-600 font-bold hover:bg-slate-50 transition-all shadow-xl uppercase tracking-widest text-xs ring-1 ring-white/20"
              >
                Pilih Pro
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
