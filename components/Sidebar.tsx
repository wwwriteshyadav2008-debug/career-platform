import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, MessageSquare, User, X, Compass, FileText, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, isOpen, onClose }) => {
  const { user } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/roadmap', icon: Map, label: 'Career Paths' },
    { to: '/resume', icon: FileText, label: 'Resume Builder' },
    { to: '/interview', icon: MessageSquare, label: 'DA Mock Interview' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-[100dvh] w-64 bg-white border-r border-slate-200 shadow-sm z-50 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Career Coach
              </h1>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose()} // Close sidebar on navigation (mobile)
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-white font-medium shadow-md shadow-primary/20'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-100">
          <NavLink
            to="/profile"
            onClick={() => onClose()}
            className="flex items-center space-x-3 group p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 shadow-sm group-hover:scale-105 transition-transform">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
