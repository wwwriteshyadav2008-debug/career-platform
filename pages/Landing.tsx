import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LottieDisplay } from '../components/LottieDisplay';
import { ArrowRight, Briefcase, FileText, Target, MessageSquare, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<'splash' | 'onboarding'>('splash');
  const [isExiting, setIsExiting] = useState(false);

  const handleGetStarted = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/auth');
    }, 500);
  };

  const features = [
    { icon: Briefcase, title: 'Career Recommendations', desc: 'Data-driven paths tailored for you' },
    { icon: FileText, title: 'Resume Builder', desc: 'Craft ATS-friendly resumes instantly' },
    { icon: Target, title: 'Skill Gap Analysis', desc: 'Identify and bridge your skill gaps' },
    { icon: MessageSquare, title: 'Mock Interview', desc: 'Practice with predefined mock interviews' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FC] relative overflow-hidden p-6"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br from-[#6C5CE7]/20 to-[#8E7CFF]/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-tl from-[#8E7CFF]/20 to-[#6C5CE7]/20 rounded-full blur-[120px]"
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <motion.div 
            key="splash"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center justify-center cursor-pointer z-10"
            onClick={() => setStep('onboarding')}
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-48 h-48 relative group flex items-center justify-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-[#6C5CE7] to-[#8E7CFF] blur-[40px] rounded-full"
              />
              <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center relative z-10 border border-white/50">
                <Sparkles className="w-16 h-16 text-[#6C5CE7]" />
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-6xl font-extrabold text-slate-900 mt-10 tracking-tight"
            >
              Career<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]">AI</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 text-sm font-bold text-[#6C5CE7] tracking-[0.2em] uppercase animate-pulse"
            >
              Tap anywhere to begin
            </motion.p>
          </motion.div>
        )}

        {step === 'onboarding' && (
          <motion.div 
            key="onboarding"
            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10"
          >
            {/* Left Side: Assistant */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left relative"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
                className="w-40 h-40 mb-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/30 to-[#8E7CFF]/30 blur-[30px] rounded-full animate-pulse"></div>
                <LottieDisplay 
                  src="https://assets8.lottiefiles.com/packages/lf20_m9zragkd.json" 
                  className="w-full h-full drop-shadow-2xl relative z-10"
                  loop={true}
                />
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-5xl font-bold text-slate-900 mb-6 leading-tight"
              >
                Meet your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]">Career Coach</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="text-lg text-slate-600 mb-10 leading-relaxed max-w-md"
              >
                Navigate your career journey, build a standout resume, and ace your next interview with personalized guidance.
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 25px -5px rgba(108, 92, 231, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] rounded-2xl shadow-lg shadow-[#6C5CE7]/30 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </motion.button>
            </motion.div>

            {/* Right Side: Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* The "Carried" Card Animation */}
              <motion.div
                initial={{ opacity: 0, x: -200, y: 100, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 50, damping: 12, delay: 1.2 }}
                className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
              >
                <div className="w-full h-full bg-white/50 rounded-3xl blur-3xl"></div>
              </motion.div>

              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15, 
                    delay: 1.5 + index * 0.15 
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.1), 0 15px 15px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group z-10"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + index, ease: "easeInOut" }}
                    className="w-14 h-14 bg-[#6C5CE7]/10 text-[#6C5CE7] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#6C5CE7] group-hover:to-[#8E7CFF] group-hover:text-white transition-all duration-300 shadow-inner"
                  >
                    <feature.icon className="w-7 h-7" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
