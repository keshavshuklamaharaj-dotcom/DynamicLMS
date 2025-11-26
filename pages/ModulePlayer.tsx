import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronRight, AlertCircle, Award } from 'lucide-react';
import { Module, ModuleContent, Progress } from '../types';
import { CodeEditor } from '../components/CodeEditor';

interface ModulePlayerProps {
  module: Module;
  progress: Progress;
  onUpdateProgress: (moduleId: string, contentId: string, score?: number) => void;
  onCompleteModule: (moduleId: string) => void;
}

export const ModulePlayer: React.FC<ModulePlayerProps> = ({ module, progress, onUpdateProgress, onCompleteModule }) => {
  const [activeContentId, setActiveContentId] = useState<string>(module.contents[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const activeContent = module.contents.find(c => c.id === activeContentId);

  const isCompleted = (contentId: string) => progress.completedContents.includes(contentId);

  const handleNext = () => {
    const currentIndex = module.contents.findIndex(c => c.id === activeContentId);
    if (currentIndex < module.contents.length - 1) {
      setActiveContentId(module.contents[currentIndex + 1].id);
    }
  };

  const handleMarkTheoryComplete = () => {
    if (activeContent && !isCompleted(activeContent.id)) {
      onUpdateProgress(module.id, activeContent.id);
    }
    handleNext();
  };

  const handleSubmitQuiz = () => {
    if (!activeContent?.questions) return;

    let correctCount = 0;
    activeContent.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctOptionIndex) correctCount++;
    });

    const score = (correctCount / activeContent.questions.length) * 100;
    const passed = score >= (activeContent.passingScore || 60);

    setQuizSubmitted(true);

    if (passed) {
      onUpdateProgress(module.id, activeContent.id, score);
      // Check if all contents are done to complete module
      const allIds = module.contents.map(c => c.id);
      const allDone = allIds.every(id => id === activeContent.id || progress.completedContents.includes(id));
      if (allDone) {
        onCompleteModule(module.id);
      }
    }
  };

  // Helper to detect URLs and wrap them in anchor tags
  const renderContentWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (!activeContent) return <div>Loading content...</div>;

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Content Navigation */}
      <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col h-full overflow-y-auto">
        <h3 className="font-semibold text-gray-800 mb-4 px-2">{module.title}</h3>
        <div className="space-y-1">
          {module.contents.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveContentId(c.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors text-left ${
                activeContentId === c.id
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {isCompleted(c.id) ? (
                <CheckCircle size={16} className="text-green-500 shrink-0" />
              ) : (
                <Circle size={16} className="text-gray-300 shrink-0" />
              )}
              <span className="truncate">
                {idx + 1}. {c.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1 block">
              {activeContent.type}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">{activeContent.title}</h2>
          </div>
          {progress.status === 'COMPLETED' && (
             <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
               <Award size={14} /> Completed
             </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {activeContent.type === 'THEORY' && (
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {renderContentWithLinks(activeContent.content)}
              </p>
            </div>
          )}

          {activeContent.type === 'CODE' && (
            <div className="h-full flex flex-col">
              <p className="text-gray-600 mb-4">Read the instructions and implement the solution:</p>
              <div className="flex-1">
                <CodeEditor initialCode={activeContent.content} />
              </div>
            </div>
          )}

          {activeContent.type === 'QUIZ' && activeContent.questions && (
            <div className="max-w-2xl mx-auto space-y-8">
               {quizSubmitted && (
                 <div className={`p-4 rounded-lg mb-6 ${
                    isCompleted(activeContent.id) ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                 }`}>
                   <p className="font-bold flex items-center gap-2">
                     {isCompleted(activeContent.id) ? (
                        <>
                          <CheckCircle size={20} /> Passed! Your progress has been recorded.
                        </>
                     ) : (
                        <>
                          <AlertCircle size={20} /> Failed. Please try again to proceed.
                        </>
                     )}
                   </p>
                 </div>
               )}

               {activeContent.questions.map((q, idx) => (
                 <div key={q.id} className="p-6 border border-gray-200 rounded-lg">
                   <p className="font-semibold text-gray-900 mb-4">{idx + 1}. {q.text}</p>
                   <div className="space-y-3">
                     {q.options.map((opt, optIdx) => (
                       <label key={optIdx} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${
                         quizAnswers[q.id] === optIdx 
                            ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' 
                            : 'border-gray-200 hover:border-gray-300'
                       }`}>
                         <input
                           type="radio"
                           name={`question-${q.id}`}
                           disabled={quizSubmitted && isCompleted(activeContent.id)}
                           checked={quizAnswers[q.id] === optIdx}
                           onChange={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                           className="text-indigo-600 focus:ring-indigo-500"
                         />
                         <span className="text-gray-700">{opt}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          {activeContent.type === 'THEORY' || activeContent.type === 'CODE' ? (
            <button
              onClick={handleMarkTheoryComplete}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Complete & Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={quizSubmitted && isCompleted(activeContent.id)}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};