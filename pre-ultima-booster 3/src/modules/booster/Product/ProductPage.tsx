// ============================================
// PRE-ULTIMA BOOSTER — Product Lab Page
// ============================================

import React from 'react';
import { PageContainer } from '../../../components/layout/Layout';
import { ProductRtgSection } from './ProductRtgSection';
import { OfferDistillSection } from './OfferDistillSection';
import { ProductCalcSection } from './ProductCalcSection';
import { CopySummaryButton } from '../../../components/ui/ToggleTheme';
import { useBooster } from '../../../state/BoosterContext';

export const ProductPage: React.FC = () => {
  const { state } = useBooster();

  const getSummaryText = () => {
    const p = state.product;
    
    return `
===========================================
PRE-ULTIMA BOOSTER — Product Lab
===========================================

[ПРОДУКТОВАЯ РЕНТГЕНОГРАММА 2.0]

1. Маржинальная аудитория:
${p.targetAudienceMostProfitable || '(не заполнено)'}

2. Реальная ценность:
${p.realValue || '(не заполнено)'}

3. Топ-3 боли:
${p.top3Pains || '(не заполнено)'}

4. Продукты (80% выручки сейчас):
${p.products80Now || '(не заполнено)'}

5. Продукты (80% выручки через 6 мес):
${p.products80Future || '(не заполнено)'}

6. Что рынку не нужно:
${p.whatMarketDoesntNeed || '(не заполнено)'}

7. Фраза за 7 секунд:
${p.sevenSecondPitch || '(не заполнено)'}

-------------------------------------------
[ПРЕМИАЛЬНЫЙ ОФФЕР]

Аудитория: ${p.premiumOffer.audience || '(не заполнено)'}
Боль: ${p.premiumOffer.pain || '(не заполнено)'}
Обещание: ${p.premiumOffer.promise || '(не заполнено)'}
Механика: ${p.premiumOffer.mechanism || '(не заполнено)'}
Доказательства: ${p.premiumOffer.proof || '(не заполнено)'}
Почему сейчас: ${p.premiumOffer.whyNow || '(не заполнено)'}

-------------------------------------------
[МАССОВЫЙ ОФФЕР]

Аудитория: ${p.massOffer.audience || '(не заполнено)'}
Боль: ${p.massOffer.pain || '(не заполнено)'}
Обещание: ${p.massOffer.promise || '(не заполнено)'}
Механика: ${p.massOffer.mechanism || '(не заполнено)'}
Доказательства: ${p.massOffer.proof || '(не заполнено)'}
Почему сейчас: ${p.massOffer.whyNow || '(не заполнено)'}

-------------------------------------------
[ПРОДУКТОВЫЙ КАЛЬКУЛЯТОР]

${p.products.map((prod, i) => {
  if (!prod.name) return '';
  const margin = (prod.price && prod.cost) ? prod.price - prod.cost : null;
  const marginPercent = (prod.price && margin) ? (margin / prod.price * 100).toFixed(1) : null;
  
  return `
Продукт ${i + 1}: ${prod.name}
  Себестоимость: ${prod.cost || 'н/д'} ₽
  Цена: ${prod.price || 'н/д'} ₽
  Маржа: ${margin ? `${margin} ₽ (${marginPercent}%)` : 'н/д'}
  Время команды: ${prod.avgTime || 'н/д'} ч
  Повторные покупки: ${prod.repeatRate || 'н/д'}%
`;
}).join('\n')}

===========================================
Готово к обсуждению с трекером 🚀
===========================================
    `.trim();
  };

  return (
    <PageContainer
      title="Product Clarity Lab"
      subtitle="Фокус продукта, УТП, офферы и продуктовый калькулятор"
    >
      <div className="space-y-8">
        <ProductRtgSection />
        <OfferDistillSection />
        <ProductCalcSection />

        {/* Copy Summary Button */}
        <div className="flex justify-center pt-8">
          <CopySummaryButton 
            getSummaryText={getSummaryText}
            label="Скопировать сводку Product Lab"
            variant="primary"
          />
        </div>
      </div>
    </PageContainer>
  );
};
