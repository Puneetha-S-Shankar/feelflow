
import { Mood, MoodOption, Post } from './types';

export const moodOptions: MoodOption[] = [
  {
    id: 'happy',
    label: 'Happy',
    icon: '😊',
    description: 'I feel good and positive',
    color: '#FFD166'
  },
  {
    id: 'sad',
    label: 'Sad',
    icon: '😔',
    description: 'I feel down or blue',
    color: '#118AB2'
  },
  {
    id: 'angry',
    label: 'Angry',
    icon: '😠',
    description: 'I feel frustrated or upset',
    color: '#EF476F'
  },
  {
    id: 'stressed',
    label: 'Stressed',
    icon: '😫',
    description: 'I feel overwhelmed',
    color: '#073B4C'
  },
  {
    id: 'anxious',
    label: 'Anxious',
    icon: '😰',
    description: 'I feel worried or nervous',
    color: '#6A4C93'
  },
  {
    id: 'excited',
    label: 'Excited',
    icon: '🤩',
    description: 'I feel energetic and enthusiastic',
    color: '#FF9E00'
  },
  {
    id: 'calm',
    label: 'Calm',
    icon: '😌',
    description: 'I feel peaceful and relaxed',
    color: '#06D6A0'
  }
];

export const getContrastMood = (mood: Mood): Mood[] => {
  switch (mood) {
    case 'happy':
      return ['sad', 'stressed', 'anxious'];
    case 'sad':
      return ['happy', 'excited'];
    case 'angry':
      return ['calm', 'happy'];
    case 'stressed':
      return ['calm', 'excited'];
    case 'anxious':
      return ['calm', 'happy'];
    case 'excited':
      return ['calm', 'sad'];
    case 'calm':
      return ['excited', 'angry'];
    default:
      return [];
  }
};

export const getComplementaryMood = (mood: Mood): Mood[] => {
  switch (mood) {
    case 'happy':
      return ['excited', 'calm'];
    case 'sad':
      return ['calm', 'happy'];
    case 'angry':
      return ['calm', 'happy'];
    case 'stressed':
      return ['calm', 'happy'];
    case 'anxious':
      return ['calm', 'happy'];
    case 'excited':
      return ['happy', 'calm'];
    case 'calm':
      return ['happy', 'excited'];
    default:
      return [];
  }
};

export const filterPostsByMood = (posts: Post[], currentMood: Mood, filterStrength: 'low' | 'medium' | 'high'): Post[] => {
  if (!currentMood) return posts;
  
  const contrastMoods = getContrastMood(currentMood);
  const complementaryMoods = getComplementaryMood(currentMood);
  
  return posts.map(post => {
    // Check if post has any contrasting moods
    const hasContrastingMood = post.mood.some(mood => contrastMoods.includes(mood));
    
    // Apply different filtering based on strength
    if (hasContrastingMood) {
      if (filterStrength === 'high') {
        return { ...post, filtered: true };
      } else if (filterStrength === 'medium' && Math.random() > 0.3) {
        return { ...post, filtered: true };
      } else if (filterStrength === 'low' && Math.random() > 0.7) {
        return { ...post, filtered: true };
      }
    }
    
    // Boost posts with complementary moods
    const hasComplementaryMood = post.mood.some(mood => complementaryMoods.includes(mood));
    if (hasComplementaryMood) {
      return { ...post, boosted: true };
    }
    
    return post;
  });
};

export const getMockPosts = (): Post[] => {
  return [
    {
      id: '1',
      username: 'nature_lover',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=600&auto=format&fit=crop',
      caption: 'Finding peace in the mountains. The view was absolutely breathtaking! 🏔️',
      likes: 243,
      comments: 42,
      timestamp: '2h ago',
      mood: ['calm', 'happy']
    },
    {
      id: '2',
      username: 'urban_explorer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=600&auto=format&fit=crop',
      caption: 'City lights never sleep. The energy here is incredible! 🌃',
      likes: 576,
      comments: 28,
      timestamp: '4h ago',
      mood: ['excited', 'happy']
    },
    {
      id: '3',
      username: 'quiet_thoughts',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=600&auto=format&fit=crop',
      caption: 'Sometimes the weight of the world feels too heavy to bear...',
      likes: 189,
      comments: 73,
      timestamp: '7h ago',
      mood: ['sad', 'anxious']
    },
    {
      id: '4',
      username: 'fitness_journey',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop',
      caption: 'Pushing through the pain! No excuses, just results. 💪',
      likes: 892,
      comments: 45,
      timestamp: '9h ago',
      mood: ['excited', 'stressed']
    },
    {
      id: '5',
      username: 'mindful_moments',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop',
      caption: 'Taking a moment to breathe and center myself. Peace comes from within.',
      likes: 340,
      comments: 18,
      timestamp: '12h ago',
      mood: ['calm']
    },
    {
      id: '6',
      username: 'party_person',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=600&auto=format&fit=crop',
      caption: 'Best night ever!!! The concert was AMAZING! Can't wait for the next one! 🎉🎵',
      likes: 723,
      comments: 59,
      timestamp: '13h ago',
      mood: ['excited', 'happy']
    },
    {
      id: '7',
      username: 'deep_thinker',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?q=80&w=600&auto=format&fit=crop',
      caption: 'Feeling lost in the chaos of life. Does anyone else struggle with finding their purpose?',
      likes: 287,
      comments: 124,
      timestamp: '1d ago',
      mood: ['anxious', 'sad']
    },
    {
      id: '8',
      username: 'political_observer',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=128&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?q=80&w=600&auto=format&fit=crop',
      caption: 'I can't believe what's happening in the world right now. So frustrated with the system!',
      likes: 412,
      comments: 231,
      timestamp: '1d ago',
      mood: ['angry']
    }
  ];
};
