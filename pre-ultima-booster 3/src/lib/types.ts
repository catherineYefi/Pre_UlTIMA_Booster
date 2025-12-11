// ============================================
// PRE-ULTIMA BOOSTER — Type Definitions
// ============================================

export type ProductItem = {
  name: string;
  cost: number | null;       // себестоимость
  price: number | null;      // цена продажи
  avgTime: number | null;    // время команды на единицу (часы)
  repeatRate: number | null; // % повторных покупок
};

export type OfferBlock = {
  audience: string;
  pain: string;
  promise: string;
  mechanism: string;
  proof: string;
  whyNow: string;
};

export type ProductLab = {
  // Рентген продукта
  targetAudienceMostProfitable: string;
  realValue: string;
  top3Pains: string;
  products80Now: string;
  products80Future: string;
  whatMarketDoesntNeed: string;
  sevenSecondPitch: string;

  // Офферы
  premiumOffer: OfferBlock;
  massOffer: OfferBlock;

  // Продуктовый калькулятор
  products: ProductItem[];
};

export type LeverArea =
  | 'marketing'
  | 'sales'
  | 'product'
  | 'team'
  | 'finance'
  | 'ops'
  | '';

export type GrowthLever = {
  area: LeverArea;
  problem: string;
  hypothesis: string;
  expectedEffect: string;
};

export type EconomyLab = {
  revenue: number | null;
  cogs: number | null;
  opex: number | null;
  payroll: number | null;

  // Автоматически рассчитываемые
  profit: number | null;
  marginPercent: number | null;

  mainLevers: GrowthLever[]; // 3 штуки
};

export type StrategyLab = {
  // Оценки 1–10
  scoreSales: number | null;
  scoreMarketing: number | null;
  scoreProduct: number | null;
  scoreTeam: number | null;
  scoreFinance: number | null;
  scoreOps: number | null;

  // Точка Б (6 месяцев)
  targetMoney: string;
  targetTeam: string;
  targetProduct: string;
  targetSystems: string;
  targetRole: string;
};

export type BoosterState = {
  product: ProductLab;
  economy: EconomyLab;
  strategy: StrategyLab;
};

// ============================================
// Default / Initial State
// ============================================

export const getDefaultOfferBlock = (): OfferBlock => ({
  audience: '',
  pain: '',
  promise: '',
  mechanism: '',
  proof: '',
  whyNow: ''
});

export const getDefaultProductItem = (): ProductItem => ({
  name: '',
  cost: null,
  price: null,
  avgTime: null,
  repeatRate: null
});

export const getDefaultGrowthLever = (): GrowthLever => ({
  area: '',
  problem: '',
  hypothesis: '',
  expectedEffect: ''
});

export const getDefaultBoosterState = (): BoosterState => ({
  product: {
    targetAudienceMostProfitable: '',
    realValue: '',
    top3Pains: '',
    products80Now: '',
    products80Future: '',
    whatMarketDoesntNeed: '',
    sevenSecondPitch: '',
    premiumOffer: getDefaultOfferBlock(),
    massOffer: getDefaultOfferBlock(),
    products: [
      getDefaultProductItem(),
      getDefaultProductItem(),
      getDefaultProductItem()
    ]
  },
  economy: {
    revenue: null,
    cogs: null,
    opex: null,
    payroll: null,
    profit: null,
    marginPercent: null,
    mainLevers: [
      getDefaultGrowthLever(),
      getDefaultGrowthLever(),
      getDefaultGrowthLever()
    ]
  },
  strategy: {
    scoreSales: null,
    scoreMarketing: null,
    scoreProduct: null,
    scoreTeam: null,
    scoreFinance: null,
    scoreOps: null,
    targetMoney: '',
    targetTeam: '',
    targetProduct: '',
    targetSystems: '',
    targetRole: ''
  }
});
