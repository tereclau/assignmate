import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  ChevronRight, 
  QrCode, 
  Loader2,
  Trophy,
  Star,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { cn } from '../lib/utils';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Pro Bulanan',
    price: 'Rp 15.000',
    period: '/bulan',
    description: 'Cocok untuk mencoba fitur premium selama satu semester.',
    features: ['Tugas Tanpa Batas', 'Tim Tanpa Batas', 'Analitik Lanjutan', 'Prioritas AI Support'],
  },
  {
    id: 'yearly',
    name: 'Pro Tahunan',
    price: 'Rp 120.000',
    period: '/tahun',
    description: 'Pilihan terbaik untuk produktivitas jangka panjang.',
    features: ['Semua fitur Bulanan', 'Hemat 30%', 'Akses Eksklusif Fitur Beta', 'Badge Gold Profile'],
    isPopular: true,
  },
  {
    id: 'student',
    name: 'Paket Pelajar',
    price: 'Rp 50.000',
    period: '/tahun',
    description: 'Verifikasi kartu mahasiswa untuk harga spesial.',
    features: ['Semua fitur Bulanan', 'Harga Khusus Mahasiswa', 'Storage Cloud 10GB', 'Sertifikat Produktivitas'],
  }
];

const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', icon: QrCode, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'dana', name: 'Dana', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'ovo', name: 'OVO', icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'gopay', name: 'GoPay', icon: Smartphone, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 'transfer', name: 'Transfer Bank', icon: Building2, color: 'text-slate-600', bg: 'bg-slate-50' },
];

export const PricingPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { updateUser, user, login } = useData();
  const [step, setStep] = useState<'plans' | 'payment' | 'account'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Guest account info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setStep('payment');
  };

  const handlePayment = () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      if (user) {
        // If logged in, finish immediately
        setIsSuccess(true);
        updateUser({ isPremium: true });
        setTimeout(() => onBack(), 3000);
      } else {
        // If guest, go to account creation step
        setStep('account');
      }
    }, 2500);
  };

  const handleCreateAccount = () => {
    if (!email || !password) return;
    setIsProcessing(true);
    
    // Simulasikan pendaftaran/login dengan status premium langsung aktif
    setTimeout(() => {
      login(email, password, 'Mahasiswa Pro', true);
      setIsProcessing(false);
      setIsSuccess(true);
      // Jangan langsung onBack() agar user bisa melihat status sukses
      setTimeout(() => onBack(), 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8"
        >
          <Trophy className="w-12 h-12 text-emerald-600" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold text-slate-900 mb-4"
        >
          Pembayaran Berhasil!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 text-lg max-w-md mx-auto"
        >
          Selamat! Akun kamu sekarang sudah aktif sebagai <span className="font-bold text-indigo-600">PRO</span>. Nikmati semua fitur premium AssignMate.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex items-center gap-2 text-indigo-600 font-bold"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Mengalihkan ke Dashboard...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 transition-all duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12 sm:mb-16">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl glass bg-white/20 border-white/60 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/50 transition-all active:scale-90"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-none mb-2 sm:mb-3">
            Upgrade ke <span className="text-indigo-600">Pro</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg tracking-tight opacity-70">Pilih paket yang paling mendukung ambisi akademikmu.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'plans' ? (
          <motion.div 
            key="plans"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
          >
            {PLANS.map((plan, i) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "glass p-8 sm:p-10 rounded-[3rem] relative flex flex-col group transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-100/50 cursor-default",
                  plan.isPopular ? "border-indigo-500/30 ring-2 ring-indigo-500/10 shadow-2xl shadow-indigo-100/40" : "border-white/60"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl z-10 border border-white/20">
                    Terpopuler
                  </div>
                )}
                
                <div className="mb-10 text-center sm:text-left">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg",
                    plan.id === 'monthly' ? "bg-indigo-50 text-indigo-600" : 
                    plan.id === 'yearly' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                  )}>
                    {plan.id === 'monthly' && <Zap className="w-7 h-7" />}
                    {plan.id === 'yearly' && <Trophy className="w-7 h-7" />}
                    {plan.id === 'student' && <Star className="w-7 h-7" />}
                  </div>
                  <h3 className="text-2xl font-display font-black text-slate-900 mb-2 tracking-tight">{plan.name}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed opacity-80">{plan.description}</p>
                </div>

                <div className="mb-10 text-center sm:text-left">
                  <div className="flex items-baseline justify-center sm:justify-start gap-1">
                    <span className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tighter">{plan.price}</span>
                  </div>
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1 block opacity-60">Pihak {plan.period.replace('/', '')}</span>
                </div>

                <div className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 group/feature">
                      <div className="w-6 h-6 glass bg-indigo-50/50 rounded-full flex items-center justify-center shrink-0 group-hover/feature:bg-indigo-100 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <span className="text-slate-600 text-sm font-bold tracking-tight group-hover/feature:text-slate-900 transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={cn(
                    "w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95",
                    plan.isPopular 
                      ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300" 
                      : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-lg shadow-slate-100"
                  )}
                >
                  Pilih Paket
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : step === 'payment' ? (
          <motion.div 
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto"
          >
            {/* Order Summary contents remain same */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <div className="glass p-8 rounded-[2.5rem]">
                <h3 className="text-xl font-display font-bold text-slate-900 mb-6">Ringkasan Pesanan</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Paket Terpilih</span>
                    <span className="font-bold text-slate-900">{selectedPlan?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Durasi</span>
                    <span className="font-bold text-slate-900">{selectedPlan?.period === '/bulan' ? '1 Bulan' : '1 Tahun'}</span>
                  </div>
                  <div className="h-px bg-slate-100 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total Pembayaran</span>
                    <span className="text-2xl font-display font-bold text-indigo-600">{selectedPlan?.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-sm uppercase tracking-widest">Keuntungan Pro</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-indigo-50">
                      <Zap className="w-4 h-4" /> Tanpa batasan jumlah tugas
                    </li>
                    <li className="flex items-center gap-2 text-sm text-indigo-50">
                      <Zap className="w-4 h-4" /> Kolaborasi tim real-time
                    </li>
                  </ul>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="lg:w-1/2 glass p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-display font-bold text-slate-900 mb-6">Metode Pembayaran</h3>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all group",
                      selectedMethod === method.id 
                        ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200" 
                        : "border-slate-100 bg-white/50 hover:bg-white hover:border-indigo-200"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", method.bg)}>
                        <method.icon className={cn("w-5 h-5", method.color)} />
                      </div>
                      <span className="font-bold text-slate-700">{method.name}</span>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                      selectedMethod === method.id ? "border-indigo-600 bg-indigo-600" : "border-slate-200"
                    )}>
                      {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedMethod || isProcessing}
                onClick={handlePayment}
                className={cn(
                  "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs",
                  !selectedMethod 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                    : "bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700"
                )}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Bayar Sekarang <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
              
              <button 
                onClick={() => setStep('plans')}
                className="w-full mt-4 py-2 text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors uppercase tracking-widest"
              >
                Ganti Paket
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="account"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto glass p-10 rounded-[2.5rem] text-center"
          >
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-200 animate-bounce">
              <Zap className="w-10 h-10 text-white fill-white" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Hampir Selesai!</h3>
            <p className="text-slate-500 font-medium mb-8">Pembayaran kamu sedang diverifikasi. Sekarang, buat akun untuk mengaktifkan fitur PRO kamu.</p>
            
            <div className="space-y-4 mb-8">
              <div className="text-left">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Email</label>
                <input 
                  type="email"
                  placeholder="nama@kampus.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                />
              </div>
              <div className="text-left">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <button
              disabled={!email || !password || isProcessing}
              onClick={handleCreateAccount}
              className={cn(
                "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs shadow-xl shadow-indigo-100",
                !email || !password || isProcessing
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Menciptakan Akun...
                </>
              ) : (
                'Aktifkan Akun Pro'
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
