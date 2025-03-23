
export type Mood = 'happy' | 'sad' | 'angry' | 'stressed' | 'anxious' | 'excited' | 'calm';

export interface MoodOption {
  id: Mood;
  label: string;
  icon: string;
  description: string;
  color: string;
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
