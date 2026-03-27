import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Award, Target, Flame, ArrowRight, CheckCircle, Clock, BookOpen, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { motion } from 'motion/react';

const skillProgressData = [
  { month: 'Jan', score: 20 },
  { month: 'Feb', score: 35 },
  { month: 'Mar', score: 45 },
  { month: 'Apr', score: 60 },
  { month: 'May', score: 65 },
  { month: 'Jun', score: 75 },
];

const skillRadarData = [
  { subject: 'Frontend', A: 85, B: 100, fullMark: 100 },
  { subject: 'Backend', A: 65, B: 80, fullMark: 100 },
  { subject: 'DevOps', A: 40, B: 60, fullMark: 100 },
  { subject: 'Design', A: 70, B: 50, fullMark: 100 },
  { subject: 'Communication', A: 90, B: 85, fullMark: 100 },
];

const recommendedPaths = [
  {
    title: 'Senior Full-Stack Developer',
    salary: '$120k - $150k',
    timeframe: '8-12 months',
    match: 92,
    tags: ['React', 'Node.js', 'TypeScript', 'AWS'],
    icon: '💻'
  },
  {
    title: 'Technical Lead',
    salary: '$150k - $180k',
    timeframe: '12-18 months',
    match: 85,
    tags: ['Leadership', 'Architecture', 'Mentoring'],
    icon: '🚀'
  },
  {
    title: 'Product Manager',
    salary: '$130k - $150k',
    timeframe: '10-14 months',
    match: 78,
    tags: ['Product Strategy', 'Stakeholder Management', 'Analytics'],
    icon: '📊'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { progress } = useProgress();

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return BookOpen;
      case 'resume': return FileText;
      default: return CheckCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'quiz': return 'text-purple-500';
      case 'resume': return 'text-blue-500';
      default: return 'text-green-500';
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! <span className="text-2xl">👋</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Here's your career progress overview</p>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Skills Mastered */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#6C5CE7]/10 flex items-center justify-center text-[#6C5CE7]">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Skills Improved</h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{progress.skillsImproved.length}</span>
          </div>
          <p className="text-xs text-emerald-500 font-medium mt-1">Keep practicing!</p>
        </motion.div>

        {/* Total Attempts */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Interview Attempts</h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{progress.totalAttempts}</span>
          </div>
          <p className="text-xs text-emerald-500 font-medium mt-1">Total score: {progress.totalScore}</p>
        </motion.div>

        {/* Last Score */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Last Interview Score</h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-slate-900">{progress.lastScore}</span>
          </div>
          <p className="text-xs text-amber-500 font-medium mt-1">Keep it going!</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Progress Chart */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Skill Progress</h3>
          <p className="text-xs text-slate-500 mb-6">Your learning journey over the past 6 months</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={skillProgressData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[0, 80]} ticks={[0, 20, 40, 60, 80]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6C5CE7" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6C5CE7', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skill Assessment Radar */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Skill Assessment</h3>
          <p className="text-xs text-slate-500 mb-6">Current vs Target skill levels</p>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillRadarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                <Radar
                  name="Current"
                  dataKey="A"
                  stroke="#6C5CE7"
                  strokeWidth={2}
                  fill="#6C5CE7"
                  fillOpacity={0.4}
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
                <Radar
                  name="Target"
                  dataKey="B"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="4 4"
                  animationDuration={2000}
                  animationEasing="ease-out"
                />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Recommended Paths & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Career Paths */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Recommended Career Paths</h3>
              <p className="text-xs text-slate-500 mt-1">Curated paths based on your skills and goals</p>
            </div>
            <button className="text-xs font-medium text-slate-600 hover:text-[#6C5CE7] transition-colors px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">
              View All
            </button>
          </div>

          <div className="space-y-6">
            {recommendedPaths.map((path, idx) => (
              <div key={idx} className="group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl shrink-0 group-hover:bg-[#6C5CE7]/5 transition-colors">
                    {path.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">{path.title}</h4>
                      <span className="text-sm font-bold text-[#6C5CE7]">{path.match}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span>{path.salary}</span>
                      <span>•</span>
                      <span>{path.timeframe}</span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Career Match</span>
                        <span>Match</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${path.match}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                          className="bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] h-1.5 rounded-full" 
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {path.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-1 bg-[#6C5CE7]/5 text-[#6C5CE7] text-[10px] font-medium rounded-md border border-[#6C5CE7]/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="text-xs font-medium text-[#6C5CE7] hover:text-[#6C5CE7]/80 flex items-center gap-1 transition-colors">
                      View Roadmap <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {idx < recommendedPaths.length - 1 && <hr className="my-6 border-slate-100" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all"
        >
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Recent Activity</h3>
          <p className="text-xs text-slate-500 mb-6">Your latest learning milestones</p>

          {progress.activityLog.length === 0 ? (
            <div className="text-sm text-slate-500 text-center py-8">No recent activity. Start a quiz or build your resume!</div>
          ) : (
            <div className="relative border-l border-slate-100 ml-3 space-y-8">
              {progress.activityLog.map((activity, idx) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <motion.div 
                    key={activity.id} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring" }}
                    className="relative pl-6"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-white border border-slate-100 flex items-center justify-center">
                      <Icon className={`w-3 h-3 ${getActivityColor(activity.type)}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">{activity.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{formatTimeAgo(activity.date)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};