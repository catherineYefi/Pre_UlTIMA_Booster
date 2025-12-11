// ============================================
// PRE-ULTIMA BOOSTER — Card Component
// ============================================

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'premium';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick
}) => {
  const baseStyles = `
    rounded-2xl border border-[var(--border-subtle)]
    transition-all duration-300
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const variantStyles = {
    default: `
      bg-[var(--bg-card)] backdrop-blur-lg
      hover:border-[var(--border-accent)]
    `,
    elevated: `
      bg-[var(--bg-elevated)] shadow-xl
      hover:shadow-2xl hover:translate-y-[-2px]
    `,
    premium: `
      glass-effect premium-glow
      hover:scale-[1.02]
    `
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
