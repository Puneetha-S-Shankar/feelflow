
import React from 'react';
import { motion } from 'framer-motion';
import FeedItem from './FeedItem';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Post, Mood } from '@/lib/types';

interface FilteredContentProps {
  posts: Post[];
  currentMood?: Mood;
  detectedMood?: Mood;
}

const FilteredContent = ({ posts, currentMood, detectedMood }: FilteredContentProps) => {
  // Helper function to get a friendly description of the mood
  const getMoodDescription = (mood: Mood): string => {
    const descriptions = {
      'happy': 'happy and positive',
      'sad': 'a bit down',
      'angry': 'frustrated or upset',
      'stressed': 'under pressure',
      'anxious': 'worried or anxious',
      'excited': 'excited and enthusiastic',
      'calm': 'peaceful and relaxed'
    };
    
    return descriptions[mood] || mood;
  };
  
  return (
    <div>
      {currentMood && (
        <motion.div 
          className="mb-6 glassmorphism rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="text-sm text-center">
            <span className="font-medium">Mood filter active:</span> Your feed is being personalized based on your {detectedMood ? 'detected' : 'selected'} mood.
          </p>
          
          {detectedMood && detectedMood !== currentMood && (
            <Alert className="mt-3 bg-secondary/50 border-none">
              <AlertDescription className="text-xs flex items-center">
                <Info size={14} className="mr-2 flex-shrink-0" />
                We noticed your recent comments suggest you might be feeling {getMoodDescription(detectedMood)}. We've adjusted your feed to match your current emotional state.
              </AlertDescription>
            </Alert>
          )}
        </motion.div>
      )}
      
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg font-medium">No posts to show</p>
          <p className="text-muted-foreground">Try adjusting your mood or filters</p>
        </div>
      ) : (
        <div>
          {posts.map(post => (
            <FeedItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredContent;
