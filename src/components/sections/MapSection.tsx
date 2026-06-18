import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Copy } from 'lucide-react';
import { WEDDING } from '../../data/weddingData';
import SectionTitle from '../ui/SectionTitle';
import { useTheme } from '../../context/ThemeContext';
import { copyToClipboard } from '../../lib/utils';
import toast from 'react-hot-toast';

interface MapSectionProps { id?: string; }

const MAPS_EMBED_URL =
  import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ||
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467068369!2d79.8612!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25919f3a4a8ad%3A0x2db4e830a1e6da13!2sColombo%2007%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890';

const MapSection: React.FC<MapSectionProps> = ({ id = 'map' }) => {
  const { theme } = useTheme();

  const handleCopy = async () => {
    await copyToClipboard(WEDDING.ceremony.address);
    toast.success('Address copied to clipboard!');
  };

  return (
    <section id={id} className={`section-padding ${theme.bg} ${theme.text}`}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle eyebrow="FIND US" title="Venue Location" />

        {/* Map */}
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-gold-500/30 mb-6"
          style={{ boxShadow: '0 0 40px rgba(212,175,55,0.1)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="450"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location"
          />
        </motion.div>

        {/* Address card */}
        <motion.div
          className={`${theme.cardBg} rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-display text-lg">{WEDDING.ceremony.venue}</p>
              <p className="font-sans text-sm opacity-70">{WEDDING.ceremony.address}</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={WEDDING.ceremony.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="gold-btn-solid text-xs px-4 py-2 flex items-center gap-2"
            >
              <ExternalLink size={12} />
              Get Directions
            </a>
            <button
              onClick={handleCopy}
              className="gold-btn text-xs px-4 py-2 flex items-center gap-2"
            >
              <Copy size={12} />
              Copy Address
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
