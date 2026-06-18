import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Church, Star, Shirt, MapPin, ExternalLink } from 'lucide-react';
import { WEDDING } from '../../data/weddingData';
import SectionTitle from '../ui/SectionTitle';
import { useTheme } from '../../context/ThemeContext';

interface WeddingDetailsProps { id?: string; }

const WeddingDetails: React.FC<WeddingDetailsProps> = ({ id = 'details' }) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const cardClass = `${theme.cardBg} rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-gold-500/50`;

  return (
    <section id={id} className={`section-padding ${theme.bg} ${theme.text}`}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle eyebrow="JOIN US" title="Wedding Details" />

        <div ref={ref} className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Ceremony */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Church size={20} className="text-gold-500" />
              </div>
              <span className="font-sans text-xs tracking-widest uppercase text-gold-500">Ceremony</span>
            </div>
            <h3 className="font-display text-2xl mb-1">{WEDDING.ceremony.venue}</h3>
            <p className="text-gold-500 font-sans text-sm font-medium mb-2">{WEDDING.ceremony.time}</p>
            <p className="font-sans text-sm opacity-70 mb-4 flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 text-gold-500 flex-shrink-0" />
              {WEDDING.ceremony.address}
            </p>
            <a
              href={WEDDING.ceremony.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 gold-btn text-xs px-4 py-2"
            >
              <ExternalLink size={12} />
              View on Maps
            </a>
          </motion.div>

          {/* Reception */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Star size={20} className="text-gold-500" />
              </div>
              <span className="font-sans text-xs tracking-widest uppercase text-gold-500">Reception</span>
            </div>
            <h3 className="font-display text-2xl mb-1">{WEDDING.reception.venue}</h3>
            <p className="text-gold-500 font-sans text-sm font-medium mb-2">{WEDDING.reception.time}</p>
            <p className="font-sans text-sm opacity-70 flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 text-gold-500 flex-shrink-0" />
              {WEDDING.reception.address}
            </p>
            <p className="font-sans text-xs opacity-50 mt-4">
              Capacity: {WEDDING.reception.guestCapacity} guests · {WEDDING.reception.tableCount} tables
            </p>
          </motion.div>
        </div>

        {/* Dress Code */}
        <motion.div
          className={`${cardClass} flex items-center gap-6`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
            <Shirt size={22} className="text-gold-500" />
          </div>
          <div>
            <span className="font-sans text-xs tracking-widest uppercase text-gold-500">Dress Code</span>
            <h3 className="font-display text-2xl mt-0.5">{WEDDING.ceremony.dressCode}</h3>
            <p className="font-sans text-sm opacity-70 mt-1">
              Please dress in your finest formal or black-tie attire. Ladies — floor-length gowns encouraged. Gentlemen — tuxedos or dark formal suits preferred.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingDetails;
