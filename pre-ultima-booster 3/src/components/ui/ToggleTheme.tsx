// ============================================
// PRE-ULTIMA BOOSTER — Theme & Copy Components
// ============================================

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Copy, Check } from 'lucide-react';
import { Button } from './Button';

// ============================================
// ToggleTheme Component
// ============================================

export const ToggleTheme: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('booster-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme === 'light' ? 'theme-light' : '';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('booster-theme', newTheme);
    document.documentElement.className = newTheme === 'light' ? 'theme-light' : '';
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-[var(--accent)]" />
      ) : (
        <Moon size={20} className="text-[var(--accent)]" />
      )}
    </button>
  );
};

// ============================================
// CopySummaryButton Component
// ============================================

interface CopySummaryButtonProps {
  getSummaryText: () => string;
  label?: string;
  variant?: 'primary' | 'secondary';
}

export const CopySummaryButton: React.FC<CopySummaryButtonProps> = ({
  getSummaryText,
  label = 'Скопировать сводку',
  variant = 'secondary'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = getSummaryText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleCopy}
      className={copied ? 'bg-[var(--success)] hover:bg-[var(--success)]' : ''}
    >
      {copied ? (
        <>
          <Check size={18} />
          Скопировано!
        </>
      ) : (
        <>
          <Copy size={18} />
          {label}
        </>
      )}
    </Button>
  );
};

// ============================================
// Toast Notification (optional)
// ============================================

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: 'bg-[var(--success)]',
    error: 'bg-[var(--error)]',
    info: 'bg-[var(--accent)]'
  };

  return (
    <div className={`
      fixed bottom-6 right-6 z-50
      px-6 py-4 rounded-xl shadow-2xl
      text-white font-medium
      animate-fade-in-up
      ${typeStyles[type]}
    `}>
      {message}
    </div>
  );
};
