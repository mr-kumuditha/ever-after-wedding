import React from 'react';
import { motion } from 'framer-motion';
import { COUPLE, WEDDING } from '../../data/weddingData';
import GoldDivider from '../ui/GoldDivider';

const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-gold-500/30 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-5xl gold-text">Ever After</span>
        </motion.div>

        <GoldDivider className="my-6" />

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-display text-lg text-ivory-200">
            {COUPLE.bride.name} &amp; {COUPLE.groom.name}
          </p>
          <p className="font-sans text-sm text-gold-500/70 tracking-widest uppercase">
            {WEDDING.dayDisplay}, {WEDDING.dateDisplay}
          </p>
          <p className="font-sans text-sm text-ivory-300/60 mt-1">
            The Grand Pavilion, Colombo 03, Sri Lanka
          </p>
        </motion.div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-script text-2xl text-gold-400">{COUPLE.hashtag}</p>
        </motion.div>

        <GoldDivider className="mt-8 mb-4" />

        <motion.p
          className="font-sans text-xs text-ivory-400/40 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Made with ❤️ for a lifetime of love
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
