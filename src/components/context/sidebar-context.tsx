'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true); // Default state

  // Load saved state from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem('sidebarOpen');
    if (saved !== null) {
      setIsOpen(JSON.parse(saved));
    }
  }, []);

  // Toggle function that also saves to localStorage
  const toggle = () => {
    setIsOpen(prev => {
      const newValue = !prev;
      localStorage.setItem('sidebarOpen', JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to use the sidebar context
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}