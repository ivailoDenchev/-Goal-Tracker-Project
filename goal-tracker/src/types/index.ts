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