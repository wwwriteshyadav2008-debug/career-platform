import React, { useState } from 'react';
import { InterviewQuestion } from '../types';
import { Play, CheckCircle2, XCircle, AlertCircle, ChevronRight, BarChart2, MessageSquare } from 'lucide-react';
import { LottieDisplay } from '../components/LottieDisplay';
import { motion, AnimatePresence } from 'motion/react';
import { careerData } from '../data/careerData';
import { useProgress } from '../context/ProgressContext';

export const InterviewPrep: React.FC = () => {
  const { addQuizResult } = useProgress();
  const rolesList = Object.keys(careerData);
  const [selectedRole, setSelectedRole] = useState(rolesList[0] || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // New State for single question flow
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string>('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleFetchQuestions = async () => {
    if (!selectedRole || !selectedDifficulty) return;
    setLoading(true);
    setIsAnalyzing(true);
    setError('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowAnswer(false);
    setIsFinished(false);
    
    setTimeout(() => {
      const roleData = careerData[selectedRole]?.questions?.[selectedDifficulty];
      
      if (roleData) {
        const allQuestions: InterviewQuestion[] = [
          ...(roleData.mcq || []).map((q: any) => ({ ...q, type: 'mcq', difficulty: selectedDifficulty })),
          ...(roleData.theory || []).map((q: any) => ({ ...q, type: 'theory', difficulty: selectedDifficulty })),
          ...(roleData.coding || []).map((q: any) => ({ ...q, type: 'coding', difficulty: selectedDifficulty }))
        ];
        // Shuffle or slice if needed, here we just take them all
        setQuestions(allQuestions);
      } else {
        setError('No data available for selected options');
      }
      
      setLoading(false);
      setTimeout(() => setIsAnalyzing(false), 1000);
    }, 1000);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === '') return;
    
    const currentQ = questions[currentQuestionIndex];
    if (currentQ.type === 'mcq') {
      if (currentQ.options && currentQ.options[selectedAnswer as number] === currentQ.answer) {
        setScore(prev => prev + 1);
      }
    } else {
      // For theory/coding, we just mark it as answered and maybe give a point for participation
      setScore(prev => prev + 1);
    }
    
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowAnswer(false);
    } else {
      // Finish quiz
      setIsFinished(true);
      const finalScore = Math.round((score / questions.length) * 100) || 0;
      addQuizResult(finalScore, 100, [selectedRole], []);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto pb-12"
    >
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="text-2xl font-bold text-slate-900 mb-6"
      >
        Interview Preparation
      </motion.h1>

      {!questions.length && !isFinished && (
        <>
          <div className={`w-full max-w-[280px] mx-auto mb-10 relative z-10 transition-all duration-1000 ${isAnalyzing ? 'translate-y-[-50px] scale-110' : 'animate-float'}`}>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 blur-[50px] rounded-full -z-10 transition-all duration-1000 ${isAnalyzing ? 'bg-[#6C5CE7]/40 scale-150' : ''}`}></div>
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/5 blur-lg rounded-[100%] -z-10 transition-all duration-1000 ${isAnalyzing ? 'scale-50 opacity-50' : ''}`}></div>
            
            <LottieDisplay
              src="https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json"
              className="w-full h-auto drop-shadow-xl"
              style={{ width: '100%', height: 'auto' }}
              speed={isAnalyzing ? 2 : 1}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Select Role</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <select
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm appearance-none"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    {rolesList.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Difficulty</label>
                <select 
                  className="w-full p-2.5 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(108, 92, 231, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFetchQuestions}
                disabled={loading || !selectedRole}
                className="bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] text-white py-2.5 px-6 rounded-xl font-medium disabled:opacity-50 transition-all duration-300 flex items-center justify-center shadow-md shadow-[#6C5CE7]/20 text-sm"
              >
                {loading ? 'Loading...' : 'Start Interview'}
                {!loading && <Play className="w-4 h-4 ml-2 fill-current" />}
              </motion.button>
            </div>
            {error && (
              <div className="mt-4 text-sm text-red-500 text-center">
                {error}
              </div>
            )}
          </motion.div>
        </>
      )}

      <AnimatePresence mode="wait">
        {questions.length > 0 && !isFinished && (
          <motion.div 
            key="question-container"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-slate-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {questions[currentQuestionIndex].type.toUpperCase()}
              </span>
            </div>

            <motion.div 
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {questions[currentQuestionIndex].question}
              </h3>

              {questions[currentQuestionIndex].type === 'mcq' && questions[currentQuestionIndex].options && (
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((opt, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = opt === questions[currentQuestionIndex].answer;
                    
                    let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ";
                    
                    if (!showAnswer) {
                      btnClass += isSelected 
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                        : "border-slate-200 hover:border-primary/50 hover:bg-slate-50";
                    } else {
                      if (isCorrect) {
                        btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                      } else if (isSelected && !isCorrect) {
                        btnClass += "border-red-500 bg-red-50 text-red-900";
                      } else {
                        btnClass += "border-slate-200 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={showAnswer}
                        onClick={() => setSelectedAnswer(i)}
                        className={btnClass}
                      >
                        <span className="font-medium">{opt}</span>
                        {showAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {showAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {questions[currentQuestionIndex].type !== 'mcq' && (
                <div className="space-y-4">
                  <textarea
                    disabled={showAnswer}
                    value={selectedAnswer as string}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  />
                  {showAnswer && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Suggested Answer
                      </h4>
                      <p className="text-emerald-800 whitespace-pre-wrap">
                        {questions[currentQuestionIndex].answer}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                {!showAnswer ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === ''}
                    className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center"
                  >
                    Next Question
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
              <BarChart2 className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Interview Completed!</h3>
            <p className="text-slate-600 mb-8 text-lg">
              You scored <span className="font-bold text-emerald-600 text-2xl">{Math.round((score / questions.length) * 100)}%</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
                  Strengths
                </h4>
                <p className="text-emerald-800 text-sm">
                  Great job! You showed strong understanding in the core concepts of {selectedRole}.
                </p>
              </div>
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
                  Areas to Improve
                </h4>
                <p className="text-amber-800 text-sm">
                  Review some of the advanced topics and practice more coding questions to improve your speed.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setQuestions([]);
                setIsFinished(false);
                setCurrentQuestionIndex(0);
                setScore(0);
              }}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              Practice Another Role
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
