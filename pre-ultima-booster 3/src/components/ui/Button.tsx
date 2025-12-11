// ============================================
// PRE-ULTIMA BOOSTER — Button Component
// ============================================

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = `
    font-medium rounded-full transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)]
      text-white hover:shadow-lg hover:scale-105
      focus:ring-[var(--accent)]
    `,
    secondary: `
      bg-[var(--bg-elevated)] border border-[var(--border-subtle)]
      text-[var(--text)] hover:border-[var(--accent)]
      focus:ring-[var(--accent)]
    `,
    ghost: `
      bg-transparent text-[var(--text-secondary)]
      hover:text-[var(--text)] hover:bg-[var(--bg-elevated)]
      focus:ring-[var(--accent)]
    `,
    danger: `
      bg-[var(--error)] text-white
      hover:bg-opacity-90 hover:shadow-lg
      focus:ring-[var(--error)]
    `
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
