
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import FilteredContent from '@/components/FilteredContent';
import { filterPostsByMood, getMockPosts } from '@/lib/moodUtils';
import { User, Post } from '@/lib/types';

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
    
    // Get and filter posts
    const allPosts = getMockPosts();
    const filteredPosts = user.settings.moodFilterEnabled 
      ? filterPostsByMood(allPosts, user.currentMood, user.settings.moodFilterStrength)
      : allPosts;
    
    setPosts(filteredPosts);
  }, [user.currentMood, user.settings.moodFilterEnabled, user.settings.moodFilterStrength]);
  
  return (
    <Layout user={user} updateUser={updateUser}>
      <FilteredContent posts={posts} currentMood={user.currentMood} />
    </Layout>
  );
};

export default Feed;
