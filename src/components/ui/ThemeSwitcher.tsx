import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import type { Theme } from '../../types';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const swatches: { id: Theme; color: string; label: string }[] = [
    { id: 'white-gold', color: '#f5f5f0', label: 'White & Gold' },
    { id: 'black-gold', color: '#1a1a1a', label: 'Black & Gold' },
    { id: 'floral', color: '#fce4ec', label: 'Floral Luxury' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 group">
      {swatches.map((swatch, idx) => (
        <motion.button
          key={swatch.id}
          id={`theme-swatch-${swatch.id}`}
          onClick={() => setTheme(swatch.id)}
          className="relative w-9 h-9 rounded-full border-2 shadow-lg transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: swatch.color,
            borderColor: theme.id === swatch.id ? '#d4af37' : 'rgba(212,175,55,0.3)',
            boxShadow: theme.id === swatch.id ? '0 0 12px rgba(212,175,55,0.6)' : undefined,
          }}
          title={swatch.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme.id === swatch.id && (
            <span className="absolute inset-0 flex items-center justify-center text-gold-500 text-xs">✓</span>
          )}
          <span className="sr-only">{swatch.label}</span>
        </motion.button>
      ))}
      <span className="text-[10px] font-sans tracking-widest uppercase text-gold-500/70 text-center mt-1">
        Theme
      </span>
    </div>
  );
};

export default ThemeSwitcher;
