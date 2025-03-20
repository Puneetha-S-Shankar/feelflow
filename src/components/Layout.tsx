
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import SettingsModal from './SettingsModal';
import { User } from '@/lib/types';

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
  updateUser?: (user: Partial<User>) => void;
}

const Layout = ({ children, user, updateUser }: LayoutProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettingsModal = () => {
    setSettingsOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header user={user} toggleSettingsModal={toggleSettingsModal} />
      
      <main className="pt-16 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto px-4 py-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <AnimatePresence>
        {settingsOpen && (
          <SettingsModal 
            isOpen={settingsOpen} 
            onClose={() => setSettingsOpen(false)} 
            user={user}
            updateUser={updateUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
