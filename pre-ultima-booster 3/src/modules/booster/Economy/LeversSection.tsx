// ============================================
// PRE-ULTIMA BOOSTER — Growth Levers Section
// ============================================

import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { Textarea } from '../../../components/ui/Input';
import { SectionTitle } from '../../../components/ui/ProgressBar';
import { LeverArea } from '../../../lib/types';

const LEVER_AREAS: { value: LeverArea; label: string }[] = [
  { value: 'marketing', label: 'Маркетинг' },
  { value: 'sales', label: 'Продажи' },
  { value: 'product', label: 'Продукт' },
  { value: 'team', label: 'Команда' },
  { value: 'finance', label: 'Финансы' },
  { value: 'ops', label: 'Операционка' }
];

interface LeverCardProps {
  index: number;
  area: LeverArea;
  problem: string;
  hypothesis: string;
  expectedEffect: string;
  onUpdate: (field: string, value: any) => void;
}

const LeverCard: React.FC<LeverCardProps> = ({
  index,
  area,
  problem,
  hypothesis,
  expectedEffect,
  onUpdate
}) => {
  return (
    <Card variant="elevated" className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] flex items-center justify-center">
          <span className="text-white font-bold text-sm">{index + 1}</span>
        </div>
        <h4 className="text-lg font-bold text-[var(--text)]">
          Рычаг роста #{index + 1}
        </h4>
      </div>

      <div className="space-y-4">
        {/* Area Selection */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Область
          </label>
          <select
            value={area}
            onChange={(e) => onUpdate('area', e.target.value as LeverArea)}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20 transition-all"
          >
            <option value="">Выберите область</option>
            {LEVER_AREAS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Problem */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            В чём проблема?
          </label>
          <Textarea
            value={problem}
            onChange={(e) => onUpdate('problem', e.target.value)}
            placeholder="Опишите конкретную проблему в этой области..."
            className="min-h-[100px]"
          />
        </div>

        {/* Hypothesis */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Гипотеза роста
          </label>
          <Textarea
            value={hypothesis}
            onChange={(e) => onUpdate('hypothesis', e.target.value)}
            placeholder="Что вы планируете сделать, чтобы решить проблему?"
            className="min-h-[100px]"
          />
        </div>

        {/* Expected Effect */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Ожидаемый эффект
          </label>
          <Textarea
            value={expectedEffect}
            onChange={(e) => onUpdate('expectedEffect', e.target.value)}
            placeholder="В деньгах, процентах или масштабе — что получите?"
            className="min-h-[80px]"
          />
        </div>
      </div>
    </Card>
  );
};

// ============================================
// Main Section Component
// ============================================

export const LeversSection: React.FC = () => {
  const { state, updateEconomy } = useBooster();

  const updateLever = (index: number, field: string, value: any) => {
    const newLevers = [...state.economy.mainLevers];
    newLevers[index] = { ...newLevers[index], [field]: value };
    updateEconomy({ mainLevers: newLevers });
  };

  const mainLever = state.economy.mainLevers[0];
  const hasPrimaryLever = mainLever.area && mainLever.hypothesis;

  return (
    <div>
      <SectionTitle icon={<Zap size={28} />}>
        3 рычага роста
      </SectionTitle>

      <div className="space-y-6">
        {state.economy.mainLevers.map((lever, index) => (
          <LeverCard
            key={index}
            index={index}
            area={lever.area}
            problem={lever.problem}
            hypothesis={lever.hypothesis}
            expectedEffect={lever.expectedEffect}
            onUpdate={(field, value) => updateLever(index, field, value)}
          />
        ))}

        {/* Auto Summary */}
        {hasPrimaryLever && (
          <Card variant="premium" className="p-5 bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-soft)]/10 border-[var(--accent)]/30">
            <div className="flex items-start gap-3">
              <TrendingUp size={24} className="text-[var(--accent)] flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-[var(--text)] mb-2">
                  Главный фокус на ближайшие месяцы
                </h5>
                <p className="text-sm text-[var(--text-secondary)]">
                  Мой главный рычаг — <strong>{LEVER_AREAS.find(a => a.value === mainLever.area)?.label}</strong>. 
                  На Start-СС хочу проверить гипотезу: <em>"{mainLever.hypothesis}"</em>.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
