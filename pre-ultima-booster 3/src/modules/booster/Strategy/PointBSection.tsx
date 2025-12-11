// ============================================
// PRE-ULTIMA BOOSTER — Point B Section
// ============================================

import React from 'react';
import { MapPin, Rocket } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { Textarea } from '../../../components/ui/Input';
import { SectionTitle } from '../../../components/ui/ProgressBar';

export const PointBSection: React.FC = () => {
  const { state, updateStrategy } = useBooster();

  const hasAnyTarget = [
    state.strategy.targetMoney,
    state.strategy.targetTeam,
    state.strategy.targetProduct,
    state.strategy.targetSystems,
    state.strategy.targetRole
  ].some(t => t.trim().length > 0);

  const generateSummary = () => {
    const s = state.strategy;
    if (!hasAnyTarget) return null;

    return `
Через 6 месяцев я хочу:
${s.targetMoney ? `💰 По деньгам: ${s.targetMoney}` : ''}
${s.targetTeam ? `👥 По команде: ${s.targetTeam}` : ''}
${s.targetProduct ? `📦 По продукту: ${s.targetProduct}` : ''}
${s.targetSystems ? `⚙️ По системам: ${s.targetSystems}` : ''}
${s.targetRole ? `🎯 Моя роль: ${s.targetRole}` : ''}
    `.trim();
  };

  return (
    <div>
      <SectionTitle icon={<MapPin size={28} />}>
        Точка Б на 6 месяцев
      </SectionTitle>

      <Card variant="elevated" className="p-6">
        <div className="mb-6">
          <p className="text-sm text-[var(--text-secondary)]">
            Это черновик, рабочая гипотеза. На Start-СС мы детализируем и скорректируем эти цели 
            вместе с трекером, но уже сейчас важно наметить направление.
          </p>
        </div>

        <div className="space-y-6">
          {/* Money */}
          <div>
            <label className="flex items-center gap-2 font-medium text-[var(--text)] mb-2">
              💰 Деньги
            </label>
            <Textarea
              value={state.strategy.targetMoney}
              onChange={(e) => updateStrategy({ targetMoney: e.target.value })}
              placeholder="Какие цифры вы хотите видеть через 6 месяцев? (выручка, прибыль, маржа, чистый доход и т.д.)"
            />
          </div>

          {/* Team */}
          <div>
            <label className="flex items-center gap-2 font-medium text-[var(--text)] mb-2">
              👥 Команда
            </label>
            <Textarea
              value={state.strategy.targetTeam}
              onChange={(e) => updateStrategy({ targetTeam: e.target.value })}
              placeholder="Кто должен появиться/уйти? Какие новые роли? Сколько человек в команде?"
            />
          </div>

          {/* Product */}
          <div>
            <label className="flex items-center gap-2 font-medium text-[var(--text)] mb-2">
              📦 Продукт
            </label>
            <Textarea
              value={state.strategy.targetProduct}
              onChange={(e) => updateStrategy({ targetProduct: e.target.value })}
              placeholder="Какие продукты останутся, какие уйдут, какие появятся?"
            />
          </div>

          {/* Systems */}
          <div>
            <label className="flex items-center gap-2 font-medium text-[var(--text)] mb-2">
              ⚙️ Системы
            </label>
            <Textarea
              value={state.strategy.targetSystems}
              onChange={(e) => updateStrategy({ targetSystems: e.target.value })}
              placeholder="Какие системы хотите внедрить? (P&L, РнП, CRM, отчётность, автоматизация и т.д.)"
            />
          </div>

          {/* Personal Role */}
          <div>
            <label className="flex items-center gap-2 font-medium text-[var(--text)] mb-2">
              🎯 Личная роль
            </label>
            <Textarea
              value={state.strategy.targetRole}
              onChange={(e) => updateStrategy({ targetRole: e.target.value })}
              placeholder="Какую роль вы хотите занимать в бизнесе через 6 месяцев? Из чего выйти? Куда сфокусироваться?"
            />
          </div>
        </div>

        {/* Auto Summary */}
        {hasAnyTarget && (
          <div className="mt-8">
            <Card variant="premium" className="p-5 bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-soft)]/10 border-[var(--accent)]/30">
              <div className="flex items-start gap-3">
                <Rocket size={24} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-[var(--text)] mb-2">
                    Ваша точка Б (краткая сводка)
                  </h5>
                  <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">
                    {generateSummary()}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};
