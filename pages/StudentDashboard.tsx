import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Award, BookOpen, Clock, Star, Edit3 } from 'lucide-react';
import { Course, Progress, Review, User } from '../types';

interface StudentDashboardProps {
  user: User;
  course: Course;
  progress: Progress;
  reviews: Review[];
  onStartModule: (moduleId: string) => void;
  onSaveReview: (review: Review) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  user, course, progress, reviews, onStartModule, onSaveReview 
}) => {
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const totalModules = course.modules.length;
  const completedModules = progress.status === 'COMPLETED' ? totalModules : 
    (progress.status === 'IN_PROGRESS' && progress.completedContents.length > 0 ? 0.5 : 0); // Simplified calculation
  
  const completionPercentage = progress.status === 'COMPLETED' ? 100 : 
    Math.round((progress.completedContents.length / course.modules.flatMap(m => m.contents).length) * 100);

  const chartData = [
    { name: 'Completed', value: completionPercentage },
    { name: 'Remaining', value: 100 - completionPercentage },
  ];
  const COLORS = ['#4f46e5', '#e2e8f0'];

  const userReview = reviews.find(r => r.userId === user.id && r.moduleId === course.modules[0].id);

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewText(review.text);
    setRating(review.rating);
  };

  const handleCreateReview = () => {
    // Assuming reviewing the first module for simplicity in this MVP
    const newReview: Review = {
        id: `r-${Date.now()}`,
        moduleId: course.modules[0].id,
        userId: user.id,
        userName: user.name,
        rating: 5,
        text: '',
        createdAt: new Date().toISOString()
    };
    setEditingReview(newReview);
    setReviewText('');
    setRating(5);
  };

  const submitReview = () => {
    if (!editingReview) return;
    onSaveReview({
        ...editingReview,
        text: reviewText,
        rating: rating
    });
    setEditingReview(null);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-500">You are making great progress in <span className="font-semibold text-indigo-600">{course.title}</span>.</p>
        </div>
        <div className="hidden md:block">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <Award size={32} />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-6">Course Progress</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <span className="text-3xl font-bold text-gray-900">{completionPercentage}%</span>
            <p className="text-sm text-gray-400">Completed</p>
          </div>
        </div>

        {/* Modules List */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-6">Your Modules</h3>
          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="group p-4 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-700 transition">{mod.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={14} /> {mod.estimatedTime}</span>
                      <span className="flex gap-1">
                        {mod.tags.map(t => <span key={t} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">{t}</span>)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onStartModule(mod.id)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-indigo-600 hover:text-white hover:border-transparent transition shadow-sm"
                >
                  {progress.status === 'NOT_STARTED' ? 'Start' : 'Continue'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-700">Your Reviews</h3>
            {!userReview && !editingReview && progress.status === 'COMPLETED' && (
                <button onClick={handleCreateReview} className="text-sm text-indigo-600 hover:underline">Write a Review</button>
            )}
        </div>
        
        {editingReview ? (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold mb-4">{editingReview.id.startsWith('r-') && !userReview ? 'Write Review' : 'Edit Review'}</h4>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => setRating(star)} type="button">
                                <Star size={24} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                    <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="What did you think of this course?"
                    />
                </div>
                <div className="flex gap-2">
                    <button onClick={submitReview} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Review</button>
                    <button onClick={() => setEditingReview(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                </div>
            </div>
        ) : userReview ? (
            <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={i < userReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                        ))}
                    </div>
                    <button onClick={() => handleEditReview(userReview)} className="text-gray-400 hover:text-indigo-600">
                        <Edit3 size={16} />
                    </button>
                </div>
                <p className="text-gray-700 mb-3">{userReview.text}</p>
                {userReview.mentorReply && (
                    <div className="ml-4 pl-4 border-l-2 border-indigo-200 mt-2">
                        <p className="text-xs text-indigo-600 font-bold mb-1">Mentor Reply</p>
                        <p className="text-sm text-gray-600 italic">"{userReview.mentorReply}"</p>
                    </div>
                )}
            </div>
        ) : (
            <p className="text-gray-500 italic text-sm">Complete the module to leave a review.</p>
        )}
      </div>
    </div>
  );
};