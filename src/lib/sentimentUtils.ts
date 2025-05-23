
import { Comment, Sentiment, Mood } from './types';

// Enhanced sentiment analysis function to detect emotional state with more nuance
export const analyzeSentiment = (text: string): Sentiment => {
  const lowerText = text.toLowerCase();
  
  // Distressed keywords (expanded for better detection)
  const distressedWords = [
    'depressed', 'suicidal', 'hopeless', 'worthless', 'dying', 
    'can\'t take it', 'end it all', 'kill myself', 'hate myself', 
    'don\'t want to live', 'no reason to live', 'giving up',
    'can\'t handle', 'overwhelmed', 'too much', 'breaking down'
  ];
  
  // Negative emotion keywords (expanded)
  const negativeWords = [
    'sad', 'angry', 'upset', 'frustrated', 'annoyed', 'tired', 
    'exhausted', 'hate', 'dislike', 'awful', 'terrible', 'horrible', 
    'anxious', 'worried', 'stressed', 'depressing', 'disappointing',
    'lonely', 'miserable', 'hurt', 'betrayed', 'rejected', 'ignored',
    'struggling', 'failing', 'lost', 'confused', 'unsure'
  ];
  
  // Positive emotion keywords (expanded)
  const positiveWords = [
    'happy', 'excited', 'great', 'wonderful', 'amazing', 'love', 
    'like', 'enjoy', 'beautiful', 'fantastic', 'awesome', 'good', 
    'excellent', 'pleased', 'delighted', 'grateful', 'thankful',
    'blessed', 'hopeful', 'inspiring', 'motivated', 'peaceful',
    'content', 'satisfied', 'accomplished', 'proud', 'confident'
  ];
  
  // Check for distressed sentiment first (highest priority)
  for (const word of distressedWords) {
    if (lowerText.includes(word)) {
      return 'distressed';
    }
  }
  
  // Count positive and negative word occurrences
  let positiveCount = 0;
  let negativeCount = 0;
  
  for (const word of positiveWords) {
    if (lowerText.includes(word)) {
      positiveCount++;
    }
  }
  
  for (const word of negativeWords) {
    if (lowerText.includes(word)) {
      negativeCount++;
    }
  }
  
  // Determine sentiment based on word counts
  if (positiveCount > negativeCount) {
    return 'positive';
  } else if (negativeCount > positiveCount) {
    return 'negative';
  } else {
    return 'neutral';
  }
};

// Derive mood from sentiment
export const deriveMoodFromSentiment = (sentiment: Sentiment): Mood => {
  switch (sentiment) {
    case 'positive':
      return Math.random() > 0.5 ? 'happy' : 'excited';
    case 'negative':
      return Math.random() > 0.7 ? 'sad' : (Math.random() > 0.5 ? 'angry' : 'anxious');
    case 'distressed':
      return Math.random() > 0.5 ? 'sad' : 'stressed';
    case 'neutral':
    default:
      return 'calm';
  }
};

// Analyze a user's recent comments to determine their emotional state
export const analyzeUserComments = (comments: Comment[]): Mood | undefined => {
  if (!comments || comments.length === 0) {
    return undefined;
  }
  
  // Count occurrences of each sentiment
  let sentimentCounts = {
    positive: 0,
    negative: 0,
    neutral: 0,
    distressed: 0
  };
  
  // Process each comment
  comments.forEach(comment => {
    // If sentiment is already analyzed, use it
    if (comment.sentiment) {
      sentimentCounts[comment.sentiment]++;
    } else {
      // Otherwise analyze the comment text
      const sentiment = analyzeSentiment(comment.text);
      sentimentCounts[sentiment]++;
    }
  });
  
  // Prioritize distressed sentiment
  if (sentimentCounts.distressed > 0) {
    return 'sad';
  }
  
  // Find the dominant sentiment
  let dominantSentiment: Sentiment = 'neutral';
  let maxCount = sentimentCounts.neutral;
  
  if (sentimentCounts.positive > maxCount) {
    dominantSentiment = 'positive';
    maxCount = sentimentCounts.positive;
  }
  
  if (sentimentCounts.negative > maxCount) {
    dominantSentiment = 'negative';
    maxCount = sentimentCounts.negative;
  }
  
  return deriveMoodFromSentiment(dominantSentiment);
};

// Enhanced supportive responses based on detected sentiment
export const generateSupportiveResponse = (sentiment: Sentiment): string => {
  const responses = {
    distressed: [
      "I noticed you might be going through a difficult time. Would you like to talk about it?",
      "I'm here for you. It's okay to take a break if you need one. Would you like some resources that might help?",
      "Your wellbeing matters. Would it help to connect with supportive resources or communities?",
      "I'm concerned about how you're feeling. Would you like to talk or perhaps consider reaching out to someone you trust?",
      "Sometimes things can feel overwhelming. Would you like me to suggest some coping strategies or resources?"
    ],
    negative: [
      "It seems like you might be feeling down. Would you like to see some content that might lift your spirits?",
      "I've noticed your comments reflect some frustration. Would you like me to adjust your feed to show more positive content?",
      "Sometimes a change of perspective can help. Would you like to explore some different content?",
      "Would it help to take a short break or see some uplifting content instead?"
    ],
    neutral: [
      "How are you feeling today? I'm here if you need anything.",
      "Is there anything specific you'd like to see in your feed today?",
      "Let me know if you'd like any adjustments to your content preferences.",
      "I'm here to help make your browsing experience better. Any preferences for today?"
    ],
    positive: [
      "It's great to see you in good spirits! Would you like to see more content that matches your mood?",
      "Your positivity is wonderful! I'll keep showing you content that maintains this vibe.",
      "Glad to see you're enjoying the content! Any specific topics you'd like to explore more?",
      "I'm happy you're feeling good! Would you like me to recommend some more content you might enjoy?"
    ]
  };
  
  // Select a random response from the appropriate category
  const appropriateResponses = responses[sentiment];
  const randomIndex = Math.floor(Math.random() * appropriateResponses.length);
  return appropriateResponses[randomIndex];
};

// Generate mock comments for demo purposes
export const generateMockComments = (): Comment[] => {
  return [
    {
      id: '1',
      username: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128&auto=format&fit=crop',
      text: "This is such a beautiful photo! I love the colors and composition.",
      timestamp: '5m ago',
      sentiment: 'positive'
    },
    {
      id: '2',
      username: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128&auto=format&fit=crop',
      text: "I'm feeling so stressed today, nothing seems to be going right.",
      timestamp: '1h ago',
      sentiment: 'negative'
    },
    {
      id: '3',
      username: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128&auto=format&fit=crop',
      text: "Just checking out this post. Interesting concept.",
      timestamp: '2h ago',
      sentiment: 'neutral'
    }
  ];
};

// New: Get mental health resources based on detected level of distress
export const getMentalHealthResources = (severity: 'low' | 'medium' | 'high'): string => {
  const resources = {
    low: "Here are some self-care suggestions:\n\n• Take a social media break\n• Practice deep breathing exercises\n• Go for a short walk outdoors\n• Listen to music you enjoy\n• Write down your thoughts",
    
    medium: "These resources might be helpful:\n\n• 7 Cups: Free online chat support\n• BetterHelp: Online counseling\n• Headspace: Guided meditation app\n• Journal prompts for emotional processing\n• Local support groups",
    
    high: "If you're going through a difficult time, please consider these resources:\n\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 988\n• BetterHelp: Online counseling\n• Local emergency services: 911\n• Nearest emergency room"
  };
  
  return resources[severity];
};
