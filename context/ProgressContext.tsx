import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Activity {
  id: string;
  type: 'quiz' | 'resume' | 'roadmap';
  title: string;
  date: string;
  score?: number;
}

export interface ProgressState {
  totalAttempts: number;
  totalScore: number;
  lastScore: number;
  skillsImproved: string[];
  weakAreas: string[];
  activityLog: Activity[];
}

interface ProgressContextType {
  progress: ProgressState;
  addQuizResult: (score: number, total: number, strengths: string[], weaknesses: string[]) => void;
  addResumeActivity: (title?: string) => void;
}

const defaultState: ProgressState = {
  totalAttempts: 0,
  totalScore: 0,
  lastScore: 0,
  skillsImproved: ['React', 'JavaScript', 'CSS'],
  weakAreas: ['System Design', 'Algorithms'],
  activityLog: []
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('careerai_progress');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('careerai_progress', JSON.stringify(progress));
  }, [progress]);

  const addQuizResult = (score: number, total: number, strengths: string[], weaknesses: string[]) => {
    setProgress(prev => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: 'quiz',
        title: `Completed Mock Interview (${score}/${total})`,
        date: new Date().toISOString(),
        score
      };

      const newSkills = [...new Set([...prev.skillsImproved, ...strengths])];
      const newWeaknesses = [...new Set([...prev.weakAreas, ...weaknesses])];

      return {
        ...prev,
        totalAttempts: prev.totalAttempts + 1,
        totalScore: prev.totalScore + score,
        lastScore: score,
        skillsImproved: newSkills,
        weakAreas: newWeaknesses,
        activityLog: [newActivity, ...prev.activityLog].slice(0, 10)
      };
    });
  };

  const addResumeActivity = (title: string = 'Updated ATS Resume') => {
    setProgress(prev => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: 'resume',
        title,
        date: new Date().toISOString()
      };
      return {
        ...prev,
        activityLog: [newActivity, ...prev.activityLog].slice(0, 10)
      };
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, addQuizResult, addResumeActivity }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
