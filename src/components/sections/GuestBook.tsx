import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import type { GuestBookEntry } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import { useTheme } from '../../context/ThemeContext';
import { formatRelativeDate } from '../../lib/utils';

interface GuestBookProps { id?: string; }

const GuestBook: React.FC<GuestBookProps> = ({ id = 'guestbook' }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<GuestBookEntry[]>([]);
  const [visible, setVisible] = useState(12);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setMessages(data as GuestBookEntry[]);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in your name and message.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('guestbook').insert([{ author_name: name, message }]);
    if (error) {
      toast.error('Could not submit. Please try again.');
    } else {
      toast.success('Your message was added to the guestbook! 💌');
      setName('');
      setMessage('');
      await fetchMessages();
    }
    setLoading(false);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl font-sans text-sm bg-white/10 border border-white/20
    focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 placeholder-white/30 ${theme.text}`;

  return (
    <section id={id} className={`section-padding ${theme.bg} ${theme.text}`}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          eyebrow="WISHES"
          title="Guest Book"
          subtitle="Leave your love and wishes for the couple"
        />

        {/* Submission form */}
        <motion.form
          onSubmit={handleSubmit}
          className={`${theme.cardBg} rounded-2xl p-6 mb-10 max-w-xl mx-auto`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <input
            id="guestbook-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className={`${inputClass} mb-3`}
          />
          <textarea
            id="guestbook-message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write your heartfelt wishes..."
            rows={3}
            className={`${inputClass} resize-none mb-3`}
          />
          <motion.button
            type="submit"
            id="guestbook-submit"
            disabled={loading}
            className="gold-btn-solid w-full py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Sending...' : 'Share Your Wishes ✨'}
          </motion.button>
        </motion.form>

        {/* Messages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {messages.slice(0, visible).map((entry, i) => (
              <motion.div
                key={entry.id}
                className={`${theme.cardBg} rounded-2xl p-6 relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Quote size={36} className="text-gold-500/10 absolute top-3 right-3" />
                <p className="font-serif italic text-sm leading-relaxed mb-4 relative z-10">
                  "{entry.message}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-xs font-semibold text-gold-500">{entry.author_name}</p>
                  <p className="font-sans text-xs opacity-40">{formatRelativeDate(entry.created_at)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visible < messages.length && (
          <motion.div className="text-center mt-8" whileHover={{ scale: 1.02 }}>
            <button
              id="guestbook-load-more"
              onClick={() => setVisible(v => v + 12)}
              className="gold-btn"
            >
              Load More Messages
            </button>
          </motion.div>
        )}

        {messages.length === 0 && (
          <p className="text-center font-sans text-sm opacity-40 mt-4">Be the first to leave a message!</p>
        )}
      </div>
    </section>
  );
};

export default GuestBook;
