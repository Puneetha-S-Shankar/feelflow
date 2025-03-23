
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import FilteredContent from '@/components/FilteredContent';
import AIAssistant from '@/components/AIAssistant';
import { filterPostsByMood, getMockPosts } from '@/lib/moodUtils';
import { analyzeUserComments, generateMockComments } from '@/lib/sentimentUtils';
import { User, Post } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface FeedProps {
  user: User;
  updateUser: (user: Partial<User>) => void;
}

const Feed = ({ user, updateUser }: FeedProps) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Redirect to home if no mood selected
    if (!user.currentMood) {
      navigate('/');
      return;
    }
    
    // Simulate comment analysis if sentiment tracking is enabled
    if (user.settings.sentimentTrackingEnabled && !user.detectedMood) {
      // In a real app, this would analyze actual user comments
      const recentComments = generateMockComments();
      const detectedMood = analyzeUserComments(recentComments);
      
      if (detectedMood && detectedMood !== user.currentMood) {
        updateUser({ 
          recentComments, 
          detectedMood 
        });
        
        toast({
          title: "Mood detection active",
          description: `Based on your recent comments, we've detected you might be feeling ${detectedMood}`,
        });
      }
    }
    
    // Get and filter posts
    const allPosts = getMockPosts();
    
    // If sentiment tracking is enabled and detected mood differs from selected mood,
    // use the detected mood for filtering with the user's selected strength
    const filterMood = (user.settings.sentimentTrackingEnabled && user.detectedMood) 
      ? user.detectedMood 
      : user.currentMood;
    
    const filteredPosts = user.settings.moodFilterEnabled 
      ? filterPostsByMood(allPosts, filterMood, user.settings.moodFilterStrength)
      : allPosts;
    
    setPosts(filteredPosts);
  }, [
    user.currentMood, 
    user.detectedMood,
    user.settings.moodFilterEnabled, 
    user.settings.moodFilterStrength,
    user.settings.sentimentTrackingEnabled
  ]);
  
  return (
    <Layout user={user} updateUser={updateUser}>
      <FilteredContent 
        posts={posts} 
        currentMood={user.currentMood} 
        detectedMood={user.detectedMood}
      />
      <AIAssistant user={user} updateUser={updateUser} />
    </Layout>
  );
};

export default Feed;
