import React from 'react';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

export const ComingSoon: React.FC<{ title: string, type: 'settings' }> = ({ title, type }) => {
  const Icon = Settings;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-[70vh] text-center"
    >
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-24 h-24 bg-gradient-to-br from-[#6C5CE7] to-[#8E7CFF] rounded-3xl flex items-center justify-center shadow-lg shadow-[#6C5CE7]/30 mb-8"
      >
        <Icon className="w-12 h-12 text-white" />
      </motion.div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
      <p className="text-slate-500 max-w-md">
        We're working hard to bring you this feature. Check back soon for updates!
      </p>
    </motion.div>
  );
};
