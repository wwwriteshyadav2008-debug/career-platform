import React, { useState } from 'react';
import { MessageSquare, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LottieDisplay } from './LottieDisplay';

const faqData = [
  {
    question: "How do I start frontend development?",
    answer: "Start with HTML, CSS, and JavaScript. Then move to React and build projects."
  },
  {
    question: "How can I prepare for interviews?",
    answer: "Practice MCQs, theory questions, and coding regularly using the mock interview section."
  },
  {
    question: "What skills are required for backend?",
    answer: "You need Node.js, databases, APIs, authentication, and system design basics."
  },
  {
    question: "How do I improve my resume?",
    answer: "Use the resume builder, add strong projects, and keep it ATS-friendly."
  },
  {
    question: "What is the best way to follow a roadmap?",
    answer: "Follow step-by-step, complete projects, and revise concepts regularly."
  }
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="absolute bottom-24 right-0 w-80 sm:w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] p-5 flex justify-between items-start text-white shadow-md relative z-10">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-bold text-lg tracking-tight">Career Assistant</span>
                </div>
                <span className="text-white/80 text-sm font-medium">Ask anything about careers</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FAQ Content Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 space-y-3 custom-scrollbar">
              {faqData.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <div key={index} className="flex flex-col space-y-2">
                    {/* Question Button / User Bubble */}
                    <motion.button 
                      onClick={() => toggleQuestion(index)}
                      className={`text-left p-3.5 rounded-2xl transition-all shadow-sm text-sm font-medium flex justify-between items-center w-full ${
                        isExpanded 
                          ? 'bg-[#6C5CE7] text-white border border-[#6C5CE7] rounded-tr-sm ml-auto max-w-[90%]' 
                          : 'bg-white border border-slate-200/60 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                      layout
                    >
                      <span className="leading-relaxed pr-2">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white/80' : 'text-slate-400'}`} />
                    </motion.button>

                    {/* Answer / Bot Bubble */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white border border-slate-200/60 text-slate-700 p-4 rounded-2xl rounded-tl-sm text-sm max-w-[90%] shadow-sm leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-24 h-24 flex items-center justify-center drop-shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="w-14 h-14 bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] rounded-full shadow-lg flex items-center justify-center text-white"
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="robot"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <LottieDisplay 
                src="https://assets3.lottiefiles.com/packages/lf20_tijmpky4.json" 
                className="w-full h-full drop-shadow-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-2 right-4 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
};
