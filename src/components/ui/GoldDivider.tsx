import React from 'react';

interface GoldDividerProps {
  className?: string;
}

const GoldDivider: React.FC<GoldDividerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-6 ${className}`}>
      <div className="h-px flex-1 max-w-24 bg-gold-gradient" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold-500">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#d4af37" />
      </svg>
      <div className="h-px flex-1 max-w-24 bg-gold-gradient" />
    </div>
  );
};

export default GoldDivider;
