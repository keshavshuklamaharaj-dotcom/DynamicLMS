import React from 'react';
import { BookOpen, GraduationCap, LayoutDashboard, LogOut, Users, FileBadge, Settings, FileCode } from 'lucide-react';
import { User, Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentPage, onNavigate }) => {
  if (!user) return <>{children}</>;

  const getMenuItems = (role: Role) => {
    if (role === 'MENTOR') {
      return [
        { id: 'dashboard', label: 'Mentor Dashboard', icon: LayoutDashboard },
        { id: 'students', label: 'My Students', icon: Users },
        { id: 'reviews', label: 'Reviews', icon: FileBadge },
      ];
    }
    if (role === 'ADMIN') {
      return [
        { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'content', label: 'Course & Tasks', icon: FileCode },
      ];
    }
    // Student
    return [
      { id: 'dashboard', label: 'My Learning', icon: LayoutDashboard },
      { id: 'modules', label: 'Modules', icon: BookOpen },
      { id: 'certificates', label: 'Certificates', icon: GraduationCap },
    ];
  };

  const menuItems = getMenuItems(user.role);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-indigo-800">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Dynamic LMS</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-indigo-400" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-indigo-300 truncate">{user.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-200 hover:bg-red-900/30 hover:text-red-100 rounded-lg transition-colors text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};