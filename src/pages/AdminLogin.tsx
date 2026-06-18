import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { PLACEHOLDER_IMAGES } from '../data/weddingData';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  // Redirect if already logged in
  if (localStorage.getItem('admin_auth') === 'true') {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@everafter.com';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin2026';

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl font-sans text-sm bg-white/5 border border-white/20
    focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-200
    text-ivory-100 placeholder-white/30`;

  return (
    <div className="min-h-screen bg-obsidian relative flex items-center justify-center px-4">
      <img
        src={PLACEHOLDER_IMAGES.hero}
        alt="Wedding"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-obsidian/80" />

      <motion.div
        className="relative z-10 glass-card p-8 md:p-10 w-full max-w-md"
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.6 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-script text-4xl gold-text block mb-1">Ever After</span>
          <p className="font-sans text-xs tracking-widest uppercase text-gold-500/70">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@everafter.com"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1.5">Password</label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold-400 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              className="text-red-400 font-sans text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            id="admin-login-submit"
            className="gold-btn-solid w-full py-3 mt-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In to Dashboard
          </motion.button>
        </form>

        <p className="text-center font-sans text-xs text-white/20 mt-6">
          Ever After Wedding Admin · Secure Access
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
