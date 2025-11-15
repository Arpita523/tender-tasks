
export enum ColumnId {
  ToDo = 'To-Do List',
  InProgress = 'In Progress',
  NotStarted = 'Not Started',
  Completed = 'Completed'
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Assignee {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  author: Assignee;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: ColumnId;
  priority: Priority;
  dueDate: string;
  assignee: Assignee;
  commentsCount: number;
  attachmentsCount: number;
  comments: Comment[];
}

export interface ColumnType {
  id: ColumnId;
  title: string;
  color: string;
}
