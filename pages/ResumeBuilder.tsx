import React, { useState, useEffect } from 'react';
import { ResumeData, ExperienceItem, EducationItem, ProjectItem } from '../types';
import { Plus, Trash2, Eye, ChevronDown, ChevronUp, Printer, Save, Loader2, CheckCircle2, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_RESUME: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  website: '',
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
};

interface AccordionSectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ 
  title, 
  id, 
  children, 
  activeSection, 
  setActiveSection 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 15 }}
    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm mb-4 transition-all duration-300 hover:shadow-md"
  >
    <button 
      onClick={() => setActiveSection(activeSection === id ? '' : id)}
      className="w-full px-6 py-4 text-left font-semibold text-slate-800 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors"
    >
      {title}
      <motion.div
        animate={{ rotate: activeSection === id ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-5 h-5 text-slate-400" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {activeSection === id && (
        <motion.div 
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-6 border-t border-slate-100">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// Moved InputWithError outside component to prevent re-creation on render (fixes focus loss)
const InputWithError = ({ 
  value, 
  onChange, 
  placeholder, 
  errorKey,
  errors,
  className = "",
  type = "text"
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  placeholder: string, 
  errorKey: string, 
  errors: Record<string, string>,
  className?: string, 
  type?: string 
}) => (
  <div className="w-full">
    <input 
      type={type}
      placeholder={placeholder} 
      className={`w-full p-2.5 border rounded-xl focus:ring-2 outline-none transition-all text-sm ${errors[errorKey] ? 'border-red-300 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white'} ${className}`} 
      value={value} 
      onChange={onChange} 
    />
    <AnimatePresence>
      {errors[errorKey] && (
        <motion.p 
          key="error"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-xs text-red-500 mt-1.5"
        >
          {errors[errorKey]}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export const ResumeBuilder: React.FC = () => {
  const { user } = useAuth();
  const { addResumeActivity } = useProgress();
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'error'>('saved');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [initialLoad, setInitialLoad] = useState(true);

  // Load resume from local storage
  useEffect(() => {
    const loadResume = () => {
      if (user?.id) {
        const saved = localStorage.getItem(`resume_${user.id}`);
        if (saved) {
          try {
            setResume(JSON.parse(saved));
          } catch (e) {
            console.error('Failed to parse saved resume', e);
          }
        }
      }
      setInitialLoad(false);
    };
    loadResume();
  }, [user?.id]);

  // Track unsaved changes
  const handleDataChange = () => {
    if (!initialLoad && saveStatus === 'saved') {
      setSaveStatus('unsaved');
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    setSaveStatus('saved'); // Optimistic
    try {
      localStorage.setItem(`resume_${user.id}`, JSON.stringify(resume));
      addResumeActivity('Saved Resume Draft');
      // Success feedback could go here
    } catch (e) {
      console.error(e);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  // --- Validation Helpers ---

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);

  const validate = (key: string, value: string, type: 'required' | 'email' | 'phone' = 'required') => {
    let error = '';
    if (type === 'required' && !value.trim()) {
      error = 'This field is required';
    } else if (type === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!validateEmail(value)) error = 'Invalid email address';
    } else if (type === 'phone' && value.trim() && !validatePhone(value)) {
      error = 'Invalid phone number format';
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) newErrors[key] = error;
      else delete newErrors[key];
      return newErrors;
    });
    return !error;
  };

  // --- Handlers ---

  const handleChange = (field: keyof ResumeData, value: string) => {
    setResume(prev => ({ ...prev, [field]: value }));
    handleDataChange();
    
    // Validation triggers
    if (field === 'fullName') validate('fullName', value, 'required');
    if (field === 'email') validate('email', value, 'email');
    if (field === 'phone') validate('phone', value, 'phone');
  };

  // Experience Handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: '',
      role: '',
      duration: '',
      description: ''
    };
    setResume(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    handleDataChange();
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
    handleDataChange();
    
    // Validate required experience fields
    if (field === 'company') validate(`exp_${id}_company`, value, 'required');
    if (field === 'role') validate(`exp_${id}_role`, value, 'required');
  };

  const removeExperience = (id: string) => {
    setResume(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    handleDataChange();
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`exp_${id}_company`];
      delete newErrors[`exp_${id}_role`];
      return newErrors;
    });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      year: ''
    };
    setResume(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    handleDataChange();
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
    handleDataChange();

    // Validate required education fields
    if (field === 'institution') validate(`edu_${id}_institution`, value, 'required');
    if (field === 'degree') validate(`edu_${id}_degree`, value, 'required');
  };

  const removeEducation = (id: string) => {
    setResume(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
    handleDataChange();
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`edu_${id}_institution`];
      delete newErrors[`edu_${id}_degree`];
      return newErrors;
    });
  };

  // Project Handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: '',
      link: ''
    };
    setResume(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
    handleDataChange();
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
    handleDataChange();

    if (field === 'title') validate(`proj_${id}_title`, value, 'required');
  };

  const removeProject = (id: string) => {
    setResume(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    handleDataChange();
    setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`proj_${id}_title`];
        return newErrors;
    });
  };

  // Skills Handlers
  const addSkill = () => {
    if (newSkill && !resume.skills.includes(newSkill)) {
      setResume(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill('');
      handleDataChange();
    }
  };

  const removeSkill = (skill: string) => {
    setResume(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    handleDataChange();
  };

  const handlePrint = () => {
    // Basic validation before print check (optional, but good UX)
    validate('fullName', resume.fullName, 'required');
    validate('email', resume.email, 'email');
    window.print();
  };

  const handleExportPDF = () => {
    // Basic validation before print check (optional, but good UX)
    validate('fullName', resume.fullName, 'required');
    validate('email', resume.email, 'email');
    
    addResumeActivity('Exported Resume to PDF');
    
    // Use the browser's native print dialog which allows saving as PDF
    // and correctly applies the @media print CSS rules requested.
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      <style>{`
        @media print {
          @page { margin: 0; size: auto; }
          body * { visibility: hidden; }
          #resume-container, #resume-container * { visibility: visible; }
          #resume-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            transform: none !important;
            overflow: hidden !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Toolbar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="flex justify-between items-center mb-6 no-print"
      >
        <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
        <div className="flex space-x-3 items-center">
          <div className="flex mr-4 bg-white rounded-xl shadow-sm border border-slate-200 p-1">
             <button
               onClick={() => setActiveTab('edit')}
               className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'edit' ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
             >
               Editor
             </button>
             <button
               onClick={() => setActiveTab('preview')}
               className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'preview' ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
             >
               Preview
             </button>
          </div>

          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleSave} 
             disabled={saving || saveStatus === 'saved'}
             className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
               saveStatus === 'saved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] text-white shadow-md shadow-[#6C5CE7]/20'
             }`}
          >
             {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveStatus === 'saved' ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
             <span>{saving ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save Resume'}</span>
          </motion.button>

          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleExportPDF} 
             className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-slate-800 shadow-sm transition-all duration-200"
          >
             <Download className="w-4 h-4" />
             <span>Export PDF</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        
        {/* === LEFT COLUMN: EDITOR === */}
        <div className={`space-y-6 overflow-y-auto pr-2 pb-20 no-print ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          
          <AccordionSection title="Personal Information" id="personal" activeSection={activeSection} setActiveSection={setActiveSection}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Full Name *</label>
                <InputWithError 
                  value={resume.fullName} 
                  onChange={(e) => handleChange('fullName', e.target.value)} 
                  placeholder="e.g. Jane Doe" 
                  errorKey="fullName"
                  errors={errors}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Email *</label>
                <InputWithError 
                  value={resume.email} 
                  onChange={(e) => handleChange('email', e.target.value)} 
                  placeholder="jane@example.com" 
                  errorKey="email"
                  errors={errors}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Phone</label>
                <InputWithError 
                  value={resume.phone} 
                  onChange={(e) => handleChange('phone', e.target.value)} 
                  placeholder="(555) 123-4567" 
                  errorKey="phone"
                  errors={errors}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1.5 block">Location</label>
                <input className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm" value={resume.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="City, State" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1.5 block">LinkedIn</label>
                <input className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm" value={resume.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="linkedin.com/in/jane" />
              </div>
               <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1.5 block">Portfolio Website</label>
                <input className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm" value={resume.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="www.janedoe.com" />
              </div>
            </div>
          </AccordionSection>

           <AccordionSection title="Professional Summary" id="summary" activeSection={activeSection} setActiveSection={setActiveSection}>
             <div className="relative">
                <textarea
                  rows={6}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none resize-none leading-relaxed text-sm transition-all"
                  value={resume.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  placeholder="Experienced Software Engineer with a focus on..."
                />
             </div>
          </AccordionSection>

          <AccordionSection title="Experience" id="experience" activeSection={activeSection} setActiveSection={setActiveSection}>
            <div className="space-y-6">
              <AnimatePresence>
                {resume.experience.map((exp) => (
                  <motion.div 
                    key={exp.id} 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 relative group"
                  >
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <InputWithError 
                         value={exp.company} 
                         onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} 
                         placeholder="Company Name *" 
                         errorKey={`exp_${exp.id}_company`}
                         errors={errors}
                      />
                      <div className="grid grid-cols-2 gap-4">
                         <InputWithError 
                            value={exp.role} 
                            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} 
                            placeholder="Role / Job Title *" 
                            errorKey={`exp_${exp.id}_role`}
                            errors={errors}
                         />
                         <input placeholder="Date Range" className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} />
                      </div>
                    </div>
                    <div className="relative">
                        <textarea
                          rows={4}
                          placeholder="Key responsibilities and achievements..."
                          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none text-sm transition-all resize-none"
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addExperience} 
                className="w-full py-3.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-[#6C5CE7] hover:text-[#6C5CE7] hover:bg-[#6C5CE7]/5 transition-all duration-200 flex justify-center items-center font-medium text-sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </motion.button>
            </div>
          </AccordionSection>

          <AccordionSection title="Education" id="education" activeSection={activeSection} setActiveSection={setActiveSection}>
             <div className="space-y-4">
              <AnimatePresence>
                {resume.education.map((edu) => (
                  <motion.div 
                    key={edu.id} 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 relative"
                  >
                     <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                      <InputWithError 
                         value={edu.institution} 
                         onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} 
                         placeholder="Institution / University *" 
                         errorKey={`edu_${edu.id}_institution`}
                         errors={errors}
                      />
                      <div className="grid grid-cols-3 gap-4">
                         <div className="col-span-2">
                          <InputWithError 
                            value={edu.degree} 
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} 
                            placeholder="Degree / Major *" 
                            errorKey={`edu_${edu.id}_degree`}
                            errors={errors}
                          />
                         </div>
                         <input placeholder="Year" className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addEducation} 
                className="w-full py-3.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-[#6C5CE7] hover:text-[#6C5CE7] hover:bg-[#6C5CE7]/5 transition-all duration-200 flex justify-center items-center font-medium text-sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </motion.button>
            </div>
          </AccordionSection>

           <AccordionSection title="Projects" id="projects" activeSection={activeSection} setActiveSection={setActiveSection}>
            <div className="space-y-6">
              <AnimatePresence>
                {resume.projects.map((proj) => (
                  <motion.div 
                    key={proj.id} 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 relative"
                  >
                    <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <InputWithError 
                         value={proj.title} 
                         onChange={(e) => updateProject(proj.id, 'title', e.target.value)} 
                         placeholder="Project Title *" 
                         errorKey={`proj_${proj.id}_title`}
                         className="font-medium"
                         errors={errors}
                      />
                      <input placeholder="Technologies (e.g. React, Node.js)" className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm" value={proj.technologies} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)} />
                      <input placeholder="Link (Optional)" className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm" value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} />
                    </div>
                    <div className="relative">
                        <textarea
                          rows={3}
                          placeholder="Description of the project..."
                          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none text-sm transition-all resize-none"
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                        />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addProject} 
                className="w-full py-3.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-[#6C5CE7] hover:text-[#6C5CE7] hover:bg-[#6C5CE7]/5 transition-all duration-200 flex justify-center items-center font-medium text-sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </motion.button>
            </div>
          </AccordionSection>

          <AccordionSection title="Skills" id="skills" activeSection={activeSection} setActiveSection={setActiveSection}>
             <div className="flex space-x-3 mb-4">
               <input
                 type="text"
                 placeholder="Add a skill (e.g. Python)"
                 className="flex-1 p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] bg-slate-50 focus:bg-white outline-none transition-all text-sm"
                 value={newSkill}
                 onChange={(e) => setNewSkill(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && addSkill()}
               />
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={addSkill} 
                 className="bg-slate-900 text-white px-5 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-sm text-sm font-medium"
               >
                 Add
               </motion.button>
             </div>
             <div className="flex flex-wrap gap-2">
               <AnimatePresence>
                 {resume.skills.map((skill) => (
                   <motion.span 
                     key={skill} 
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     className="bg-[#6C5CE7]/10 text-[#6C5CE7] px-3 py-1.5 rounded-lg text-sm flex items-center font-medium"
                   >
                     {skill}
                     <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-500 transition-colors">×</button>
                   </motion.span>
                 ))}
               </AnimatePresence>
             </div>
          </AccordionSection>
          
        </div>

        {/* === RIGHT COLUMN: PREVIEW === */}
        <div className={`bg-slate-100 p-8 rounded-xl border border-slate-200 overflow-y-auto flex items-start justify-center ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
           {/* A4 Page Container */}
           <motion.div 
             id="resume-container" 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             style={{
               width: '794px',
               minHeight: '1123px',
               background: 'white',
               margin: 'auto',
               pageBreakAfter: 'avoid',
               pageBreakInside: 'avoid'
             }}
             className="shadow-2xl p-[15mm] text-slate-900 transform lg:scale-95 origin-top transition-transform"
           >
              
              {/* Header */}
              <div className="border-b-2 border-slate-800 pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900 mb-2">{resume.fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-600">
                   {resume.email && <span>{resume.email}</span>}
                   {resume.phone && <span>{resume.phone}</span>}
                   {resume.location && <span>{resume.location}</span>}
                   {resume.linkedin && <span>{resume.linkedin}</span>}
                   {resume.website && <span>{resume.website}</span>}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 text-slate-800 tracking-wider">Professional Summary</h2>
                  <p className="text-sm leading-relaxed text-slate-700 text-justify">{resume.summary}</p>
                </div>
              )}

              {/* Skills */}
              {resume.skills.length > 0 && (
                <div className="mb-6">
                   <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 text-slate-800 tracking-wider">Technical Skills</h2>
                   <div className="text-sm text-slate-700">
                      {resume.skills.join(', ')}
                   </div>
                </div>
              )}

              {/* Experience */}
              {resume.experience.length > 0 && (
                <div className="mb-6">
                   <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-4 text-slate-800 tracking-wider">Experience</h2>
                   <div className="space-y-5">
                     {resume.experience.map(exp => (
                       <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-1">
                             <h3 className="font-bold text-slate-800">{exp.role}</h3>
                             <span className="text-sm text-slate-600 font-medium">{exp.duration}</span>
                          </div>
                          <div className="text-sm font-semibold text-slate-700 mb-2">{exp.company}</div>
                          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line pl-1">{exp.description}</p>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* Projects */}
              {resume.projects.length > 0 && (
                 <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-4 text-slate-800 tracking-wider">Projects</h2>
                    <div className="space-y-4">
                      {resume.projects.map(proj => (
                        <div key={proj.id}>
                           <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-bold text-slate-800">
                                {proj.title} 
                                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[#6C5CE7] hover:underline font-normal ml-2 text-xs">({proj.link})</a>}
                              </h3>
                              <span className="text-xs text-slate-500">{proj.technologies}</span>
                           </div>
                           <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                 </div>
              )}

              {/* Education */}
               {resume.education.length > 0 && (
                <div className="mb-6">
                   <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-4 text-slate-800 tracking-wider">Education</h2>
                   <div className="space-y-4">
                     {resume.education.map(edu => (
                       <div key={edu.id}>
                          <div className="flex justify-between items-baseline mb-1">
                             <h3 className="font-bold text-slate-800">{edu.institution}</h3>
                             <span className="text-sm text-slate-600 font-medium">{edu.year}</span>
                          </div>
                          <div className="text-sm text-slate-700">{edu.degree}</div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};