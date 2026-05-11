import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Navbar, LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { TasksPage } from './pages/TasksPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AuthPage } from './pages/AuthPage';
import { NewTaskModal } from './components/NewTaskModal';
import { PricingPage } from './pages/PricingPage';
import { ProfileModal } from './components/ProfileModal';
import { Toast } from './components/Toast';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, User, ShieldCheck, CheckSquare } from 'lucide-react';
import { cn } from './lib/utils';

const BackgroundElements: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
    <div className="bg-mesh" />
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 2 }}
      className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-400/15 rounded-full blur-[140px] animate-pulse-slow" 
    />
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2.5 }}
      className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-400/15 rounded-full blur-[120px] animate-pulse-slow" 
      style={{ animationDelay: '3s' }} 
    />
    <div className="absolute top-[15%] right-[5%] w-[40%] h-[40%] bg-cyan-300/10 rounded-full blur-[100px] animate-float" style={{ animationDuration: '15s' }} />
  </div>
);

const AppContent: React.FC = () => {
  const { user, searchQuery, setSearchQuery } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  // Priority 1: Guest/Transition Pricing Flow
  if (showPricing) {
    return (
      <div className="min-h-screen relative">
        <BackgroundElements />
        <Navbar onAuth={() => setShowAuth(true)} onPricing={() => setShowPricing(true)} />
        <div className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <PricingPage onBack={() => setShowPricing(false)} />
        </div>
      </div>
    );
  }

  // Priority 2: Show Auth page if requested
  if (!user && showAuth) {
    return (
      <div className="min-h-screen relative">
        <BackgroundElements />
        <AuthPage />
      </div>
    );
  }

  // Priority 3: Non-authenticated Landing Page
  if (!user) {
    return (
      <div className="min-h-screen relative">
        <BackgroundElements />
        <Navbar onAuth={() => setShowAuth(true)} onPricing={() => setShowPricing(true)} />
        <LandingPage 
          onAction={() => setShowAuth(true)} 
          onUpgrade={() => setShowPricing(true)} 
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative selection:bg-indigo-100 selection:text-indigo-900">
      <BackgroundElements />
      
      <Sidebar 
        activeTab={activeTab === 'pricing' ? 'dashboard' : activeTab} 
        onTabChange={setActiveTab} 
        onProfileClick={() => setIsProfileModalOpen(true)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 pb-24 md:pb-0">
        {/* Top bar */}
        <header className="h-20 bg-white/30 backdrop-blur-2xl border-b border-white/40 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-9 h-9 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <CheckSquare className="text-white w-5 h-5 shadow-sm" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-slate-900">AssignMate</span>
          </div>

          <div className="relative max-w-md w-full hidden md:block text-slate-400 focus-within:text-indigo-500 transition-colors">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari fitur atau tugas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/40 border border-white/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-indigo-100 transition-all font-medium placeholder:text-slate-400 focus:bg-white/80 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {user?.isPremium && (
              <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-linear-to-r from-amber-400/20 to-orange-400/20 border border-amber-200/50 rounded-full">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Premium Member</span>
              </div>
            )}
            <button 
              onClick={() => setActiveTab('notifications')}
              className="p-2 sm:p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div 
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight flex items-center justify-end gap-1.5">
                  {user?.name}
                  {user?.isPremium && <ShieldCheck className="w-3 h-3 text-amber-500" />}
                </p>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  user?.isPremium ? 'text-amber-600' : 'text-indigo-600'
                )}>
                  {user?.isPremium ? 'Pro Plan' : 'Free Plan'}
                </p>
              </div>
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-white shadow-sm ring-1 ring-indigo-50 group-hover:ring-indigo-200 group-hover:scale-105 transition-all object-cover"
                  alt="profile"
                />
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-white shadow-sm ring-1 ring-indigo-50 group-hover:ring-indigo-200 group-hover:scale-105 transition-all bg-slate-200 flex items-center justify-center text-slate-400">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeTab === 'dashboard' && (
                <Dashboard 
                  onAddTask={() => setIsModalOpen(true)} 
                  onUpgrade={() => setActiveTab('pricing')}
                />
              )}
              {activeTab === 'tasks' && <TasksPage onAddTask={() => setIsModalOpen(true)} />}
              {activeTab === 'notifications' && <NotificationsPage />}
              {activeTab === 'pricing' && <PricingPage onBack={() => setActiveTab('dashboard')} />}
              
              {(activeTab === 'calendar' || activeTab === 'group') && (
                <div className="py-20 sm:py-32 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">Fitur "{activeTab === 'calendar' ? 'Kalender' : 'Tugas Kelompok'}"</h2>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto mt-2 px-4">
                    Fitur ini tersedia di versi Pro. Upgrade akun kamu untuk mengakses visualisasi kalender dan kolaborasi tim tak terbatas.
                  </p>
                  <button 
                    onClick={() => setActiveTab('pricing')}
                    className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all font-inter active:scale-95"
                  >
                    Upgrade Sekarang
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <MobileNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddTask={() => setIsModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
      />

      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpgrade={() => {
          setIsProfileModalOpen(false);
          setActiveTab('pricing');
        }}
      />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
