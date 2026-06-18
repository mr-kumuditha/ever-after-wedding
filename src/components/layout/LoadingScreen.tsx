import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const letters = 'Ever After'.split('');

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated golden ring */}
      <motion.div className="relative mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#d4af37"
            strokeWidth="1.5"
            strokeDasharray="314"
            initial={{ strokeDashoffset: 314 }}
            animate={{ strokeDashoffset: 0, rotate: 360 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{ transformOrigin: '60px 60px' }}
          />
          <motion.circle
            cx="60"
            cy="60"
            r="42"
            fill="none"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: '60px 60px' }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="#d4af37">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Title: letter-by-letter */}
      <div className="flex overflow-hidden mb-3">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="font-script text-6xl md:text-7xl gold-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>

      {/* Couple names */}
      <motion.p
        className="font-display text-lg md:text-xl text-ivory-200 tracking-[0.2em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        OSHANI &amp; RANSALA
      </motion.p>

      {/* Thin gold line */}
      <motion.div
        className="w-24 h-px bg-gold-gradient mt-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      />

      <motion.p
        className="font-sans text-xs tracking-[0.3em] text-gold-500/60 uppercase mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        October 6, 2026
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
