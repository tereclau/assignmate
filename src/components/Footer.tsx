import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Github, 
  Twitter, 
  Instagram, 
  Mail, 
  Globe, 
  ArrowUpRight,
  Shield,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pt-20 pb-10 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <CheckCircle2 className="text-white w-6 h-6 shadow-sm" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter text-slate-900">AssignMate</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed opacity-80">
              Platform produktivitas cerdas yang dirancang khusus untuk mahasiswa masa kini. Kelola tugas, kolaborasi tim, dan raih prestasi akademik terbaikmu.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="w-10 h-10 glass flex items-center justify-center rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white transition-all shadow-sm group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-slate-900 mb-6 tracking-tight">Navigasi Cepat</h3>
            <ul className="space-y-4">
              {[
                { label: 'Beranda', href: '#' },
                { label: 'Fitur Unggulan', href: '#features' },
                { label: 'Paket Harga', href: '#pricing' },
                { label: 'Tentang Kami', href: '#about' },
                { label: 'Pusat Bantuan', href: '#' }
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href} 
                    className="text-slate-500 hover:text-indigo-600 font-medium text-sm transition-all flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-indigo-100 rounded-full group-hover:bg-indigo-600 group-hover:w-3 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-display font-bold text-slate-900 mb-6 tracking-tight">Fitur Utama</h3>
            <ul className="space-y-4">
              {[
                'Dashboard Akademik',
                'Kolaborasi Tim',
                'Analisis Progres',
                'Mode Fokus Pro',
                'Integrasi Kalender'
              ].map((feature, i) => (
                <li key={i} className="text-slate-500 font-medium text-sm flex items-center gap-2 group cursor-default">
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="glass p-6 rounded-[2rem] border-white/60">
            <h3 className="font-display font-bold text-slate-900 mb-6 tracking-tight">Hubungi Kami</h3>
            <div className="space-y-4">
              <a 
                href="mailto:support@assignmate.com" 
                className="flex items-start gap-3 p-3 bg-white/50 rounded-2xl hover:bg-white transition-all group"
              >
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email Support</p>
                  <p className="text-sm font-bold text-slate-700">support@assignmate.com</p>
                </div>
              </a>
              <div className="flex items-start gap-3 p-3 bg-white/50 rounded-2xl transition-all">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Lokasi</p>
                  <p className="text-sm font-bold text-slate-700">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs font-black text-slate-400 uppercase tracking-widest">
            <p>&copy; {currentYear} AssignMate</p>
            <div className="hidden sm:flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Privasi Terjamin</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 italic">
            <span>Built for students productivity</span>
            <div className="flex items-center gap-1 text-slate-300">
              with <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
