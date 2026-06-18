import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WEDDING } from '../../data/weddingData';

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: 'Days' },
    { value: 0, label: 'Hours' },
    { value: 0, label: 'Minutes' },
    { value: 0, label: 'Seconds' },
  ]);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = WEDDING.date.getTime();
      const diff = target - now;

      if (diff <= 0) {
        setIsOver(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft([
        { value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Minutes' },
        { value: seconds, label: 'Seconds' },
      ]);
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isOver) {
    return (
      <motion.div
        className="text-center py-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="font-script text-4xl gold-text">The Day Has Come! 🎉</p>
      </motion.div>
    );
  }

  return (
    <div className="flex gap-3 md:gap-4 justify-center">
      {timeLeft.map((unit, idx) => (
        <motion.div
          key={unit.label}
          className="glass-card px-4 py-3 md:px-6 md:py-4 text-center min-w-[70px] md:min-w-[90px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="gold-text font-display text-2xl md:text-4xl font-bold leading-none">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gold-400 mt-1">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
