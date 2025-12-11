// ============================================
// PRE-ULTIMA BOOSTER — UI Components
// ============================================

import React, { useState } from 'react';
import { Info } from 'lucide-react';

// ============================================
// ProgressBar Component
// ============================================

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  size = 'md',
  variant = 'default'
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const variantColors = {
    default: 'from-[var(--accent)] to-[var(--accent-soft)]',
    success: 'from-green-500 to-emerald-400',
    warning: 'from-yellow-500 to-orange-400',
    error: 'from-red-500 to-pink-400'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-bold text-[var(--accent)]">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full bg-gradient-to-r ${variantColors[variant]} transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

// ============================================
// SectionTitle Component
// ============================================

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtitle,
  icon
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="text-[var(--accent)]">
            {icon}
          </div>
        )}
        <h3 className="text-2xl font-bold gradient-text">
          {children}
        </h3>
      </div>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-sm ml-9">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ============================================
// Hint Component
// ============================================

interface HintProps {
  children: React.ReactNode;
}

export const Hint: React.FC<HintProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:text-[var(--accent-soft)] transition-colors"
      >
        <Info size={14} />
        Подсказка
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-accent)] shadow-xl">
          <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {children}
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-xs text-[var(--accent)] hover:text-[var(--accent-soft)]"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================
// Badge Component
// ============================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'bg-[var(--accent)] bg-opacity-10 text-[var(--accent)]',
    success: 'bg-green-500 bg-opacity-10 text-green-500',
    warning: 'bg-yellow-500 bg-opacity-10 text-yellow-500',
    error: 'bg-red-500 bg-opacity-10 text-red-500'
  };

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
      ${variantStyles[variant]}
    `}>
      {children}
    </span>
  );
};
