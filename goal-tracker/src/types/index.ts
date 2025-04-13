export interface Goal {
  id: string;
  title: string;
  progress: number;
  targets: Target[];
  timeline?: TimelineItem[];
}

export interface Target {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  assignee?: User;
  progress: number; // 0-100
}

export interface TimelineItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  assignee?: User;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface PersonalList {
  id: string;
  title: string;
  color: string;
  tasks: ListTask[];
  isDefault?: boolean;
}

export interface ListTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
} 