import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { Guest } from '../types';
import { PLACEHOLDER_IMAGES, WEDDING } from '../data/weddingData';
import RSVP from '../components/sections/RSVP';
import QRCodeCard from '../components/ui/QRCodeCard';
import Footer from '../components/layout/Footer';
import { copyToClipboard } from '../lib/utils';

const PersonalInvite: React.FC = () => {
  const { guestCode } = useParams<{ guestCode: string }>();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!guestCode) return;

    const fetchGuest = async () => {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('guest_code', guestCode.toUpperCase())
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setGuest(data as Guest);
        // Increment view count
        await supabase
          .from('guests')
          .update({ invitation_views: (data.invitation_views || 0) + 1 })
          .eq('guest_code', guestCode.toUpperCase());
      }
      setLoading(false);
    };

    fetchGuest();
  }, [guestCode]);

  useEffect(() => {
    if (guest) {
      document.title = `Your Invitation — Ever After | ${guest.full_name}`;
    }
  }, [guest]);

  const handleShare = async () => {
    await copyToClipboard(window.location.href);
    toast.success('Invitation link copied! 🎉');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-xs tracking-widest uppercase text-gold-500">Loading Invitation...</p>
        </div>
      </div>
    );
  }

  if (notFound || !guest) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">💌</div>
          <span className="font-script text-5xl gold-text block mb-4">Ever After</span>
          <h1 className="font-display text-2xl text-white mb-3">Invitation Not Found</h1>
          <p className="font-sans text-sm text-ivory-300/60 mb-6">
            We couldn't find an invitation for the code <strong className="text-gold-400">"{guestCode}"</strong>.
            Please double-check your invitation link or contact the couple.
          </p>
          <div className="glass-card p-4 rounded-xl">
            <p className="font-sans text-xs text-ivory-200/60">
              📧 oshani@everafter.lk · ransala@everafter.lk
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-ivory-100">
      {/* Hero */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={PLACEHOLDER_IMAGES.hero}
          alt="Wedding"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="font-script text-5xl gold-text block mb-2">Ever After</span>
          </motion.div>
          <motion.p
            className="font-sans text-xs tracking-[0.3em] uppercase text-gold-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You are cordially invited
          </motion.p>
          <motion.h1
            className="font-display text-3xl md:text-5xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Dear {guest.full_name},
          </motion.h1>
          <motion.p
            className="font-serif italic text-xl text-ivory-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            We joyfully request your presence at our wedding celebration.
          </motion.p>

          {/* Share button */}
          <motion.button
            onClick={handleShare}
            className="gold-btn flex items-center gap-2 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Share2 size={14} />
            Share This Invitation
          </motion.button>
        </div>
      </div>

      {/* Wedding Details */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        <motion.div
          className="glass-card p-6 rounded-2xl grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-gold-500 mb-1">Ceremony</p>
            <p className="font-display text-xl">{WEDDING.ceremony.venue}</p>
            <p className="font-sans text-sm text-gold-400">{WEDDING.ceremony.time}</p>
            <p className="font-sans text-xs opacity-60 mt-1">{WEDDING.ceremony.address}</p>
          </div>
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-gold-500 mb-1">Reception</p>
            <p className="font-display text-xl">{WEDDING.reception.venue}</p>
            <p className="font-sans text-sm text-gold-400">{WEDDING.reception.time}</p>
            <p className="font-sans text-xs opacity-60 mt-1">{WEDDING.reception.address}</p>
          </div>
          <div className="md:col-span-2 border-t border-white/10 pt-4">
            <p className="font-sans text-xs tracking-widest uppercase text-gold-500 mb-1">Date</p>
            <p className="font-display text-xl">{WEDDING.dayDisplay}, {WEDDING.dateDisplay}</p>
            <p className="font-sans text-xs text-gold-400 mt-1">Dress Code: {WEDDING.ceremony.dressCode}</p>
          </div>
        </motion.div>
      </div>

      {/* RSVP */}
      <RSVP
        id="rsvp"
        guestCode={guest.guest_code}
        guestId={guest.id}
        prefillName={guest.full_name}
      />

      {/* QR Code */}
      <div className="py-12 px-4">
        <div className="text-center mb-6">
          <p className="font-display text-2xl text-white">Your Personal QR Code</p>
          <p className="font-sans text-xs text-ivory-300/60 mt-1">Save or share this QR code to access your invitation</p>
        </div>
        {guestCode && <QRCodeCard guestCode={guestCode} />}
      </div>

      <Footer />
    </div>
  );
};

export default PersonalInvite;
