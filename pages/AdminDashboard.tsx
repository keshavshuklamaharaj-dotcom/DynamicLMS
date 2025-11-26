import React, { useState } from 'react';
import { User, Course, ModuleContent } from '../types';
import { UserPlus, Save, Trash2, Code, FileText, CheckCircle, Lock } from 'lucide-react';

interface AdminDashboardProps {
  users: User[];
  course: Course;
  activeTab: 'users' | 'content';
  onAddUser: (user: User) => void;
  onAddPracticeTask: (moduleId: string, task: ModuleContent) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  users, course, activeTab, onAddUser, onAddPracticeTask 
}) => {
  // User Form State
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'STUDENT' as const });
  const [userFormSuccess, setUserFormSuccess] = useState(false);

  // Task Creator Form State
  const [taskData, setTaskData] = useState({
    moduleId: course.modules[0]?.id || '',
    title: '',
    instructions: '',
    starterCode: '# Write your code here\n'
  });
  const [taskFormSuccess, setTaskFormSuccess] = useState(false);

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const user: User = {
      id: `u-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`,
      password: 'JaiShreeram'
    };

    onAddUser(user);
    setNewUser({ name: '', email: '', role: 'STUDENT' });
    setUserFormSuccess(true);
    setTimeout(() => setUserFormSuccess(false), 3000);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskData.title || !taskData.starterCode) return;

    const newTask: ModuleContent = {
      id: `task-${Date.now()}`,
      type: 'CODE',
      title: taskData.title,
      content: `${taskData.instructions}\n\n${taskData.starterCode}` 
    };

    const finalContent = `"""\n${taskData.instructions}\n"""\n\n${taskData.starterCode}`;
    
    onAddPracticeTask(taskData.moduleId, {
        ...newTask,
        content: finalContent
    });

    setTaskData({ ...taskData, title: '', instructions: '', starterCode: '# Write your code here\n' });
    setTaskFormSuccess(true);
    setTimeout(() => setTaskFormSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add User Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <UserPlus size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Add New User</h3>
              </div>
              
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <div className="relative">
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 appearance-none cursor-pointer"
                    >
                        <option value="STUDENT">Student</option>
                        <option value="MENTOR">Mentor</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-start gap-2">
                    <Lock size={14} className="text-gray-500 mt-0.5" />
                    <p className="text-xs text-gray-600">
                        Default password for new users is set to <span className="font-mono font-bold">JaiShreeram</span>
                    </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition shadow-sm flex justify-center items-center gap-2"
                >
                  <UserPlus size={18} /> Register User
                </button>

                {userFormSuccess && (
                    <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2 animate-pulse-once">
                        <CheckCircle size={16} /> User added successfully!
                    </div>
                )}
              </form>
            </div>
          </div>

          {/* User List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Existing Users</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={u.avatar} className="w-8 h-8 rounded-full bg-gray-200" alt="" />
                                        <span className="font-medium text-gray-900">{u.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                        u.role === 'MENTOR' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{u.email}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-red-500 transition">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Practice Task Creator */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                    <Code size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Create Practice Task</h3>
                    <p className="text-xs text-gray-500">Add a coding challenge to a module</p>
                </div>
              </div>

              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Module</label>
                  <select
                    value={taskData.moduleId}
                    onChange={(e) => setTaskData({...taskData, moduleId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  >
                    {course.modules.map(m => (
                        <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    value={taskData.title}
                    onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. Pandas Data Cleaning Challenge"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (Markdown supported)</label>
                  <textarea
                    rows={4}
                    value={taskData.instructions}
                    onChange={(e) => setTaskData({...taskData, instructions: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
                    placeholder="Describe the problem statement..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Starter Code (Python)</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <textarea
                        rows={8}
                        value={taskData.starterCode}
                        onChange={(e) => setTaskData({...taskData, starterCode: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 text-gray-100 font-mono text-sm focus:outline-none"
                        spellCheck={false}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition shadow-sm flex justify-center items-center gap-2"
                >
                  <Save size={18} /> Save Practice Task
                </button>

                {taskFormSuccess && (
                    <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2">
                        <CheckCircle size={16} /> Task added to module!
                    </div>
                )}
              </form>
           </div>

           {/* Course Overview Preview */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
               <h3 className="font-bold text-gray-800 mb-4">Current Course Structure</h3>
               <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                   {course.modules.map((mod, idx) => (
                       <div key={mod.id} className="border border-gray-100 rounded-lg p-3">
                           <div className="flex justify-between items-center mb-2">
                               <h4 className="font-semibold text-sm text-gray-900">{idx + 1}. {mod.title}</h4>
                               <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{mod.contents.length} items</span>
                           </div>
                           <div className="space-y-1 ml-2">
                               {mod.contents.map(c => (
                                   <div key={c.id} className="flex items-center gap-2 text-xs text-gray-600">
                                       {c.type === 'THEORY' && <FileText size={12} className="text-blue-400" />}
                                       {c.type === 'CODE' && <Code size={12} className="text-emerald-500" />}
                                       <span>{c.title}</span>
                                   </div>
                               ))}
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        </div>
      )}
    </div>
  );
};