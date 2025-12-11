// ============================================
// PRE-ULTIMA BOOSTER — Economy Lab Page
// ============================================

import React from 'react';
import { PageContainer } from '../../../components/layout/Layout';
import { MiniPnlSection } from './MiniPnlSection';
import { LeversSection } from './LeversSection';
import { CopySummaryButton } from '../../../components/ui/ToggleTheme';
import { useBooster } from '../../../state/BoosterContext';

export const EconomyPage: React.FC = () => {
  const { state } = useBooster();

  const getSummaryText = () => {
    const e = state.economy;
    
    return `
===========================================
PRE-ULTIMA BOOSTER — Economy Lab
===========================================

[МИНИ-P&L НА САЛФЕТКЕ]

Выручка (мес): ${e.revenue ? `${e.revenue.toLocaleString()} ₽` : '(не заполнено)'}
Себестоимость: ${e.cogs ? `${e.cogs.toLocaleString()} ₽` : '(не заполнено)'}
Операционные расходы: ${e.opex ? `${e.opex.toLocaleString()} ₽` : '(не заполнено)'}
ФОТ: ${e.payroll ? `${e.payroll.toLocaleString()} ₽` : '(не заполнено)'}

${e.profit !== null ? `
──────────────────────────────────────
Прибыль: ${e.profit.toLocaleString()} ₽
Маржа: ${e.marginPercent?.toFixed(1)}%
──────────────────────────────────────
` : ''}

-------------------------------------------
[ТРИ РЫЧАГА РОСТА]

${e.mainLevers.map((lever, i) => {
  if (!lever.area) return '';
  return `
РЫЧАГ ${i + 1}: ${lever.area.toUpperCase()}
  Проблема: ${lever.problem || '(не заполнено)'}
  Гипотеза: ${lever.hypothesis || '(не заполнено)'}
  Ожидаемый эффект: ${lever.expectedEffect || '(не заполнено)'}
`;
}).join('\n')}

-------------------------------------------
[ГЛАВНЫЙ РЫЧАГ]

${e.mainLevers[0]?.area && e.mainLevers[0]?.hypothesis 
  ? `Мой главный рычаг на ближайшие месяцы — ${e.mainLevers[0].area}. 
На Start-СС хочу проверить гипотезу: "${e.mainLevers[0].hypothesis}".`
  : '(Заполните первый рычаг)'}

===========================================
Готово к обсуждению с трекером 🚀
===========================================
    `.trim();
  };

  return (
    <PageContainer
      title="Economic Accuracy Lab"
      subtitle="Мини-P&L и выбор ключевых рычагов роста"
    >
      <div className="space-y-8">
        <MiniPnlSection />
        <LeversSection />

        {/* Copy Summary Button */}
        <div className="flex justify-center pt-8">
          <CopySummaryButton 
            getSummaryText={getSummaryText}
            label="Скопировать сводку Economy Lab"
            variant="primary"
          />
        </div>
      </div>
    </PageContainer>
  );
};
