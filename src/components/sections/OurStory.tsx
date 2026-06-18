import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TIMELINE } from '../../data/weddingData';
import SectionTitle from '../ui/SectionTitle';
import { useTheme } from '../../context/ThemeContext';

interface OurStoryProps {
  id?: string;
}

const TimelineCard: React.FC<{ event: typeof TIMELINE[0]; index: number }> = ({ event, index }) => {
  const { theme } = useTheme();
  const isLeft = index % 2 === 0;
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div ref={ref} className={`flex items-center gap-4 md:gap-8 mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
      {/* Card */}
      <motion.div
        className={`flex-1 ${theme.cardBg} rounded-2xl p-6 relative`}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1 }}
      >
        {/* Date badge */}
        <span className="inline-block px-3 py-1 bg-gold-gradient text-obsidian text-xs font-sans font-semibold tracking-widest uppercase rounded-full mb-3">
          {event.date}
        </span>

        {/* Emoji */}
        <div className="text-5xl mb-3">{event.emoji}</div>

        {/* Title */}
        <h3 className="font-display text-2xl mb-2">{event.title}</h3>

        {/* Description */}
        <p className="font-sans text-sm leading-relaxed opacity-75">{event.description}</p>

        {/* Image */}
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover rounded-xl mt-4"
            loading="lazy"
          />
        )}
      </motion.div>

      {/* Center dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-5 h-5 rounded-full border-2 border-gold-500 bg-obsidian flex-shrink-0 relative z-10"
          animate={inView ? { boxShadow: ['0 0 0 0 rgba(212,175,55,0)', '0 0 0 8px rgba(212,175,55,0)'] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="absolute inset-1 rounded-full bg-gold-500" />
        </motion.div>
      </div>

      {/* Spacer on alternating side */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const OurStory: React.FC<OurStoryProps> = ({ id = 'story' }) => {
  const { theme } = useTheme();

  return (
    <section id={id} className={`section-padding ${theme.bg} ${theme.text} relative`}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          eyebrow="OUR JOURNEY"
          title="Our Story"
          subtitle="How two hearts found their way to each other"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent -translate-x-1/2" />

          {TIMELINE.map((event, i) => (
            <TimelineCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
