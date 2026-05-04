import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Sidebar } from './components/Sidebar';
import { Navbar, LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { TasksPage } from './pages/TasksPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AuthPage } from './pages/AuthPage';
import { NewTaskModal } from './components/NewTaskModal';
import { ProfileModal } from './components/ProfileModal';
import { Toast } from './components/Toast';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, User } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, searchQuery, setSearchQuery } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // If user is not logged in and not looking at auth, show landing
  if (!user && !showAuth) {
    return (
      <div className="min-h-screen">
        <Navbar onAuth={() => setShowAuth(true)} />
        <LandingPage onAction={() => setShowAuth(true)} />
      </div>
    );
  }

  // Show Auth page if requested
  if (!user && showAuth) {
    return <AuthPage />;
  }

  return (
    <div className="flex min-h-screen bg-transparent">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onProfileClick={() => setIsProfileModalOpen(true)} 
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar for Dashboard */}
        <header className="h-20 bg-white/20 backdrop-blur-xl border-b border-white/40 sticky top-0 z-20 px-8 flex items-center justify-between">
          <div className="relative max-w-md w-full hidden md:block text-slate-400 focus-within:text-indigo-500 transition-colors">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Cari fitur atau tugas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/40 border border-white/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-indigo-100 transition-all font-medium placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('notifications')}
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div 
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{user?.name}</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{user?.isPremium ? 'Pro Plan' : 'Free Plan'}</p>
              </div>
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  className="w-10 h-10 rounded-xl border-2 border-white shadow-sm ring-1 ring-indigo-50 group-hover:ring-indigo-200 group-hover:scale-105 transition-all"
                  alt="profile"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl border-2 border-white shadow-sm ring-1 ring-indigo-50 group-hover:ring-indigo-200 group-hover:scale-105 transition-all bg-slate-200 flex items-center justify-center text-slate-400">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeTab === 'dashboard' && <Dashboard onAddTask={() => setIsModalOpen(true)} />}
              {activeTab === 'tasks' && <TasksPage onAddTask={() => setIsModalOpen(true)} />}
              {activeTab === 'notifications' && <NotificationsPage />}
              
              {/* Placeholder for other tabs */}
              {(activeTab === 'calendar' || activeTab === 'group') && (
                <div className="py-32 text-center">
                  <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <User className="w-12 h-12 text-indigo-400" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">Fitur "{activeTab === 'calendar' ? 'Kalender' : 'Tugas Kelompok'}"</h2>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto mt-2">
                    Fitur ini tersedia di versi Pro. Upgrade akun kamu untuk mengakses visualisasi kalender dan kolaborasi tim tak terbatas.
                  </p>
                  <button className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all">
                    Upgrade Sekarang
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
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
