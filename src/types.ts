export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId?: string;
  isGroupTask: boolean;
  assignedTo?: string[];
  createdAt: string;
  reminderSent?: {
    threeDays?: boolean;
    twoDays?: boolean;
    oneDay?: boolean;
    sixHours?: boolean;
    oneHour?: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  isPremium: boolean;
}

export interface AppState {
  tasks: Task[];
  projects: Project[];
  user: User | null;
  activeNotification: Notification | null;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: string;
}
