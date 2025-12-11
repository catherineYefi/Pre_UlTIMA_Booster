// ============================================
// PRE-ULTIMA BOOSTER — LocalStorage Helpers
// ============================================

import { BoosterState, getDefaultBoosterState } from './types';

const STORAGE_KEY = 'ultima_pre_booster_state_v1';

/**
 * Загружает состояние из localStorage
 */
export const loadBoosterState = (): BoosterState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    return parsed as BoosterState;
  } catch (error) {
    console.error('Failed to load booster state:', error);
    return null;
  }
};

/**
 * Сохраняет состояние в localStorage
 */
export const saveBoosterState = (state: BoosterState): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save booster state:', error);
  }
};

/**
 * Сбрасывает состояние (удаляет из localStorage)
 */
export const resetBoosterState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset booster state:', error);
  }
};

/**
 * Debounce helper для автосохранения
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
