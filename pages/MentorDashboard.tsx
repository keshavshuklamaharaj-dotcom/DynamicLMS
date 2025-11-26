import React, { useState } from 'react';
import { User, Review, Progress } from '../types';
import { Star, MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface MentorDashboardProps {
  students: User[];
  reviews: Review[];
  progressList: Progress[];
  onReplyReview: (reviewId: string, text: string) => void;
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({ students, reviews, progressList, onReplyReview }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const getStudentProgress = (userId: string) => {
    return progressList.find(p => p.userId === userId);
  };

  const handleReplySubmit = (reviewId: string) => {
    onReplyReview(reviewId, replyText);
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
        <div className="bg-white rounded-lg p-1 border border-gray-200 flex gap-1">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${activeTab === 'overview' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                Overview
            </button>
            <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${activeTab === 'reviews' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                Reviews & Feedback
            </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
                        <th className="p-4 font-semibold">Student</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">Completed Tasks</th>
                        <th className="p-4 font-semibold">Quiz Score</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {students.map(student => {
                        const prog = getStudentProgress(student.id);
                        return (
                            <tr key={student.id} className="hover:bg-gray-50/50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={student.avatar} alt="" className="w-8 h-8 rounded-full" />
                                        <div className="font-medium text-gray-900">{student.name}</div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {prog?.status === 'COMPLETED' ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <CheckCircle size={12} /> Completed
                                        </span>
                                    ) : prog?.status === 'IN_PROGRESS' ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <Clock size={12} /> In Progress
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            Not Started
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-gray-600">
                                    {prog?.completedContents.length || 0} items
                                </td>
                                <td className="p-4">
                                    {prog?.quizScore ? (
                                        <span className={`font-mono font-medium ${prog.quizScore >= 60 ? 'text-green-600' : 'text-red-500'}`}>
                                            {prog.quizScore.toFixed(0)}%
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      )}

      {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 gap-6">
              {reviews.map(review => (
                  <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                  {review.userName.charAt(0)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-gray-900">{review.userName}</h4>
                                  <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                          <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                                      ))}
                                      <span className="text-xs text-gray-400 ml-2">{new Date(review.createdAt).toLocaleDateString()}</span>
                                      {review.editedAt && <span className="text-xs text-gray-400 italic">(Edited)</span>}
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          {review.text}
                      </p>

                      {review.mentorReply ? (
                          <div className="ml-8 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                              <div className="flex items-center gap-2 mb-1 text-indigo-800 font-semibold text-sm">
                                  <MessageSquare size={16} /> Mentor Reply
                              </div>
                              <p className="text-gray-700 text-sm">{review.mentorReply}</p>
                          </div>
                      ) : (
                          <div className="ml-8">
                                {replyingTo === review.id ? (
                                    <div className="space-y-3">
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write a reply to the student..."
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                            rows={3}
                                        />
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleReplySubmit(review.id)}
                                                className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                                            >
                                                Send Reply
                                            </button>
                                            <button 
                                                onClick={() => setReplyingTo(null)}
                                                className="px-3 py-1.5 text-gray-500 text-sm hover:bg-gray-100 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setReplyingTo(review.id)}
                                        className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1"
                                    >
                                        <MessageSquare size={16} /> Reply to Review
                                    </button>
                                )}
                          </div>
                      )}
                  </div>
              ))}
              {reviews.length === 0 && (
                  <div className="text-center py-12 text-gray-500">No reviews submitted yet.</div>
              )}
          </div>
      )}
    </div>
  );
};