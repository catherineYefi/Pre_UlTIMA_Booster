// ============================================
// PRE-ULTIMA BOOSTER — Progress Calculators
// ============================================

import { ProductLab, EconomyLab, StrategyLab } from './types';

/**
 * Проверяет, заполнено ли значение
 */
const isFilled = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  return false;
};

/**
 * Рассчитывает прогресс для Product Lab
 */
export const getProductProgress = (product: ProductLab): number => {
  const fields = [
    // Рентген (7 полей)
    product.targetAudienceMostProfitable,
    product.realValue,
    product.top3Pains,
    product.products80Now,
    product.products80Future,
    product.whatMarketDoesntNeed,
    product.sevenSecondPitch,
    
    // Премиальный оффер (6 полей)
    product.premiumOffer.audience,
    product.premiumOffer.pain,
    product.premiumOffer.promise,
    product.premiumOffer.mechanism,
    product.premiumOffer.proof,
    product.premiumOffer.whyNow,
    
    // Массовый оффер (6 полей)
    product.massOffer.audience,
    product.massOffer.pain,
    product.massOffer.promise,
    product.massOffer.mechanism,
    product.massOffer.proof,
    product.massOffer.whyNow
  ];
  
  // Калькулятор продуктов — считаем хотя бы один заполненный продукт
  const hasProducts = product.products.some(p => 
    isFilled(p.name) && (
      isFilled(p.cost) || 
      isFilled(p.price) || 
      isFilled(p.avgTime) || 
      isFilled(p.repeatRate)
    )
  );
  
  const filled = fields.filter(isFilled).length + (hasProducts ? 1 : 0);
  const total = fields.length + 1; // +1 за калькулятор
  
  return Math.round((filled / total) * 100);
};

/**
 * Рассчитывает прогресс для Economy Lab
 */
export const getEconomyProgress = (economy: EconomyLab): number => {
  const fields = [
    // Мини-P&L (4 основных поля)
    economy.revenue,
    economy.cogs,
    economy.opex,
    economy.payroll,
    
    // Рычаги роста (проверяем заполненность хотя бы одного)
    economy.mainLevers[0]?.area && economy.mainLevers[0]?.problem && economy.mainLevers[0]?.hypothesis,
    economy.mainLevers[1]?.area && economy.mainLevers[1]?.problem && economy.mainLevers[1]?.hypothesis,
    economy.mainLevers[2]?.area && economy.mainLevers[2]?.problem && economy.mainLevers[2]?.hypothesis
  ];
  
  const filled = fields.filter(f => {
    if (typeof f === 'boolean') return f;
    return isFilled(f);
  }).length;
  
  const total = fields.length;
  
  return Math.round((filled / total) * 100);
};

/**
 * Рассчитывает прогресс для Strategy Lab
 */
export const getStrategyProgress = (strategy: StrategyLab): number => {
  const fields = [
    // Оценки (6 полей)
    strategy.scoreSales,
    strategy.scoreMarketing,
    strategy.scoreProduct,
    strategy.scoreTeam,
    strategy.scoreFinance,
    strategy.scoreOps,
    
    // Точка Б (5 полей)
    strategy.targetMoney,
    strategy.targetTeam,
    strategy.targetProduct,
    strategy.targetSystems,
    strategy.targetRole
  ];
  
  const filled = fields.filter(isFilled).length;
  const total = fields.length;
  
  return Math.round((filled / total) * 100);
};

/**
 * Рассчитывает общий прогресс по всем блокам
 */
export const getTotalProgress = (
  product: ProductLab,
  economy: EconomyLab,
  strategy: StrategyLab
): number => {
  const productProg = getProductProgress(product);
  const economyProg = getEconomyProgress(economy);
  const strategyProg = getStrategyProgress(strategy);
  
  return Math.round((productProg + economyProg + strategyProg) / 3);
};
