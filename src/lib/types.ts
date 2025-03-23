export type Mood = 'happy' | 'sad' | 'angry' | 'stressed' | 'anxious' | 'excited' | 'calm';

export type SubEmotion = 
  // Happy sub-emotions
  'joyful' | 'grateful' | 'content' | 'proud' | 
  // Sad sub-emotions
  'lonely' | 'disappointed' | 'grief' | 'regretful' | 
  // Angry sub-emotions
  'frustrated' | 'irritated' | 'resentful' | 'betrayed' | 
  // Stressed sub-emotions
  'overwhelmed' | 'pressured' | 'burnout' | 'restless' | 
  // Anxious sub-emotions
  'fearful' | 'worried' | 'nervous' | 'insecure' | 
  // Excited sub-emotions
  'enthusiastic' | 'eager' | 'hopeful' | 'inspired' | 
  // Calm sub-emotions
  'peaceful' | 'relaxed' | 'mindful' | 'balanced';

export interface SubEmotionOption {
  id: SubEmotion;
  label: string;
  description: string;
}

export interface MoodOption {
  id: Mood;
  label: string;
  icon: string;
  description: string;
  color: string;
  subEmotions: SubEmotionOption[];
}

export interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  mood: Mood[];
  filtered?: boolean;
  boosted?: boolean;
  commentsList?: Comment[];
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  sentiment?: Sentiment;
}

export type Sentiment = 'positive' | 'negative' | 'neutral' | 'distressed';

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  currentMood?: Mood;
  currentSubEmotion?: SubEmotion;
  detectedMood?: Mood;
  settings: {
    moodFilterEnabled: boolean;
    moodFilterStrength: 'low' | 'medium' | 'high';
    aiAssistEnabled: boolean;
    sentimentTrackingEnabled: boolean;
  };
  recentComments?: Comment[];
}

export interface AIAssistantMessage {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
