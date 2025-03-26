
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Moon, User } from 'lucide-react';
import { User as UserType, Mood } from '@/lib/types';
import { moodOptions } from '@/lib/moodUtils';

interface HeaderProps {
  user?: UserType;
  toggleSettingsModal?: () => void;
}

const Header = ({ user, toggleSettingsModal }: HeaderProps) => {
  const currentMood = user?.currentMood;
  const currentMoodOption = currentMood ? moodOptions.find(m => m.id === currentMood) : null;
  
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 glassmorphism py-3 px-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold flex items-center"
        >
          <span className="mr-2">moodgram</span>
          <Moon className="h-5 w-5" />
        </Link>
        
        <div className="flex items-center space-x-4">
          {currentMoodOption && (
            <div className="hidden sm:flex items-center">
              <span className="text-sm text-muted-foreground mr-1">Feeling:</span>
              <div className="flex items-center space-x-1 py-1 px-2 rounded-full bg-secondary">
                <span>{currentMoodOption.icon}</span>
                <span className="text-sm font-medium">{currentMoodOption.label}</span>
              </div>
            </div>
          )}
          
          <button 
            onClick={toggleSettingsModal}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <Link 
            to="/profile" 
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <User className="h-4 w-4" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
