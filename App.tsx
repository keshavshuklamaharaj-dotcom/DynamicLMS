import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { StudentDashboard } from './pages/StudentDashboard';
import { ModulePlayer } from './pages/ModulePlayer';
import { MentorDashboard } from './pages/MentorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MOCK_USERS } from './constants';
import { User, Review, Progress, Course, ModuleContent } from './types';
import { lmsService } from './services/lmsService';
import { LogIn } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // App State (simulated DB)
  const [reviews, setReviews] = useState<Review[]>([]);
  const [progressList, setProgressList] = useState<Progress[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Load initial data
    setReviews(lmsService.getReviews());
    setProgressList(lmsService.getProgress());
    setUsers(lmsService.getUsers());
    setCourse(lmsService.getCourse());
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const user = lmsService.authenticate(email, password);
    if (user) {
      setCurrentUser(user);
      setActivePage('dashboard');
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage('login');
    setActiveModuleId(null);
  };

  const handleUpdateProgress = (moduleId: string, contentId: string, score?: number) => {
    if (!currentUser) return;

    const currentProgress = progressList.find(p => p.userId === currentUser.id && p.moduleId === moduleId) || {
      userId: currentUser.id,
      moduleId,
      status: 'IN_PROGRESS',
      completedContents: []
    };

    const updatedProgress: Progress = {
      ...currentProgress,
      completedContents: [...new Set([...currentProgress.completedContents, contentId])], // Unique add
      quizScore: score !== undefined ? score : currentProgress.quizScore,
      status: 'IN_PROGRESS' // Will be updated to COMPLETED by specific handler
    };

    const newList = lmsService.updateProgress(updatedProgress);
    setProgressList(newList);
  };

  const handleCompleteModule = (moduleId: string) => {
    if (!currentUser) return;
    
    const currentProgress = progressList.find(p => p.userId === currentUser.id && p.moduleId === moduleId);
    if (currentProgress) {
      const updated = { ...currentProgress, status: 'COMPLETED' as const };
      const newList = lmsService.updateProgress(updated);
      setProgressList(newList);
    }
  };

  const handleSaveReview = (review: Review) => {
    const newList = lmsService.saveReview(review);
    setReviews(newList);
  };

  const handleMentorReply = (reviewId: string, text: string) => {
    const newList = lmsService.addMentorReply(reviewId, text);
    setReviews(newList);
  };

  // Admin Actions
  const handleAddUser = (user: User) => {
    const updatedUsers = lmsService.addUser(user);
    setUsers(updatedUsers);
  };

  const handleAddPracticeTask = (moduleId: string, task: ModuleContent) => {
    const updatedCourse = lmsService.addPracticeTask(moduleId, task);
    setCourse(updatedCourse);
  };

  // Render Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Dynamic LMS</h1>
            <p className="text-gray-500 mt-2">Sign in to continue your learning journey</p>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Enter your password"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
                {loginError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition shadow-lg flex justify-center items-center gap-2"
            >
              <LogIn size={20} /> Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500 font-bold mb-3 uppercase tracking-wide">Demo Credentials</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button onClick={() => {setEmail('alex@lms.com'); setPassword('JaiShreeram')}} className="p-2 bg-gray-50 hover:bg-gray-100 rounded text-gray-600 transition">
                Student
              </button>
              <button onClick={() => {setEmail('sarah@lms.com'); setPassword('JaiShreeram')}} className="p-2 bg-gray-50 hover:bg-gray-100 rounded text-gray-600 transition">
                Mentor
              </button>
              <button onClick={() => {setEmail('admin@lms.com'); setPassword('JaiShreeram')}} className="p-2 bg-gray-50 hover:bg-gray-100 rounded text-gray-600 transition">
                Admin
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Password: JaiShreeram</p>
          </div>
        </div>
      </div>
    );
  }

  // Ensure course is loaded
  if (!course) return <div>Loading...</div>;

  return (
    <Layout 
      user={currentUser} 
      onLogout={handleLogout} 
      currentPage={activePage} 
      onNavigate={(page) => {
        setActivePage(page);
        setActiveModuleId(null);
      }}
    >
      {/* Student Role Routes */}
      {currentUser.role === 'STUDENT' && (
        <>
          {activePage === 'dashboard' && (
            <StudentDashboard 
              user={currentUser}
              course={course}
              progress={progressList.find(p => p.userId === currentUser.id) || { moduleId: course.modules[0].id, userId: currentUser.id, status: 'NOT_STARTED', completedContents: [] }}
              reviews={reviews}
              onStartModule={(id) => {
                setActiveModuleId(id);
                setActivePage('modules');
              }}
              onSaveReview={handleSaveReview}
            />
          )}
          {activePage === 'modules' && (
             activeModuleId ? (
                <ModulePlayer 
                  module={course.modules.find(m => m.id === activeModuleId)!}
                  progress={progressList.find(p => p.userId === currentUser.id && p.moduleId === activeModuleId) || { moduleId: activeModuleId, userId: currentUser.id, status: 'NOT_STARTED', completedContents: [] }}
                  onUpdateProgress={handleUpdateProgress}
                  onCompleteModule={handleCompleteModule}
                />
             ) : (
                <div className="text-center py-12">
                   <h2 className="text-xl font-bold">Select a module from the dashboard to start.</h2>
                   <button onClick={() => setActivePage('dashboard')} className="mt-4 text-indigo-600 underline">Back to Dashboard</button>
                </div>
             )
          )}
          {activePage === 'certificates' && (
            <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
               <h2 className="text-2xl font-bold mb-4">Your Certificates</h2>
               {progressList.some(p => p.userId === currentUser.id && p.status === 'COMPLETED') ? (
                 <div className="w-full max-w-md mx-auto p-8 border-4 border-double border-indigo-200 bg-indigo-50/30 rounded-lg">
                    <div className="text-4xl text-indigo-600 mb-4 flex justify-center"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>
                    <h3 className="text-2xl font-serif text-gray-900 mb-2">Certificate of Completion</h3>
                    <p className="text-gray-600 mb-4">Presented to <b>{currentUser.name}</b></p>
                    <p className="text-sm text-gray-500">For successfully completing the</p>
                    <p className="font-bold text-lg text-indigo-800 mb-2">{course.title}</p>
                    <div className="border-t border-indigo-200 mt-4 pt-2">
                        <p className="text-xs uppercase tracking-widest text-indigo-500 font-bold">Certified AI Engineer</p>
                    </div>
                 </div>
               ) : (
                 <p className="text-gray-500">Complete all modules in the course to earn your "Certified AI Engineer" title.</p>
               )}
            </div>
          )}
        </>
      )}

      {/* Mentor Role Routes */}
      {currentUser.role === 'MENTOR' && (
        <>
          {(activePage === 'dashboard' || activePage === 'students' || activePage === 'reviews') && (
            <MentorDashboard 
               students={users.filter(u => u.role === 'STUDENT')}
               reviews={reviews}
               progressList={progressList}
               onReplyReview={handleMentorReply}
            />
          )}
        </>
      )}

      {/* Admin Role Routes */}
      {currentUser.role === 'ADMIN' && (
        <>
          <AdminDashboard 
            users={users}
            course={course}
            activeTab={activePage === 'users' ? 'users' : activePage === 'content' ? 'content' : 'users'}
            onAddUser={handleAddUser}
            onAddPracticeTask={handleAddPracticeTask}
          />
        </>
      )}
    </Layout>
  );
}