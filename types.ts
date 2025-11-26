export type Role = 'STUDENT' | 'MENTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  password?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface ModuleContent {
  id: string;
  type: 'THEORY' | 'CODE' | 'QUIZ';
  title: string;
  content: string; // Markdown text or Code starter
  questions?: QuizQuestion[]; // Only for QUIZ type
  passingScore?: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  estimatedTime: string; // e.g., "45 mins"
  contents: ModuleContent[];
  tags: string[];
}

export interface Progress {
  moduleId: string;
  userId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  completedContents: string[]; // IDs of completed contents
  quizScore?: number;
}

export interface Review {
  id: string;
  moduleId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
  editedAt?: string;
  mentorReply?: string;
  mentorReplyAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}