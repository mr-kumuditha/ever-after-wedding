import React from 'react';
import { motion } from 'framer-motion';
import GoldDivider from './GoldDivider';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  subtitle,
  className = '',
  light = false,
}) => {
  return (
    <motion.div
      className={`text-center mb-12 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {eyebrow && (
        <p className={`font-sans text-xs tracking-[0.3em] uppercase mb-3 ${light ? 'text-gold-300' : 'text-gold-500'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-4xl md:text-5xl mb-2 ${light ? 'text-white' : ''}`}>
        {title}
      </h2>
      <GoldDivider />
      {subtitle && (
        <p className={`font-serif text-lg italic mt-2 ${light ? 'text-ivory-200' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
