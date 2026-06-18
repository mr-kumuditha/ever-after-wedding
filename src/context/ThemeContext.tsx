import React, { createContext, useContext, useState } from 'react';
import type { Theme, ThemeConfig } from '../types';

const THEMES: Record<Theme, ThemeConfig> = {
  'white-gold': {
    id: 'white-gold',
    name: 'White & Gold',
    bg: 'bg-ivory-100',
    text: 'text-charcoal',
    accent: 'text-gold-500',
    cardBg: 'bg-white/80 backdrop-blur-md border border-gold-200',
    navBg: 'bg-white/90 backdrop-blur-xl',
    heroBg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
  },
  'black-gold': {
    id: 'black-gold',
    name: 'Black & Gold',
    bg: 'bg-obsidian',
    text: 'text-ivory-100',
    accent: 'text-gold-400',
    cardBg: 'bg-white/5 backdrop-blur-md border border-gold-500/20',
    navBg: 'bg-black/80 backdrop-blur-xl',
    heroBg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
  },
  'floral': {
    id: 'floral',
    name: 'Floral Luxury',
    bg: 'bg-rose-50',
    text: 'text-rose-950',
    accent: 'text-rose-500',
    cardBg: 'bg-white/70 backdrop-blur-md border border-rose-200',
    navBg: 'bg-white/90 backdrop-blur-xl',
    heroBg: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=1920&q=80',
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (t: Theme) => void;
  themes: typeof THEMES;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES['white-gold'],
  setTheme: () => {},
  themes: THEMES,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [current, setCurrent] = useState<Theme>('white-gold');
  return (
    <ThemeContext.Provider value={{ theme: THEMES[current], setTheme: setCurrent, themes: THEMES }}>
      <div className={current === 'black-gold' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
