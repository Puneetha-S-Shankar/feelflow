
import React, { useState } from 'react';
import { Mood, MoodOption, SubEmotion } from '@/lib/types';
import { moodOptions } from '@/lib/moodUtils';
import { motion } from 'framer-motion';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood, subEmotion?: SubEmotion) => void;
}

const MoodSelector = ({ onMoodSelect }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    // If user just wants to select the general mood without a sub-emotion
    if (selectedMood === mood) {
      onMoodSelect(mood);
      setSelectedMood(null);
    }
  };
  
  const handleSubEmotionSelect = (subEmotion: SubEmotion) => {
    if (selectedMood) {
      onMoodSelect(selectedMood, subEmotion);
      setSelectedMood(null);
    }
  };
  
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
      
      {!selectedMood ? (
        // Main mood selection grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {moodOptions.map((mood, index) => (
            <motion.div
              key={mood.id}
              className="mood-card glassmorphism flex flex-col items-center justify-center cursor-pointer"
              style={{ 
                boxShadow: `0 4px 20px rgba(0,0,0,0.05)`,
                borderBottom: `3px solid ${mood.color}`
              }}
              onClick={() => handleMoodSelect(mood.id)}
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
      ) : (
        // Sub-emotion selection after a main mood is chosen
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">
              Select a specific emotion
            </h2>
            <button 
              onClick={() => setSelectedMood(null)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Back to moods
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {moodOptions.find(m => m.id === selectedMood)?.subEmotions.map((subEmotion, index) => (
              <motion.div
                key={subEmotion.id}
                className="mood-card glassmorphism p-4 cursor-pointer"
                style={{ 
                  boxShadow: `0 4px 20px rgba(0,0,0,0.05)`,
                  borderLeft: `3px solid ${moodOptions.find(m => m.id === selectedMood)?.color}`
                }}
                onClick={() => handleSubEmotionSelect(subEmotion.id)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ 
                  x: 5,
                  boxShadow: `0 8px 30px rgba(0,0,0,0.1)`
                }}
              >
                <h3 className="text-lg font-medium mb-1">{subEmotion.label}</h3>
                <p className="text-xs text-muted-foreground">{subEmotion.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <motion.button
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMoodSelect(selectedMood)}
            >
              Just {moodOptions.find(m => m.id === selectedMood)?.label} in general
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MoodSelector;
