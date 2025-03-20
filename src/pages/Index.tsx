
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MoodSelector from '@/components/MoodSelector';
import { Mood, User } from '@/lib/types';

interface IndexProps {
  updateUser: (user: Partial<User>) => void;
}

const Index = ({ updateUser }: IndexProps) => {
  const navigate = useNavigate();
  
  const handleMoodSelect = (mood: Mood) => {
    updateUser({ currentMood: mood });
    
    // Animate transition to feed
    setTimeout(() => {
      navigate('/feed');
    }, 300);
  };
  
  return (
    <motion.div 
      className="min-h-[80vh] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MoodSelector onMoodSelect={handleMoodSelect} />
    </motion.div>
  );
};

export default Index;
