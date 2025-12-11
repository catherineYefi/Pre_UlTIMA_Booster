// ============================================
// PRE-ULTIMA BOOSTER — State Management
// ============================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  BoosterState,
  getDefaultBoosterState,
  ProductLab,
  EconomyLab,
  StrategyLab
} from '../lib/types';
import {
  loadBoosterState,
  saveBoosterState,
  debounce
} from '../lib/storage';

// ============================================
// Context Type
// ============================================

interface BoosterContextType {
  state: BoosterState;
  updateProduct: (product: Partial<ProductLab>) => void;
  updateEconomy: (economy: Partial<EconomyLab>) => void;
  updateStrategy: (strategy: Partial<StrategyLab>) => void;
  resetState: () => void;
}

// ============================================
// Context Creation
// ============================================

const BoosterContext = createContext<BoosterContextType | undefined>(undefined);

// ============================================
// Provider Component
// ============================================

interface BoosterProviderProps {
  children: ReactNode;
}

export const BoosterProvider: React.FC<BoosterProviderProps> = ({ children }) => {
  // Инициализация состояния из localStorage или дефолтного
  const [state, setState] = useState<BoosterState>(() => {
    const stored = loadBoosterState();
    return stored || getDefaultBoosterState();
  });

  // Debounced save для автосохранения
  const debouncedSave = React.useMemo(
    () => debounce(saveBoosterState, 500),
    []
  );

  // Автосохранение при изменении состояния
  useEffect(() => {
    debouncedSave(state);
  }, [state, debouncedSave]);

  // ============================================
  // Update Functions
  // ============================================

  const updateProduct = (product: Partial<ProductLab>) => {
    setState(prev => ({
      ...prev,
      product: {
        ...prev.product,
        ...product
      }
    }));
  };

  const updateEconomy = (economy: Partial<EconomyLab>) => {
    setState(prev => {
      const updated = {
        ...prev.economy,
        ...economy
      };

      // Автоматический расчет прибыли и маржи
      if (
        updated.revenue !== null &&
        updated.cogs !== null &&
        updated.opex !== null &&
        updated.payroll !== null
      ) {
        const profit = updated.revenue - updated.cogs - updated.opex - updated.payroll;
        const marginPercent = updated.revenue > 0 
          ? (profit / updated.revenue) * 100 
          : null;

        updated.profit = profit;
        updated.marginPercent = marginPercent;
      }

      return {
        ...prev,
        economy: updated
      };
    });
  };

  const updateStrategy = (strategy: Partial<StrategyLab>) => {
    setState(prev => ({
      ...prev,
      strategy: {
        ...prev.strategy,
        ...strategy
      }
    }));
  };

  const resetState = () => {
    const defaultState = getDefaultBoosterState();
    setState(defaultState);
    saveBoosterState(defaultState);
  };

  // ============================================
  // Context Value
  // ============================================

  const value: BoosterContextType = {
    state,
    updateProduct,
    updateEconomy,
    updateStrategy,
    resetState
  };

  return (
    <BoosterContext.Provider value={value}>
      {children}
    </BoosterContext.Provider>
  );
};

// ============================================
// Hook для использования контекста
// ============================================

export const useBooster = (): BoosterContextType => {
  const context = useContext(BoosterContext);
  if (!context) {
    throw new Error('useBooster must be used within BoosterProvider');
  }
  return context;
};
