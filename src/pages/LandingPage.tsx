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
import { Footer } from '../components/Footer';

export const Navbar: React.FC<{ onAuth: () => void; onPricing?: () => void }> = ({ onAuth, onPricing }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-3xl border-b border-white/40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <CheckCircle2 className="text-white w-6 h-6 shadow-sm" />
        </div>
        <span className="font-display font-bold text-xl sm:text-2xl tracking-tighter text-slate-900">AssignMate</span>
      </div>
      <div className="hidden lg:flex items-center gap-10">
        <a href="#features" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-600 transition-colors">Fitur</a>
        <button onClick={onPricing} className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-600 transition-colors">Harga</button>
        <a href="#about" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-600 transition-colors">Tentang</a>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={onAuth} className="hidden xs:block text-xs font-black uppercase tracking-widest text-slate-700 px-4 py-2 hover:bg-slate-100 rounded-xl transition-all">Masuk</button>
        <button onClick={onAuth} className="bg-indigo-600 text-white px-5 sm:px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">Mulai</button>
      </div>
    </div>
  </nav>
);

export const LandingPage: React.FC<{ onAction: () => void; onUpgrade?: () => void }> = ({ onAction, onUpgrade }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/40 mb-8 border-white/60 animate-float">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Platform Produktivitas Mahasiswa #1</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-8xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tighter text-balance">
              Kuasai <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 animate-gradient-x bg-[length:200%_auto]">Tugas</span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-indigo-100 -z-10 rounded-full" 
                />
              </span> Kamu,<br />
              Bukan Sebaliknya.
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-medium text-balance opacity-80">
              AssignMate membantu mahasiswa mengelola deadline, koordinasi tim, dan memantau progres akademik dalam satu dashboard premium yang intuitif.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={onAction}
                className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-[2rem] text-lg font-bold hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3 active:scale-95"
              >
                Coba Gratis Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 rounded-[2rem] text-lg font-bold text-slate-600 hover:bg-white/50 transition-all border border-transparent hover:border-white/60">
                Lihat Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-24 relative hidden md:block"
          >
            <div className="glass rounded-[3rem] p-4 border-white/60 shadow-2xl relative overflow-hidden group">
              <div className="bg-slate-50/50 rounded-[2.5rem] p-1 mb-1 ring-1 ring-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2664&auto=format&fit=crop" 
                  alt="Dashboard Preview"
                  className="rounded-[2.4rem] shadow-2xl transition-transform duration-1000 group-hover:scale-[1.01]"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Floating UI cards */}
            <div className="absolute -top-12 -left-12 glass p-6 rounded-3xl shadow-2xl animate-float max-w-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tugas</p>
                  <p className="text-sm font-bold text-slate-900">Selesai!</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%]" />
              </div>
            </div>

            <div className="absolute top-20 -right-12 glass p-6 rounded-3xl shadow-2xl animate-float max-w-[200px]" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Fokus</p>
                  <p className="text-sm font-bold text-slate-900">Sisa 2 Jam</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => <div key={i} className="h-1.5 flex-1 bg-amber-400 rounded-full" />)}
                <div className="h-1.5 flex-1 bg-slate-100 rounded-full" />
              </div>
            </div>
          </motion.div>
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
      <Footer />
    </div>
  );
};
