import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiEffectProps {
  active: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active }) => {
  const [show, setShow] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!show) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      colors={['#d4af37', '#f5e07a', '#ffffff', '#fcd34d', '#fbbf24', '#b8960c']}
      numberOfPieces={200}
      gravity={0.2}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
    />
  );
};

export default ConfettiEffect;
