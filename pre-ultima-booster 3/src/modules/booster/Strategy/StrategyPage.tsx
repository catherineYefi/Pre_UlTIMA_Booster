// ============================================
// PRE-ULTIMA BOOSTER — Strategy Lab Page
// ============================================

import React from 'react';
import { PageContainer } from '../../../components/layout/Layout';
import { PointASection } from './PointASection';
import { PointARadar } from './PointARadar';
import { PointBSection } from './PointBSection';
import { CopySummaryButton } from '../../../components/ui/ToggleTheme';
import { useBooster } from '../../../state/BoosterContext';

export const StrategyPage: React.FC = () => {
  const { state } = useBooster();

  const getSummaryText = () => {
    const s = state.strategy;
    
    return `
===========================================
PRE-ULTIMA BOOSTER — Strategy Lab
===========================================

[ТОЧКА А — ЧЕСТНАЯ ОЦЕНКА]

Продажи: ${s.scoreSales ?? 'н/д'} / 10
Маркетинг: ${s.scoreMarketing ?? 'н/д'} / 10
Продукт: ${s.scoreProduct ?? 'н/д'} / 10
Команда: ${s.scoreTeam ?? 'н/д'} / 10
Финансы: ${s.scoreFinance ?? 'н/д'} / 10
Операционка: ${s.scoreOps ?? 'н/д'} / 10

${(() => {
  const scores = [
    { name: 'Продажи', score: s.scoreSales },
    { name: 'Маркетинг', score: s.scoreMarketing },
    { name: 'Продукт', score: s.scoreProduct },
    { name: 'Команда', score: s.scoreTeam },
    { name: 'Финансы', score: s.scoreFinance },
    { name: 'Операционка', score: s.scoreOps }
  ].filter(item => item.score !== null)
   .sort((a, b) => (a.score || 0) - (b.score || 0));
  
  if (scores.length >= 2) {
    const weakest = scores.slice(0, 2).map(s => s.name).join(', ');
    return `\nСамые слабые зоны: ${weakest}\nСкорее всего, именно они станут приоритетами сезона.`;
  }
  return '';
})()}

-------------------------------------------
[ТОЧКА Б — ЧЕРЕЗ 6 МЕСЯЦЕВ]

💰 ДЕНЬГИ:
${s.targetMoney || '(не заполнено)'}

👥 КОМАНДА:
${s.targetTeam || '(не заполнено)'}

📦 ПРОДУКТ:
${s.targetProduct || '(не заполнено)'}

⚙️ СИСТЕМЫ:
${s.targetSystems || '(не заполнено)'}

🎯 ЛИЧНАЯ РОЛЬ:
${s.targetRole || '(не заполнено)'}

===========================================
Готово к обсуждению с трекером 🚀
===========================================
    `.trim();
  };

  return (
    <PageContainer
      title="Strategic Direction Lab"
      subtitle="Честная точка А и черновик точки Б на 6 месяцев"
    >
      <div className="space-y-8">
        <PointASection />
        <PointARadar />
        <PointBSection />

        {/* Copy Summary Button */}
        <div className="flex justify-center pt-8">
          <CopySummaryButton 
            getSummaryText={getSummaryText}
            label="Скопировать сводку Strategy Lab"
            variant="primary"
          />
        </div>
      </div>
    </PageContainer>
  );
};
