import { Review, Progress, User, Course, ModuleContent } from '../types';
import { INITIAL_REVIEWS, INITIAL_PROGRESS, MOCK_USERS, MOCK_COURSE } from '../constants';

// Simulating a backend with local storage persistence for the session
const STORAGE_KEYS = {
  REVIEWS: 'lms_reviews',
  PROGRESS: 'lms_progress',
  USERS: 'lms_users',
  COURSE: 'lms_course'
};

const getStoredData = <T,>(key: string, defaultData: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultData;
  } catch (e) {
    return defaultData;
  }
};

const setStoredData = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const lmsService = {
  // User Management
  getUsers: (): User[] => {
    return getStoredData(STORAGE_KEYS.USERS, MOCK_USERS);
  },

  addUser: (newUser: User): User[] => {
    const users = getStoredData(STORAGE_KEYS.USERS, MOCK_USERS);
    // Ensure default password is set if not provided
    const userWithPassword = {
      ...newUser,
      password: newUser.password || 'JaiShreeram'
    };
    const updatedUsers = [...users, userWithPassword];
    setStoredData(STORAGE_KEYS.USERS, updatedUsers);
    return updatedUsers;
  },

  authenticate: (email: string, password: string): User | null => {
    const users = getStoredData(STORAGE_KEYS.USERS, MOCK_USERS);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    return user || null;
  },

  // Course Management
  getCourse: (): Course => {
    return getStoredData(STORAGE_KEYS.COURSE, MOCK_COURSE);
  },

  addPracticeTask: (moduleId: string, task: ModuleContent): Course => {
    const course = getStoredData(STORAGE_KEYS.COURSE, MOCK_COURSE);
    const updatedModules = course.modules.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          contents: [...mod.contents, task]
        };
      }
      return mod;
    });
    
    const updatedCourse = { ...course, modules: updatedModules };
    setStoredData(STORAGE_KEYS.COURSE, updatedCourse);
    return updatedCourse;
  },

  // Reviews
  getReviews: (): Review[] => {
    return getStoredData(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  },

  saveReview: (review: Review): Review[] => {
    const reviews = getStoredData(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const existingIndex = reviews.findIndex(r => r.id === review.id);
    
    let newReviews;
    if (existingIndex >= 0) {
      newReviews = [...reviews];
      newReviews[existingIndex] = { ...reviews[existingIndex], ...review, editedAt: new Date().toISOString() };
    } else {
      newReviews = [review, ...reviews];
    }
    
    setStoredData(STORAGE_KEYS.REVIEWS, newReviews);
    return newReviews;
  },

  addMentorReply: (reviewId: string, replyText: string): Review[] => {
    const reviews = getStoredData(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    const newReviews = reviews.map(r => {
      if (r.id === reviewId) {
        return { ...r, mentorReply: replyText, mentorReplyAt: new Date().toISOString() };
      }
      return r;
    });
    setStoredData(STORAGE_KEYS.REVIEWS, newReviews);
    return newReviews;
  },

  // Progress
  getProgress: (): Progress[] => {
    return getStoredData(STORAGE_KEYS.PROGRESS, INITIAL_PROGRESS);
  },

  updateProgress: (progress: Progress): Progress[] => {
    const allProgress = getStoredData(STORAGE_KEYS.PROGRESS, INITIAL_PROGRESS);
    const existingIndex = allProgress.findIndex(p => p.userId === progress.userId && p.moduleId === progress.moduleId);
    
    let newProgressList;
    if (existingIndex >= 0) {
      newProgressList = [...allProgress];
      newProgressList[existingIndex] = progress;
    } else {
      newProgressList = [...allProgress, progress];
    }
    
    setStoredData(STORAGE_KEYS.PROGRESS, newProgressList);
    return newProgressList;
  }
};