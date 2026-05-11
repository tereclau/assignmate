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
  Calendar,
  MousePointer2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Footer } from '../components/Footer';

export const Navbar: React.FC<{ onAuth: () => void; onPricing?: () => void }> = ({ onAuth, onPricing }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#6344f5] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <CheckCircle2 className="text-white w-6 h-6" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight text-[#1a1f36]">AssignMate</span>
      </div>
      
      <div className="hidden md:flex items-center gap-12">
        <a href="#features" className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5c677d] hover:text-[#6344f5] transition-colors">Fitur</a>
        <button onClick={onPricing} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5c677d] hover:text-[#6344f5] transition-colors">Harga</button>
        <a href="#about" className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5c677d] hover:text-[#6344f5] transition-colors">Tentang</a>
      </div>

      <button 
        onClick={onAuth} 
        className="bg-[#5046e5] text-white px-10 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-100"
      >
        Mulai
      </button>
    </div>
  </nav>
);

export const LandingPage: React.FC<{ onAction: () => void; onUpgrade?: () => void }> = ({ onAction, onUpgrade }) => {
  return (
    <div className="pt-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Platform Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f3f7] mb-12">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black text-[#5c677d] uppercase tracking-[0.15em]">Platform Produktivitas Mahasiswa #1</span>
            </div>
            
            {/* Headline */}
            <h1 className="font-display text-[2.8rem] md:text-[6.5rem] font-bold text-[#111827] leading-[1.05] mb-10 tracking-tight">
              Kuasai <span className="relative inline-block">
                <span className="relative z-10 text-[#d946ef]">Tugas</span>
                <div className="absolute bottom-4 left-0 w-full h-[0.3em] bg-[#e0f2fe] -z-10 blur-[15px]" />
                <div className="absolute bottom-2 left-0 w-full h-[0.15em] bg-[#e0f2fe]/60 -z-10" />
              </span> Kamu, <br />
              Bukan Sebaliknya.
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5c677d] mb-14 leading-relaxed font-semibold opacity-90 px-4">
              AssignMate membantu mahasiswa mengelola deadline, koordinasi tim, dan memantau progres akademik dalam satu dashboard premium yang intuitif.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <button 
                onClick={onAction}
                className="w-full sm:w-auto bg-[#5046e5] text-white px-12 py-5 rounded-full text-sm font-black tracking-wide hover:bg-[#4338ca] transition-all shadow-[0_20px_40px_rgba(80,70,229,0.25)] flex items-center justify-center gap-3 active:scale-95"
              >
                Coba Gratis Sekarang <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onAction}
                className="text-sm font-bold text-[#374151] hover:text-[#6344f5] transition-colors"
              >
                Lihat Demo
              </button>
            </div>
          </motion.div>

          {/* Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-28 relative max-w-[1000px] mx-auto"
          >
            {/* Floater Left: Tugas Selesai */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-12 -left-4 md:-left-20 z-20 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/40 min-w-[160px] text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#e8fbf3] rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-0.5">Tugas</p>
                  <p className="text-xs font-bold text-[#1f2937]">Selesai!</p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981] w-[75%] rounded-full" />
              </div>
            </motion.div>

            {/* Floater Right: Fokus */}
            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-10 -right-4 md:-right-20 z-20 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/40 min-w-[180px] text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#fffbeb] rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-0.5">Fokus</p>
                  <p className="text-xs font-bold text-[#1f2937]">Sisa 2 Jam</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[1, 1, 1, 0].map((active, i) => (
                  <div key={i} className={cn("h-1.5 flex-1 rounded-full", active ? "bg-[#f59e0b]" : "bg-[#f1f5f9]")} />
                ))}
              </div>
            </motion.div>

            {/* Main Screen Frame */}
            <div className="relative rounded-[3.5rem] bg-white p-4 shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] border border-white">
              <div className="rounded-[2.8rem] overflow-hidden aspect-video bg-[#f9fafb] relative">
                <img 
                  src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2664&auto=format&fit=crop" 
                  alt="Dashboard View"
                  className="w-full h-full object-cover opacity-90 blur-[1px]"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-white/30 to-transparent" />
              </div>
            </div>
            
            {/* Bottom Glow */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90%] h-1/2 bg-[#5046e5]/5 blur-[100px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#111827] mb-6 tracking-tight">Kekuatan AssignMate</h2>
            <p className="text-[#5c677d] font-medium italic opacity-80">Organisir kehidupan kuliahmu dengan lebih cerdas.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Clock, title: 'Deadline Cerdas', desc: 'Notifikasi prediktif yang memberitahu kamu sebelum stres melanda.' },
              { icon: Users, title: 'Kolaborasi Instan', desc: 'Selesaikan tugas kelompok tanpa drama sinkronisasi file.' },
              { icon: BarChart3, title: 'Analytics Akademik', desc: 'Pelajari pola produktivitas kamu dan tingkatkan nilai kamu.' },
              { icon: Calendar, title: 'Agenda Terintegrasi', desc: 'Sinkronisasi semua jadwal kuliah dan tugas dalam satu tampilan.' },
              { icon: MousePointer2, title: 'Antarmuka Zen', desc: 'Desain minimalis yang dirancang untuk menjaga fokus kamu tetap tajam.' },
              { icon: ShieldCheck, title: 'Keamanan Data', desc: 'Catatan dan tugas kamu tersimpan aman dengan enkripsi tingkat bank.' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-10 bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-white hover:bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#eef2ff] text-[#5046e5] rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-[#5046e5] group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#111827] mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-[#5c677d] font-medium leading-relaxed italic text-[15px] opacity-80">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative aspect-square md:aspect-video lg:aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop" 
                  alt="Students collaborating"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-[#5046e5]/40 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                    <p className="text-white font-display text-2xl font-bold tracking-tight mb-2">Pemberdayaan Akademik</p>
                    <p className="text-white/80 font-medium leading-relaxed italic text-sm">"Kami percaya bahwa setiap mahasiswa memiliki potensi luar biasa jika mereka memiliki alat yang tepat untuk mengelola beban kerja mereka."</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eef2ff] mb-8">
                <div className="w-1.5 h-1.5 bg-[#5046e5] rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-[#5046e5] uppercase tracking-[0.2em]">Cerita Kami</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#111827] mb-8 tracking-tight leading-tight">Membangun Masa Depan <br /><span className="text-[#5046e5]">Tanpa Burnout.</span></h2>
              
              <div className="space-y-8">
                <p className="text-[#5c677d] font-medium text-lg leading-relaxed italic opacity-90">
                  AssignMate lahir dari frustrasi mahasiswa tingkat akhir yang melihat betapa kacau dan stresnya kehidupan kampus tanpa manajemen tugas yang terarah.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="p-6 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
                    <h4 className="font-bold text-[#111827] mb-2 flex items-center gap-2">
                       <ShieldCheck className="w-5 h-5 text-[#5046e5]" /> Visi Kami
                    </h4>
                    <p className="text-xs text-[#5c677d] font-medium leading-relaxed italic opacity-80">Menjadi pusat kendali utama bagi perjalanan akademik setiap mahasiswa di seluruh dunia.</p>
                  </div>
                  <div className="p-6 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
                    <h4 className="font-bold text-[#111827] mb-2 flex items-center gap-2">
                       <Zap className="w-5 h-5 text-amber-500 fill-amber-500" /> Misi Kami
                    </h4>
                    <p className="text-xs text-[#5c677d] font-medium leading-relaxed italic opacity-80">Menciptakan teknologi intuitif yang mengurangi stres dan meningkatkan fokus belajar mahasiswa.</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#e2e8f0]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#6344f5] rounded-2xl flex items-center justify-center text-white font-bold">AM</div>
                    <div>
                      <p className="font-bold text-[#111827]">Team AssignMate</p>
                      <p className="text-xs text-[#5c677d] font-medium italic">Didukung oleh komunitas mahasiswa Jakarta</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#111827] mb-6 tracking-tight">Paket Langganan</h2>
            <p className="text-[#5c677d] font-medium italic opacity-80">Pilih tingkat produktivitas yang kamu butuhkan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-md p-12 rounded-[3.5rem] border border-white/60">
              <h3 className="font-display text-2xl font-black text-[#111827] mb-2 tracking-tighter">Gratis</h3>
              <p className="text-[#5c677d] mb-8 font-bold italic text-sm opacity-60">Ideal untuk pemula.</p>
              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-display font-black text-[#111827]">0</span>
                <span className="text-xs font-black uppercase text-[#94a3b8] tracking-widest pl-2">IDR / SELAMANYA</span>
              </div>
              <ul className="space-y-5 mb-12">
                {[
                  '5 Tugas Aktif Mata Kuliah', 
                  'Dashboard Standar', 
                  'Notifikasi Browser'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#374151] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#10b981]" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onAction} 
                className="w-full py-5 rounded-2xl border-2 border-[#e2e8f0] text-[#5c677d] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all"
              >
                Mulai Gratis
              </button>
            </div>

            <div className="bg-[#111827] p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[#5046e5] px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest ring-4 ring-[#111827]">PRO</div>
              <h3 className="font-display text-2xl font-black mb-2 tracking-tighter">Premium</h3>
              <p className="text-[#94a3b8] mb-8 font-bold italic text-sm">Produktivitas tanpa batas.</p>
              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl font-display font-black">15k</span>
                <span className="text-xs font-black uppercase text-[#64748b] tracking-widest">IDR / BULAN</span>
              </div>
              <ul className="space-y-5 mb-12">
                {[
                  'Semua Tugas Tanpa Batas', 
                  'Dashboard Pro Kustom', 
                  'Kolaborasi Tim Real-time',
                  'Mode Fokus & Timer'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/90 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#5046e5]" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={onUpgrade} 
                className="w-full py-5 rounded-2xl bg-[#5046e5] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-900/40"
              >
                Upgrade Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
