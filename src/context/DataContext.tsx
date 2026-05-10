import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Project, User, AppState, Notification } from '../types';
import { formatTime } from '../lib/utils';

interface DataContextType extends AppState {
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  login: (email: string, pass: string, name?: string) => void;
  addNotification: (message: string, type: Notification['type']) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const initialReminders = {
  threeDays: false,
  twoDays: false,
  oneDay: false,
  sixHours: false,
  oneHour: false,
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'assignmate_state';

const INITIAL_STATE: AppState = {
  tasks: [
    {
      id: '1',
      title: 'Tugas Kalkulus - Aljabar Linear',
      description: 'Mengerjakan latihan soal bab 3 nomor 1-20',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      status: 'Pending',
      priority: 'High',
      projectId: '1',
      isGroupTask: false,
      createdAt: new Date().toISOString(),
    }
  ],
  projects: [
    { id: '1', name: 'Matematika Dasar', description: 'Tugas rutin matematika', color: '#4F46E5', createdAt: new Date().toISOString() },
    { id: '2', name: 'Kelompok Web Dev', description: 'Project akhir semester', color: '#06B6D4', createdAt: new Date().toISOString() }
  ],
  user: null,
  activeNotification: null,
  notifications: [],
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return INITIAL_STATE;
      
      const parsed = JSON.parse(stored);
      // Validasi struktur data dasar untuk mencegah error rendering
      return {
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks : INITIAL_STATE.tasks,
        projects: Array.isArray(parsed.projects) ? parsed.projects : INITIAL_STATE.projects,
        user: parsed.user || null,
        activeNotification: null, // Popup selalu mulai dari null
        notifications: Array.isArray(parsed.notifications) ? parsed.notifications : []
      };
    } catch (error) {
      console.error('Gagal memuat data dari localStorage:', error);
      return INITIAL_STATE;
    }
  });

  useEffect(() => {
    try {
      // Hanya simpan state yang perlu persistensi
      const dataToStore = {
        tasks: state.tasks,
        projects: state.projects,
        user: state.user,
        notifications: state.notifications
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage:', error);
    }
  }, [state.tasks, state.projects, state.user, state.notifications]);

  // Handle auto-dismiss for activeNotification
  useEffect(() => {
    if (state.activeNotification) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, activeNotification: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.activeNotification]);

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    try {
      const newNotif: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        message,
        type,
        timestamp: new Date().toISOString(),
      };
      setState(prev => ({
        ...prev,
        activeNotification: newNotif,
        notifications: [newNotif, ...prev.notifications].slice(0, 50)
      }));
    } catch (error) {
      console.error('Gagal menambah notifikasi:', error);
    }
  };

  // Smart Deadline Reminder Logic
  useEffect(() => {
    const checkDeadlines = () => {
      const now = new Date();
      
      setState(prev => {
        let hasChanges = false;
        const updatedTasks = prev.tasks.map(task => {
          if (task.status === 'Completed' || !task.dueDate) return task;
          
          const dueDate = new Date(task.dueDate);
          const diffMs = dueDate.getTime() - now.getTime();
          const diffHours = diffMs / (1000 * 60 * 60);
          const diffDays = diffHours / 24;

          const reminders = { ...(task.reminderSent || initialReminders) };
          let shouldUpdate = false;
          let alertMsg = '';
          const deadlineTime = formatTime(task.dueDate);

          // Logic thresholds
          if (diffDays <= 3 && diffDays > 2 && !reminders.threeDays) {
            reminders.threeDays = true;
            shouldUpdate = true;
            alertMsg = `📌 3 Hari Lagi: Tugas "${task.title}" deadline pukul ${deadlineTime}.`;
          } else if (diffDays <= 2 && diffDays > 1 && !reminders.twoDays) {
            reminders.twoDays = true;
            shouldUpdate = true;
            alertMsg = `⚠️ 2 Hari Lagi: Segera selesaikan "${task.title}" (deadline ${deadlineTime}).`;
          } else if (diffDays <= 1 && diffDays > 0.25 && !reminders.oneDay) {
            reminders.oneDay = true;
            shouldUpdate = true;
            alertMsg = `🔥 Besok!: Deadline "${task.title}" pukul ${deadlineTime}.`;
          } else if (diffHours <= 6 && diffHours > 1 && !reminders.sixHours) {
            reminders.sixHours = true;
            shouldUpdate = true;
            alertMsg = `⏳ 6 Jam Lagi: Tugas "${task.title}" deadline pukul ${deadlineTime}!`;
          } else if (diffHours <= 1 && diffHours > 0 && !reminders.oneHour) {
            reminders.oneHour = true;
            shouldUpdate = true;
            alertMsg = `🚨 Tinggal 1 Jam: "${task.title}" berakhir pukul ${deadlineTime}!`;
          }

          if (shouldUpdate) {
            hasChanges = true;
            // Delay notification to next tick to avoid nested state updates warning
            setTimeout(() => addNotification(alertMsg, 'info'), 0);
            return { ...task, reminderSent: reminders };
          }
          
          return task;
        });

        return hasChanges ? { ...prev, tasks: updatedTasks } : prev;
      });
    };

    const intervalId = setInterval(checkDeadlines, 60000);
    checkDeadlines(); // Initial check

    return () => clearInterval(intervalId);
  }, []);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const createdAt = new Date();
    const dueDate = new Date(taskData.dueDate);
    const diffDays = (dueDate.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    
    // Inisialisasi reminder
    const reminders = { ...initialReminders };
    
    // Jika deadline kurang dari 1 hari sejak pembuatan, skip reminder harian
    if (diffDays < 1) {
      reminders.threeDays = true;
      reminders.twoDays = true;
      reminders.oneDay = true;
    }

    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: createdAt.toISOString(),
      reminderSent: reminders
    };
    setState(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
    addNotification(`Tugas "${newTask.title}" berhasil ditambahkan`, 'success');
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => (t.id === id ? { ...t, ...updates } : t))
    }));
    addNotification('Tugas diperbarui', 'info');
  };

  const deleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));
    addNotification('Tugas dihapus', 'info');
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    addNotification(`Proyek "${newProject.name}" dibuat`, 'success');
  };

  const setUser = (user: User | null) => {
    setState(prev => ({ ...prev, user }));
    if (user) addNotification(`Selamat datang kembali, ${user.name}!`, 'success');
  };

  const updateUser = (updates: Partial<User>) => {
    setState(prev => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: { ...prev.user, ...updates }
      };
    });
    addNotification('Profile berhasil diperbarui', 'success');
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null }));
    addNotification('Anda telah keluar', 'info');
  };

  const login = (email: string, pass: string, name: string = 'User', isPremium: boolean = false) => {
    // Simulasikan pendaftaran/login
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      avatar: '',
      studentId: '2024010100' + Math.floor(Math.random() * 99),
      university: 'Universitas Indonesia',
      bio: 'Mahasiswa Berprestasi',
      isPremium,
    });
  };

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DataContext.Provider value={{ ...state, addTask, updateTask, deleteTask, addProject, setUser, updateUser, logout, login, addNotification, searchQuery, setSearchQuery }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
