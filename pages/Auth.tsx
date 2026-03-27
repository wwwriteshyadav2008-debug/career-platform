import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const { login, register, error } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!isLogin && password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setFormError(err.message || "An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 perspective-1000 relative">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-slate-500 hover:text-slate-900 flex items-center transition-colors z-20 font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </button>

      <TiltCard className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-scale-in" glow>
        <div className="p-8 relative">
          <div className="text-center mb-8 animate-slide-up transform-z-20">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Career Coach</h1>
            <p className="text-slate-500 mt-2 text-sm">
              {isLogin ? 'Welcome back to your future.' : 'Start your journey today.'}
            </p>
          </div>

          {(error || formError) && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm animate-slide-down transform-z-10">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{error || formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 transform-z-10">
            {!isLogin && (
              <div className="space-y-2 animate-slide-up delay-75">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#6C5CE7] transition-colors" />
                  <input
                    type="text"
                    required={!isLogin}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-sm"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className={`space-y-2 animate-slide-up ${isLogin ? 'delay-75' : 'delay-100'}`}>
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#6C5CE7] transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-sm"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={`space-y-2 animate-slide-up ${isLogin ? 'delay-150' : 'delay-200'}`}>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#6C5CE7] transition-colors" />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-slide-up delay-300">
                <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#6C5CE7] transition-colors" />
                  <input
                    type="password"
                    required={!isLogin}
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-sm"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white font-medium py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed animate-slide-up ${isLogin ? 'delay-200' : 'delay-400'} transform-z-20 mt-6 text-sm`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className={`mt-6 text-center animate-slide-up ${isLogin ? 'delay-300' : 'delay-500'} transform-z-10`}>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormError(null);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setName('');
              }}
              className="text-sm text-[#6C5CE7] hover:text-[#6C5CE7]/80 font-medium hover:underline transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
          
          <div className={`mt-4 p-4 bg-[#6C5CE7]/5 text-[#6C5CE7] text-xs rounded-xl animate-fade-in delay-500 transform-z-10 border border-[#6C5CE7]/10`}>
             <p className="font-bold mb-1">Local Authentication</p>
             <p>{isLogin ? "Enter your email and password to sign in." : "Sign up to create a local profile."}</p>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
