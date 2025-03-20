
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
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  currentMood?: Mood;
  settings: {
    moodFilterEnabled: boolean;
    moodFilterStrength: 'low' | 'medium' | 'high';
  };
}
