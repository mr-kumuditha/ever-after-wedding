import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`glass-card p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
