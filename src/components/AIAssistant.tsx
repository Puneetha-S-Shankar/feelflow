
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Info } from 'lucide-react';
import { User, AIAssistantMessage, Sentiment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateSupportiveResponse } from '@/lib/sentimentUtils';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  user: User;
  updateUser: (user: Partial<User>) => void;
}

const AIAssistant = ({ user, updateUser }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIAssistantMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Automatically show AI assistant if distress is detected and feature enabled
  useEffect(() => {
    if (user.settings.aiAssistEnabled && user.recentComments && user.recentComments.length > 0) {
      const distressedComment = user.recentComments.find(comment => 
        comment.sentiment === 'distressed'
      );
      
      if (distressedComment) {
        // Only prompt if the assistant isn't already open
        if (!isOpen) {
          setShowWelcome(true);
          
          // Generate initial supportive message
          const initialMessage: AIAssistantMessage = {
            id: Date.now().toString(),
            type: 'assistant',
            text: generateSupportiveResponse('distressed'),
            timestamp: 'Just now'
          };
          
          setMessages([initialMessage]);
        }
      }
    }
  }, [user.recentComments, user.settings.aiAssistEnabled]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    setShowWelcome(false);
    
    // If first time opening, add welcome message
    if (!isOpen && messages.length === 0) {
      const welcomeMessage: AIAssistantMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        text: "Hi there! I'm your AI assistant. How can I help you today?",
        timestamp: 'Just now'
      };
      
      setMessages([welcomeMessage]);
    }
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: AIAssistantMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: 'Just now'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const sentiment: Sentiment = 
        inputValue.toLowerCase().includes('sad') || 
        inputValue.toLowerCase().includes('depressed') || 
        inputValue.toLowerCase().includes('anxious') ? 
          'distressed' : 'neutral';
      
      const aiMessage: AIAssistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: generateSupportiveResponse(sentiment),
        timestamp: 'Just now'
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      
      // Offer resources for distressed users
      if (sentiment === 'distressed') {
        setTimeout(() => {
          const resourceMessage: AIAssistantMessage = {
            id: (Date.now() + 2).toString(),
            type: 'assistant',
            text: "If you're going through a difficult time, these resources might help:\n\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 988\n• BetterHelp: Online counseling\n\nWould you like me to adjust your feed to show more uplifting content?",
            timestamp: 'Just now'
          };
          
          setMessages(prevMessages => [...prevMessages, resourceMessage]);
        }, 1000);
      }
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-30">
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-64"
          >
            <Alert className="glassmorphism shadow-lg border-none">
              <AlertDescription className="text-sm">
                I noticed you might be feeling down. Would you like to talk?
              </AlertDescription>
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mr-2 text-xs h-8" 
                  onClick={() => setShowWelcome(false)}
                >
                  Not now
                </Button>
                <Button 
                  size="sm" 
                  variant="default" 
                  className="text-xs h-8" 
                  onClick={toggleAssistant}
                >
                  Let's talk
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}
        
        <motion.button
          className={`rounded-full p-4 shadow-lg flex items-center justify-center ${
            isOpen ? 'bg-primary text-primary-foreground' : 'glassmorphism'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAssistant}
          aria-label="AI Assistant"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
      </div>
      
      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] h-[500px] max-h-[70vh] rounded-2xl glassmorphism overflow-hidden z-20 shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <MessageCircle size={16} />
                </div>
                <h3 className="font-medium">AI Assistant</h3>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  updateUser({
                    settings: {
                      ...user.settings,
                      aiAssistEnabled: !user.settings.aiAssistEnabled
                    }
                  });
                  toast({
                    title: user.settings.aiAssistEnabled ? 
                      "AI Assistant disabled" : 
                      "AI Assistant enabled",
                    description: user.settings.aiAssistEnabled ? 
                      "You won't receive proactive assistance" : 
                      "You'll receive help when needed"
                  });
                }}
              >
                <Info size={18} />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-secondary text-secondary-foreground rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <textarea
                  className="flex-1 min-h-10 max-h-28 px-3 py-2 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
