export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: string[];
}

export interface InterviewQuestion {
  id: number;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type?: 'mcq' | 'theory' | 'coding';
  options?: string[];
  answer?: string;
  problem?: string;
  sampleInput?: string;
  sampleOutput?: string;
  explanation?: string;
}

export interface InterviewFeedback {
  score: number;
  feedback: string;
  suggestedAnswer: string;
}

export interface InterviewResult {
  questionId: number;
  question: string;
  userAnswer: string;
  feedback: InterviewFeedback;
}

export interface InterviewSession {
  id: string;
  date: string;
  role: string;
  category: string;
  averageScore: number;
  results: InterviewResult[];
}

export interface RoadmapStep {
  year: number;
  title: string;
  description: string;
  milestones: string[];
}

export interface CareerRoadmapData {
  goal: string;
  timeline: number;
  steps: RoadmapStep[];
}