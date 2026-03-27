import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { Layout } from './components/Layout';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { InterviewPrep } from './pages/InterviewPrep';
import { CareerRoadmap } from './pages/CareerRoadmap';
import { Profile } from './pages/Profile';
import { Landing } from './pages/Landing';
import { ComingSoon } from './pages/ComingSoon';

// Component to protect routes that require authentication
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Internal component to use hooks inside AuthProvider
const AppRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Only show layout on protected routes
  const isPublicRoute = ['/', '/auth'].includes(location.pathname);

  return (
    <>
      {isPublicRoute ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/roadmap" 
              element={
                <ProtectedRoute>
                  <CareerRoadmap />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/resume" 
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/interview" 
              element={
                <ProtectedRoute>
                  <InterviewPrep />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            {/* Catch all redirect to dashboard if logged in, else landing */}
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <AppRoutes />
        </ProgressProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
