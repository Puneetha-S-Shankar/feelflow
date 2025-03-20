
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, Eye, SkipForward } from 'lucide-react';
import { Post } from '@/lib/types';

interface FeedItemProps {
  post: Post;
}

const FeedItem = ({ post }: FeedItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  
  const toggleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const revealPost = () => {
    setRevealed(true);
  };
  
  return (
    <motion.div 
      className="rounded-2xl glassmorphism overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={post.avatar} 
              alt={post.username} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{post.username}</h3>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-muted-foreground p-2 rounded-full hover:bg-secondary transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      {/* Post Image */}
      <div className="relative">
        {post.filtered && !revealed ? (
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-xl z-10 flex flex-col items-center justify-center p-6 text-center">
              <p className="text-lg font-medium mb-3">This post might be emotionally triggering</p>
              <p className="text-sm text-muted-foreground mb-6">Based on your current mood, this content might not align with how you're feeling</p>
              <div className="flex space-x-3">
                <button 
                  onClick={revealPost}
                  className="flex items-center space-x-1 py-2 px-4 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                >
                  <Eye size={16} />
                  <span>Show</span>
                </button>
                <button className="flex items-center space-x-1 py-2 px-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                  <SkipForward size={16} />
                  <span>Skip</span>
                </button>
              </div>
            </div>
            <img 
              src={post.image} 
              alt={post.caption} 
              className="w-full object-cover max-h-[500px] blur-xl"
            />
          </div>
        ) : (
          <img 
            src={post.image} 
            alt={post.caption} 
            className="w-full object-cover max-h-[500px]"
          />
        )}
      </div>
      
      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLike}
              className={`flex items-center space-x-1 ${isLiked ? 'text-destructive' : ''}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-sm">{likesCount}</span>
            </button>
            <button className="flex items-center space-x-1">
              <MessageCircle size={20} />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
          <button>
            <Share2 size={20} />
          </button>
        </div>
        
        {/* Caption */}
        <p className="text-sm">
          <span className="font-medium">{post.username}</span>{' '}
          {post.caption}
        </p>
      </div>
    </motion.div>
  );
};

export default FeedItem;
