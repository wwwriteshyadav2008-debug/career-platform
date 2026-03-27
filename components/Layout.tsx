import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';
import { Chatbot } from './Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Don't render sidebar/header if not logged in (e.g. login page)
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background text-slate-900 font-sans">
      <Sidebar 
        onLogout={logout} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden relative w-full">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-50 p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors md:hidden bg-white shadow-sm border border-slate-200"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      <Chatbot />
    </div>
  );
};