// ============================================
// PRE-ULTIMA BOOSTER — Dashboard Page
// ============================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, Target, RotateCcw, ArrowRight } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import {
  getProductProgress,
  getEconomyProgress,
  getStrategyProgress,
  getTotalProgress
} from '../../../lib/progress';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { PageContainer } from '../../../components/layout/Layout';
import { resetBoosterState } from '../../../lib/storage';

// ============================================
// Lab Card Component
// ============================================

interface LabCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  onNavigate: () => void;
  color: string;
}

const LabCard: React.FC<LabCardProps> = ({
  title,
  description,
  icon,
  progress,
  onNavigate,
  color
}) => {
  return (
    <Card variant="premium" className="p-6 hover:scale-[1.02] transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          {icon}
        </div>
        <div className="text-2xl font-bold gradient-text">
          {Math.round(progress)}%
        </div>
      </div>

      <h3 className="text-xl font-bold text-[var(--text)] mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        {description}
      </p>

      <ProgressBar 
        value={progress} 
        showPercentage={false}
        size="md"
      />

      <Button
        variant="secondary"
        className="w-full mt-4"
        onClick={onNavigate}
      >
        Перейти
        <ArrowRight size={18} />
      </Button>
    </Card>
  );
};

// ============================================
// Dashboard Page
// ============================================

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, resetState } = useBooster();

  const productProgress = getProductProgress(state.product);
  const economyProgress = getEconomyProgress(state.economy);
  const strategyProgress = getStrategyProgress(state.strategy);
  const totalProgress = getTotalProgress(state.product, state.economy, state.strategy);

  const handleReset = () => {
    if (window.confirm('Вы уверены? Все данные будут удалены.')) {
      resetState();
      resetBoosterState();
    }
  };

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="text-center mb-12 section-fade-in">
        <div className="inline-block px-4 py-2 rounded-full bg-[var(--accent)] bg-opacity-10 text-[var(--accent)] text-sm font-medium mb-4">
          3 блока подготовки к Start-СС
        </div>
        
        <h1 className="text-5xl font-bold gradient-text mb-4">
          PRE-ULTIMA BOOSTER
        </h1>
        
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Подготовьтесь к стратегической сессии на качественно другом уровне.<br/>
          Дайте трекеру готовую базу для фокусировки.
        </p>
      </div>

      {/* Total Progress */}
      <Card variant="elevated" className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[var(--text)]">
            Общий прогресс
          </h3>
          <span className="text-3xl font-bold gradient-text">
            {Math.round(totalProgress)}%
          </span>
        </div>
        <ProgressBar 
          value={totalProgress}
          showPercentage={false}
          size="lg"
        />
      </Card>

      {/* Lab Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <LabCard
          title="Product Clarity Lab"
          description="Фокус продукта, УТП, офферы и продуктовый калькулятор"
          icon={<Package size={24} className="text-white" />}
          progress={productProgress}
          onNavigate={() => navigate('/product')}
          color="from-purple-500 to-pink-500"
        />

        <LabCard
          title="Economic Accuracy Lab"
          description="Мини-P&L и выбор ключевых рычагов роста"
          icon={<TrendingUp size={24} className="text-white" />}
          progress={economyProgress}
          onNavigate={() => navigate('/economy')}
          color="from-blue-500 to-cyan-500"
        />

        <LabCard
          title="Strategic Direction Lab"
          description="Честная точка А и черновик точки Б на 6 месяцев"
          icon={<Target size={24} className="text-white" />}
          progress={strategyProgress}
          onNavigate={() => navigate('/strategy')}
          color="from-green-500 to-emerald-500"
        />
      </div>

      {/* Instructions */}
      <Card variant="default" className="p-6 mb-8">
        <h3 className="text-lg font-bold text-[var(--text)] mb-3">
          📌 Как работать с инструментом
        </h3>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)] mt-1">•</span>
            <span>Заполняйте блоки последовательно: Product → Economy → Strategy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)] mt-1">•</span>
            <span>Все данные автоматически сохраняются в вашем браузере</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)] mt-1">•</span>
            <span>Используйте подсказки (💡) для лучшего понимания вопросов</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)] mt-1">•</span>
            <span>В конце каждого блока можно скопировать сводку для трекера</span>
          </li>
        </ul>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-[var(--error)]"
        >
          <RotateCcw size={18} />
          Сбросить всё
        </Button>
      </div>
    </PageContainer>
  );
};
