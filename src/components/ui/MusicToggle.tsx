import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, VolumeX } from 'lucide-react';

const MusicToggle: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Autoplay blocked — needs user interaction
      });
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/music/background.mp3" />
      <motion.button
        id="music-toggle"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center border border-gold-500/40 hover:border-gold-500 transition-all duration-300"
        style={{ backdropFilter: 'blur(12px)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isPlaying ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Music2 size={18} className="text-gold-500" />
          </motion.div>
        ) : (
          <VolumeX size={18} className="text-gold-400" />
        )}
      </motion.button>
    </>
  );
};

export default MusicToggle;
