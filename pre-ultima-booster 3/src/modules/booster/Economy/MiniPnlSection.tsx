// ============================================
// PRE-ULTIMA BOOSTER — Mini P&L Section
// ============================================

import React from 'react';
import { DollarSign, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { NumberInput } from '../../../components/ui/Input';
import { SectionTitle, Badge } from '../../../components/ui/ProgressBar';

export const MiniPnlSection: React.FC = () => {
  const { state, updateEconomy } = useBooster();
  const e = state.economy;

  const hasAllFields = e.revenue !== null && e.cogs !== null && e.opex !== null && e.payroll !== null;
  
  const getFotPercent = () => {
    if (!e.revenue || !e.payroll) return null;
    return (e.payroll / e.revenue * 100);
  };

  const fotPercent = getFotPercent();

  const getMarginStatus = () => {
    if (!e.marginPercent) return null;
    if (e.marginPercent < 15) return { label: 'Низкая', variant: 'error' as const, message: 'Маржа ниже 15% — красный флаг. Возможно, проблема в ценах, костах или бизнес-модели.' };
    if (e.marginPercent >= 15 && e.marginPercent <= 30) return { label: 'Нормальная', variant: 'warning' as const, message: 'Маржа в диапазоне 15-30% — рабочий уровень, но есть куда расти.' };
    return { label: 'Хорошая', variant: 'success' as const, message: 'Маржа выше 30% — хороший уровень для роста и инвестиций.' };
  };

  const marginStatus = getMarginStatus();

  return (
    <div>
      <SectionTitle icon={<DollarSign size={28} />}>
        Мини-P&L на салфетке
      </SectionTitle>

      <Card variant="elevated" className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Revenue */}
          <NumberInput
            label="Выручка (за месяц)"
            value={e.revenue}
            onChange={(val) => updateEconomy({ revenue: val })}
            placeholder="0"
            min={0}
            suffix="₽"
          />

          {/* COGS */}
          <NumberInput
            label="Себестоимость"
            value={e.cogs}
            onChange={(val) => updateEconomy({ cogs: val })}
            placeholder="0"
            min={0}
            suffix="₽"
          />

          {/* OPEX */}
          <NumberInput
            label="Операционные расходы"
            value={e.opex}
            onChange={(val) => updateEconomy({ opex: val })}
            placeholder="0"
            min={0}
            suffix="₽"
          />

          {/* Payroll */}
          <NumberInput
            label="ФОТ (фонд оплаты труда)"
            value={e.payroll}
            onChange={(val) => updateEconomy({ payroll: val })}
            placeholder="0"
            min={0}
            suffix="₽"
          />
        </div>

        {/* Auto-calculated Results */}
        {hasAllFields && (
          <div className="space-y-4">
            <div className="h-px bg-[var(--border-subtle)]" />

            {/* Profit & Margin Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <div className="text-sm text-[var(--muted)] mb-1">Прибыль</div>
                <div className="text-2xl font-bold text-[var(--text)]">
                  {e.profit?.toLocaleString()} ₽
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <div className="text-sm text-[var(--muted)] mb-1">Маржа</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-[var(--text)]">
                    {e.marginPercent?.toFixed(1)}%
                  </div>
                  {marginStatus && (
                    <Badge variant={marginStatus.variant}>
                      {marginStatus.label}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-3">
              {/* Margin Warning */}
              {marginStatus && marginStatus.variant === 'error' && (
                <Card variant="default" className="p-4 bg-red-500/10 border-red-500/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[var(--text-secondary)]">
                      {marginStatus.message}
                    </div>
                  </div>
                </Card>
              )}

              {/* Margin Warning */}
              {marginStatus && marginStatus.variant === 'warning' && (
                <Card variant="default" className="p-4 bg-yellow-500/10 border-yellow-500/30">
                  <div className="flex items-start gap-3">
                    <TrendingUp size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[var(--text-secondary)]">
                      {marginStatus.message}
                    </div>
                  </div>
                </Card>
              )}

              {/* Margin Success */}
              {marginStatus && marginStatus.variant === 'success' && (
                <Card variant="premium" className="p-4 bg-green-500/10 border-green-500/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[var(--text-secondary)]">
                      {marginStatus.message}
                    </div>
                  </div>
                </Card>
              )}

              {/* FOT Warning */}
              {fotPercent && fotPercent > 40 && (
                <Card variant="default" className="p-4 bg-yellow-500/10 border-yellow-500/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-[var(--text-secondary)]">
                      ФОТ составляет {fotPercent.toFixed(1)}% от выручки (более 40%). 
                      Это тема для разговора про оргструктуру и модели компенсаций на Start-СС.
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
