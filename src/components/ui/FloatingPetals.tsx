import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  color: string;
  shape: string;
}

const FloatingPetals: React.FC = () => {
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${8 + Math.random() * 12}px`,
      duration: `${8 + Math.random() * 10}s`,
      delay: `${Math.random() * 8}s`,
      color: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#fcd34d' : '#fce4ec',
      shape: i % 2 === 0 ? '50% 50% 50% 0' : '50% 0 50% 50%',
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            backgroundColor: petal.color,
            borderRadius: petal.shape,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
