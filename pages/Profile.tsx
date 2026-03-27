import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Save, LogOut, User, Mail, Loader2, MapPin, Phone, Shield, Settings, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    if (user) {
      const names = (user.name || '').split(' ');
      setFirstName(names[0] || '');
      setLastName(names.slice(1).join(' ') || '');
      
      // Try to load extra metadata if available
      const loadMetadata = () => {
        const saved = localStorage.getItem(`profile_${user.id}`);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            setPhone(data.phone || '');
            setLocation(data.location || '');
            if (data.firstName) setFirstName(data.firstName);
            if (data.lastName) setLastName(data.lastName);
          } catch (e) {
            console.error('Failed to parse profile data', e);
          }
        }
      };
      loadMetadata();
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    setMessage(null);
    try {
      if (user?.id) {
        localStorage.setItem(`profile_${user.id}`, JSON.stringify({
          firstName,
          lastName,
          phone,
          location
        }));
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const handleImageUpload = () => {
    alert("Image upload functionality would go here. (Requires Storage Bucket setup)");
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional Details', icon: Briefcase },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#6C5CE7]/10 text-[#6C5CE7]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#6C5CE7]' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
            
            <div className="h-px bg-slate-200 my-2 mx-4"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {activeTab === 'personal' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8"
              >
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                  <p className="text-slate-500 text-sm mt-1">Update your photo and personal details here.</p>
                </div>

                {/* Profile Picture Section */}
                <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6C5CE7] to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                      {firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-3 mb-2">
                      <button 
                        onClick={handleImageUpload}
                        className="px-4 py-2 bg-[#6C5CE7] text-white text-sm font-medium rounded-lg hover:bg-[#6C5CE7]/90 transition-colors shadow-sm"
                      >
                        Upload New
                      </button>
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 5MB.</p>
                  </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-slate-800 text-sm"
                        placeholder="First Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-slate-800 text-sm"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl cursor-not-allowed text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-slate-800 text-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/20 focus:border-[#6C5CE7] outline-none transition-all text-slate-800 text-sm"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>

                {message && (
                  <div className={`p-4 mb-6 rounded-xl text-sm font-medium flex items-center ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {message.type === 'success' ? <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div> : <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>}
                    {message.text}
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#6C5CE7] text-white rounded-xl font-medium hover:bg-[#6C5CE7]/90 transition-all shadow-sm hover:shadow flex items-center disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab !== 'personal' && (
              <div className="p-8 flex flex-col items-center justify-center text-center h-96">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Coming Soon</h3>
                <p className="text-slate-500 max-w-sm">
                  This section is currently under development. Check back later for updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
