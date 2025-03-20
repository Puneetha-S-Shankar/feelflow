
import React from 'react';
import { Mood, MoodOption } from '@/lib/types';
import { moodOptions } from '@/lib/moodUtils';
import { motion } from 'framer-motion';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
}

const MoodSelector = ({ onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.h1 
        className="text-3xl font-semibold text-center mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How are you feeling today?
      </motion.h1>
      
      <motion.p 
        className="text-muted-foreground text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        We'll personalize your feed based on your mood
      </motion.p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {moodOptions.map((mood, index) => (
          <motion.div
            key={mood.id}
            className="mood-card glassmorphism flex flex-col items-center justify-center"
            style={{ 
              boxShadow: `0 4px 20px rgba(0,0,0,0.05)`,
              borderBottom: `3px solid ${mood.color}`
            }}
            onClick={() => onMoodSelect(mood.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              y: -5,
              boxShadow: `0 8px 30px rgba(0,0,0,0.1)`,
              borderBottom: `3px solid ${mood.color}`
            }}
          >
            <div className="text-4xl mb-2">{mood.icon}</div>
            <h3 className="text-lg font-medium mb-1">{mood.label}</h3>
            <p className="text-xs text-center text-muted-foreground">{mood.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
