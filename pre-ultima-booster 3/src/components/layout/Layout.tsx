// ============================================
// PRE-ULTIMA BOOSTER — Layout Components
// ============================================

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Target,
  Sparkles
} from 'lucide-react';
import { ToggleTheme } from '../ui/ToggleTheme';

// ============================================
// Header Component
// ============================================

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg)] backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--text)] leading-none">
                PRE-ULTIMA BOOSTER
              </h1>
              <p className="text-xs text-[var(--muted)]">Sochi Track</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};

// ============================================
// Sidebar Component
// ============================================

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />
  },
  {
    path: '/product',
    label: 'Product Lab',
    icon: <Package size={20} />
  },
  {
    path: '/economy',
    label: 'Economy Lab',
    icon: <TrendingUp size={20} />
  },
  {
    path: '/strategy',
    label: 'Strategy Lab',
    icon: <Target size={20} />
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen border-r border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                font-medium transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] text-white shadow-lg'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-card)]'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="mt-12 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Этот инструмент готовит вас к Start-СС.<br/>
          Все данные хранятся локально в вашем браузере.
        </p>
      </div>
    </aside>
  );
};

// ============================================
// PageContainer Component
// ============================================

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle
}) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-8 section-fade-in">
            {title && (
              <h2 className="text-4xl font-bold gradient-text mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[var(--text-secondary)] text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
