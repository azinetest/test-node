
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type PrimaryColor = 'blue' | 'purple' | 'green' | 'orange' | 'red';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  primaryColor: PrimaryColor;
  setPrimaryColor: (color: PrimaryColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [primaryColor, setPrimaryColorState] = useState<PrimaryColor>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColor = localStorage.getItem('primaryColor') as PrimaryColor;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setPrimaryColorState(savedColor);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const colorMap = {
      blue: { primary: '221.2 83.2% 53.3%', primaryForeground: '210 40% 98%' },
      purple: { primary: '262.1 83.3% 57.8%', primaryForeground: '210 40% 98%' },
      green: { primary: '142.1 76.2% 36.3%', primaryForeground: '355.7 100% 97.3%' },
      orange: { primary: '24.6 95% 53.1%', primaryForeground: '60 9.1% 97.8%' },
      red: { primary: '346.8 77.2% 49.8%', primaryForeground: '355.7 100% 97.3%' },
    };

    const colors = colorMap[primaryColor];
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
    
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setPrimaryColor = (color: PrimaryColor) => {
    setPrimaryColorState(color);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    primaryColor,
    setPrimaryColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
