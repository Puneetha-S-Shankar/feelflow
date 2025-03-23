
import React from 'react';
import { motion } from 'framer-motion';
import { X, SlidersHorizontal, MessageCircle } from 'lucide-react';
import { User } from '@/lib/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  updateUser?: (user: Partial<User>) => void;
}

const SettingsModal = ({ isOpen, onClose, user, updateUser }: SettingsModalProps) => {
  if (!isOpen) return null;
  
  const handleToggleFilter = () => {
    if (updateUser && user) {
      updateUser({
        settings: {
          ...user.settings,
          moodFilterEnabled: !user.settings.moodFilterEnabled
        }
      });
    }
  };
  
  const handleFilterStrengthChange = (strength: 'low' | 'medium' | 'high') => {
    if (updateUser && user) {
      updateUser({
        settings: {
          ...user.settings,
          moodFilterStrength: strength
        }
      });
    }
  };
  
  const handleToggleSentimentTracking = () => {
    if (updateUser && user) {
      updateUser({
        settings: {
          ...user.settings,
          sentimentTrackingEnabled: !user.settings.sentimentTrackingEnabled
        }
      });
    }
  };
  
  const handleToggleAIAssist = () => {
    if (updateUser && user) {
      updateUser({
        settings: {
          ...user.settings,
          aiAssistEnabled: !user.settings.aiAssistEnabled
        }
      });
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="w-full max-w-md glassmorphism rounded-2xl p-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Mood Filters Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Mood Filters</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Enable mood filtering</p>
                <p className="text-sm text-muted-foreground">Personalize your feed based on your mood</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={user?.settings.moodFilterEnabled}
                  onChange={handleToggleFilter}
                />
                <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            
            {user?.settings.moodFilterEnabled && (
              <div>
                <p className="font-medium mb-2">Filter strength</p>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map((strength) => (
                    <button
                      key={strength}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        user?.settings.moodFilterStrength === strength
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                      onClick={() => handleFilterStrengthChange(strength as 'low' | 'medium' | 'high')}
                    >
                      {strength.charAt(0).toUpperCase() + strength.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* AI Assistant Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">AI Assistant</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Enable sentiment tracking</p>
                <p className="text-sm text-muted-foreground">Analyze your comments to detect your mood</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={user?.settings.sentimentTrackingEnabled}
                  onChange={handleToggleSentimentTracking}
                />
                <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Enable AI assistance</p>
                <p className="text-sm text-muted-foreground">Get emotional support when needed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={user?.settings.aiAssistEnabled}
                  onChange={handleToggleAIAssist}
                />
                <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
          
          {/* Privacy Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Privacy</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share your mood</p>
                <p className="text-sm text-muted-foreground">Let friends see how you're feeling</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;
