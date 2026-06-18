import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PLACEHOLDER_IMAGES, WEDDING, COUPLE } from '../../data/weddingData';
import CountdownTimer from '../ui/CountdownTimer';
import FloatingPetals from '../ui/FloatingPetals';

interface HeroProps {
  id?: string;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

const Hero: React.FC<HeroProps> = ({ id = 'home' }) => {
  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src={PLACEHOLDER_IMAGES.hero}
        alt="Wedding venue"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Floating petals */}
      <FloatingPetals />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Ornamental line */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          {...fadeUp(0)}
        >
          <div className="h-px w-16 bg-gold-gradient" />
          <svg width="12" height="12" viewBox="0 0 16 16" fill="#d4af37">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
          </svg>
          <div className="h-px w-16 bg-gold-gradient" />
        </motion.div>

        {/* Script title */}
        <motion.h1
          className="font-script text-6xl md:text-8xl gold-text mb-4 leading-none"
          {...fadeUp(0.2)}
        >
          Together Forever
        </motion.h1>

        {/* Couple names */}
        <motion.p
          className="font-display text-xl md:text-3xl text-white tracking-[0.25em] uppercase mb-4"
          {...fadeUp(0.5)}
        >
          {COUPLE.bride.name} &amp; {COUPLE.groom.name}
        </motion.p>

        {/* Gold HR */}
        <motion.div className="flex justify-center mb-4" {...fadeUp(0.7)}>
          <div className="h-px w-32 bg-gold-gradient" />
        </motion.div>

        {/* Date */}
        <motion.p
          className="font-sans font-light text-ivory-100 text-base md:text-lg tracking-widest mb-1"
          {...fadeUp(0.8)}
        >
          {WEDDING.dayDisplay}, {WEDDING.dateDisplay}
        </motion.p>

        {/* Venue */}
        <motion.p
          className="font-sans font-light text-gold-300 text-sm md:text-base tracking-wide mb-8"
          {...fadeUp(0.9)}
        >
          {WEDDING.ceremony.venue}, Colombo
        </motion.p>

        {/* Countdown */}
        <motion.div className="mb-8" {...fadeUp(1.1)}>
          <CountdownTimer />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="gold-btn animate-pulse-gold"
          onClick={scrollToStory}
          {...fadeUp(1.3)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Invitation
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default Hero;
