import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import MusicToggle from '../ui/MusicToggle';

const NAV_LINKS = [
  { label: 'Our Story', href: '#story' },
  { label: 'Details', href: '#details' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Guestbook', href: '#guestbook' },
];

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll spy
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? theme.navBg + ' shadow-lg shadow-black/10' : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); scrollTo('#home'); }}
            className="font-script text-3xl gold-text hover:opacity-80 transition-opacity"
          >
            Ever After
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <button
                    id={`nav-${sectionId}`}
                    onClick={() => scrollTo(link.href)}
                    className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 relative pb-1 ${
                      isActive ? 'text-gold-500' : (scrolled ? theme.text : 'text-white')
                    } hover:text-gold-400`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-gold-gradient"
                        layoutId="nav-underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden text-white hover:text-gold-400 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={`md:hidden ${theme.navBg} border-t border-gold-500/20`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col py-4 px-6 gap-4">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`font-sans text-sm tracking-widest uppercase ${theme.text} hover:text-gold-500 transition-colors w-full text-left py-2`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Fixed floating widgets */}
      <ThemeSwitcher />
      <MusicToggle />
    </>
  );
};

export default Navbar;
