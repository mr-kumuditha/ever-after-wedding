import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { GALLERY_IMAGES } from '../../data/weddingData';
import SectionTitle from '../ui/SectionTitle';
import { useTheme } from '../../context/ThemeContext';

interface GalleryProps { id?: string; }

const CATEGORIES = ['All', 'Engagement', 'Family', 'Venue'];

const GalleryImage: React.FC<{ src: string; alt: string; index: number; onClick: () => void }> = ({
  src, alt, index, onClick,
}) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl" />
      <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-gold-500/60 rounded-xl transition-all duration-300" />
    </motion.div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ id = 'gallery' }) => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = GALLERY_IMAGES.filter(
    img => activeCategory === 'All' || img.category === activeCategory
  );

  const slides = GALLERY_IMAGES.map(img => ({ src: img.src, alt: img.alt }));

  return (
    <section id={id} className={`section-padding ${theme.bg} ${theme.text}`}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="MEMORIES" title="Photo Gallery" />

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-obsidian font-semibold shadow-lg shadow-gold-500/20'
                  : `border border-gold-500/30 ${theme.text} hover:border-gold-500`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((img, i) => {
              const originalIndex = GALLERY_IMAGES.findIndex(g => g.src === img.src);
              return (
                <GalleryImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  index={i}
                  onClick={() => setLightboxIndex(originalIndex)}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          slides={slides}
          index={lightboxIndex}
        />
      </div>
    </section>
  );
};

export default Gallery;
