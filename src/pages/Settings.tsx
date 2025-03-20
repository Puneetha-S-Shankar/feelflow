
import React from 'react';
import { SlidersHorizontal, Eye, Shield, Bell, User as UserIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import { User } from '@/lib/types';

interface SettingsProps {
  user: User;
  updateUser: (user: Partial<User>) => void;
}

const Settings = ({ user, updateUser }: SettingsProps) => {
  const handleToggleFilter = () => {
    updateUser({
      settings: {
        ...user.settings,
        moodFilterEnabled: !user.settings.moodFilterEnabled
      }
    });
  };
  
  const handleFilterStrengthChange = (strength: 'low' | 'medium' | 'high') => {
    updateUser({
      settings: {
        ...user.settings,
        moodFilterStrength: strength
      }
    });
  };
  
  return (
    <Layout user={user} updateUser={updateUser}>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        
        <div className="space-y-6">
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <SlidersHorizontal className="h-5 w-5" />
              <h2 className="text-xl font-medium">Content Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable mood filtering</p>
                  <p className="text-sm text-muted-foreground">Personalize your feed based on your mood</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={user.settings.moodFilterEnabled}
                    onChange={handleToggleFilter}
                  />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              
              {user.settings.moodFilterEnabled && (
                <div>
                  <p className="font-medium mb-2">Filter strength</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map((strength) => (
                      <button
                        key={strength}
                        className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          user.settings.moodFilterStrength === strength
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
          </div>
          
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-5 w-5" />
              <h2 className="text-xl font-medium">Display</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5" />
              <h2 className="text-xl font-medium">Privacy</h2>
            </div>
            
            <div className="space-y-4">
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
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Content analytics</p>
                  <p className="text-sm text-muted-foreground">Allow app to analyze content</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
