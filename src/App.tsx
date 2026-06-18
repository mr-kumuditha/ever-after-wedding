import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import PersonalInvite from './pages/PersonalInvite';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LoadingScreen from './components/layout/LoadingScreen';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invite/:guestCode" element={<PersonalInvite />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#d4af37',
            border: '1px solid rgba(212,175,55,0.3)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '13px',
          },
        }}
      />
    </ThemeProvider>
  );
}
