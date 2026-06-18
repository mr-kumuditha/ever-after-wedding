import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import type { RSVPFormData } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import ConfettiEffect from '../ui/ConfettiEffect';
import { useTheme } from '../../context/ThemeContext';

interface RSVPProps {
  id?: string;
  guestCode?: string;
  guestId?: string;
  prefillName?: string;
}

const DIETARY_OPTIONS = ['None', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Other'];

const RSVP: React.FC<RSVPProps> = ({ id = 'rsvp', guestCode, guestId, prefillName }) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const storageKey = `rsvp_submitted_${guestCode || 'general'}`;
  const [alreadySubmitted] = useState(() => !!localStorage.getItem(storageKey));
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<RSVPFormData>({
    full_name: prefillName || '',
    email: '',
    phone: '',
    number_of_guests: 1,
    attendance_status: 'attending',
    dietary_requirements: 'None',
    message: '',
    guest_code: guestCode,
    guest_id: guestId,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.full_name.trim()) e.full_name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const { error } = await supabase.from('rsvp').insert([{
        guest_id: form.guest_id || null,
        guest_code: form.guest_code || null,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        number_of_guests: form.number_of_guests,
        attendance_status: form.attendance_status,
        dietary_requirements: form.dietary_requirements,
        message: form.message,
      }]);

      if (error) throw error;

      // Update guest rsvp_status if guestId is present
      if (guestId) {
        await supabase.from('guests').update({ rsvp_status: form.attendance_status }).eq('id', guestId);
      }

      localStorage.setItem(storageKey, 'true');
      if (form.attendance_status === 'attending') setConfetti(true);
      toast.success(
        form.attendance_status === 'attending'
          ? '🎉 We\'ll see you there! Your RSVP is confirmed.'
          : 'Thank you for letting us know. You will be missed!'
      );
      // "Already submitted" will show on re-render via storageKey
      window.location.reload();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl font-sans text-sm bg-white/10 border border-white/20
    focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-200
    placeholder-white/30 ${theme.text}`;

  if (alreadySubmitted) {
    return (
      <section id={id} className={`section-padding ${theme.bg} ${theme.text}`}>
        <div className="max-w-2xl mx-auto text-center">
          <SectionTitle eyebrow="RSVP" title="You're All Set!" />
          <motion.div
            className={`${theme.cardBg} rounded-2xl p-10`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">💍</div>
            <p className="font-display text-2xl mb-3">Thank You!</p>
            <p className="font-sans text-sm opacity-70">You have already submitted your RSVP. We look forward to celebrating with you!</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`section-padding ${theme.bg} ${theme.text}`}>
      <ConfettiEffect active={confetti} />
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          eyebrow="CELEBRATE WITH US"
          title="RSVP"
          subtitle="Kindly respond by September 6, 2026"
        />

        <motion.form
          ref={ref}
          onSubmit={handleSubmit}
          className={`${theme.cardBg} rounded-2xl p-6 md:p-8 space-y-5`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Full Name */}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Full Name *</label>
            <input
              id="rsvp-name"
              type="text"
              value={form.full_name}
              onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
              placeholder="Your full name"
              className={inputClass}
            />
            {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Email *</label>
            <input
              id="rsvp-email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              className={inputClass}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Mobile Number</label>
            <input
              id="rsvp-phone"
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="+94 77 123 4567"
              className={inputClass}
            />
          </div>

          {/* Guests + Dietary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Number of Guests</label>
              <select
                id="rsvp-guests"
                value={form.number_of_guests}
                onChange={e => setForm(f => ({ ...f, number_of_guests: Number(e.target.value) }))}
                className={inputClass}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Dietary Requirements</label>
              <select
                id="rsvp-dietary"
                value={form.dietary_requirements}
                onChange={e => setForm(f => ({ ...f, dietary_requirements: e.target.value }))}
                className={inputClass}
              >
                {DIETARY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Attendance */}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-2">Attendance Status *</label>
            <div className="flex gap-4">
              {(['attending', 'not_attending'] as const).map(status => (
                <label
                  key={status}
                  id={`rsvp-status-${status}`}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all duration-200 font-sans text-sm ${
                    form.attendance_status === status
                      ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                      : 'border-white/20 opacity-60 hover:opacity-80'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={status}
                    checked={form.attendance_status === status}
                    onChange={() => setForm(f => ({ ...f, attendance_status: status }))}
                    className="sr-only"
                  />
                  <span>{status === 'attending' ? '✓ Attending' : '✗ Not Attending'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Message for the Couple</label>
            <textarea
              id="rsvp-message"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Share your wishes or a special note..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            id="rsvp-submit"
            disabled={loading}
            className="gold-btn-solid w-full py-4 shimmer relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Sending...' : 'Send RSVP'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVP;
