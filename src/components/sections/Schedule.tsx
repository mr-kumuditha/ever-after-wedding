import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';
import { SCHEDULE } from '../../data/weddingData';
import SectionTitle from '../ui/SectionTitle';
import { useTheme } from '../../context/ThemeContext';

interface ScheduleProps { id?: string; }

const ScheduleItem: React.FC<{ item: typeof SCHEDULE[0]; index: number }> = ({ item, index }) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="flex gap-4 md:gap-8 items-start"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Time */}
      <div className="flex-shrink-0 w-20 md:w-24 text-right">
        <span className="inline-block px-2 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full font-sans text-xs text-gold-500 font-medium whitespace-nowrap">
          {item.time}
        </span>
      </div>

      {/* Line & dot */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-gold-500 border-2 border-gold-400 flex-shrink-0 mt-1.5" />
        {index < SCHEDULE.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-gold-500/50 to-transparent min-h-[40px] mt-1" />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 ${theme.cardBg} rounded-xl p-4 mb-4 hover:border-gold-500/40 transition-all duration-300`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <h3 className="font-display text-lg mb-0.5">{item.title}</h3>
            <p className="font-sans text-xs opacity-70 mb-1">{item.description}</p>
            {item.location && (
              <span className="inline-flex items-center gap-1 text-gold-500 font-sans text-xs">
                <MapPin size={10} />
                {item.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Schedule: React.FC<ScheduleProps> = ({ id = 'schedule' }) => {
  const { theme } = useTheme();

  return (
    <section id={id} className={`section-padding ${theme.bg} ${theme.text}`}>
      <div className="max-w-3xl mx-auto">
        <SectionTitle eyebrow="THE DAY" title="Wedding Schedule" />
        <div>
          {SCHEDULE.map((item, i) => (
            <ScheduleItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
