// ============================================
// PRE-ULTIMA BOOSTER — Product Calculator Section
// ============================================

import React from 'react';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { Input, NumberInput } from '../../../components/ui/Input';
import { SectionTitle, Badge } from '../../../components/ui/ProgressBar';
import { Button } from '../../../components/ui/Button';
import { getDefaultProductItem } from '../../../lib/types';

export const ProductCalcSection: React.FC = () => {
  const { state, updateProduct } = useBooster();

  const addProduct = () => {
    const newProducts = [...state.product.products, getDefaultProductItem()];
    updateProduct({ products: newProducts });
  };

  const removeProduct = (index: number) => {
    const newProducts = state.product.products.filter((_, i) => i !== index);
    updateProduct({ products: newProducts });
  };

  const updateProductItem = (index: number, field: string, value: any) => {
    const newProducts = [...state.product.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    updateProduct({ products: newProducts });
  };

  // Calculate metrics for each product
  const calculateMetrics = (product: any) => {
    const margin = (product.price && product.cost) 
      ? product.price - product.cost 
      : null;
    
    const marginPercent = (product.price && margin) 
      ? (margin / product.price * 100) 
      : null;
    
    const efficiency = (margin && product.avgTime && product.repeatRate)
      ? (margin * (product.repeatRate / 100)) / product.avgTime
      : null;

    return { margin, marginPercent, efficiency };
  };

  // Find champion product
  const champProduct = state.product.products
    .map((p, i) => ({ ...p, ...calculateMetrics(p), index: i }))
    .filter(p => p.efficiency !== null)
    .sort((a, b) => (b.efficiency || 0) - (a.efficiency || 0))[0];

  // Check if all products have low margin
  const hasLowMargins = state.product.products.every(p => {
    const { marginPercent } = calculateMetrics(p);
    return marginPercent !== null && marginPercent < 20;
  });

  return (
    <div>
      <SectionTitle icon={<Calculator size={28} />}>
        Калькулятор продуктовой эффективности
      </SectionTitle>

      <Card variant="elevated" className="p-6">
        <div className="space-y-6">
          {state.product.products.map((product, index) => {
            const { margin, marginPercent, efficiency } = calculateMetrics(product);

            return (
              <div 
                key={index}
                className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-[var(--text)]">
                    Продукт {index + 1}
                  </h5>
                  {state.product.products.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProduct(index)}
                      className="text-[var(--error)]"
                    >
                      Удалить
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <Input
                    label="Название"
                    value={product.name}
                    onChange={(e) => updateProductItem(index, 'name', e.target.value)}
                    placeholder="Название продукта"
                  />

                  <NumberInput
                    label="Себестоимость (₽)"
                    value={product.cost}
                    onChange={(val) => updateProductItem(index, 'cost', val)}
                    placeholder="0"
                    min={0}
                  />

                  <NumberInput
                    label="Цена (₽)"
                    value={product.price}
                    onChange={(val) => updateProductItem(index, 'price', val)}
                    placeholder="0"
                    min={0}
                  />

                  <NumberInput
                    label="Время команды (ч)"
                    value={product.avgTime}
                    onChange={(val) => updateProductItem(index, 'avgTime', val)}
                    placeholder="0"
                    min={0}
                    step={0.5}
                  />

                  <NumberInput
                    label="Повторные покупки (%)"
                    value={product.repeatRate}
                    onChange={(val) => updateProductItem(index, 'repeatRate', val)}
                    placeholder="0"
                    min={0}
                    max={100}
                  />
                </div>

                {/* Auto-calculated metrics */}
                {(margin !== null || marginPercent !== null) && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border-subtle)]">
                    {margin !== null && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--muted)]">Маржа:</span>
                        <Badge variant={margin > 0 ? 'success' : 'error'}>
                          {margin.toFixed(0)} ₽
                        </Badge>
                      </div>
                    )}
                    
                    {marginPercent !== null && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--muted)]">Маржа %:</span>
                        <Badge variant={marginPercent >= 20 ? 'success' : 'warning'}>
                          {marginPercent.toFixed(1)}%
                        </Badge>
                      </div>
                    )}

                    {efficiency !== null && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--muted)]">Индекс эффективности:</span>
                        <Badge variant="default">
                          {efficiency.toFixed(1)}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Product Button */}
          {state.product.products.length < 10 && (
            <Button
              variant="secondary"
              onClick={addProduct}
              className="w-full"
            >
              + Добавить продукт
            </Button>
          )}

          {/* Insights */}
          {champProduct && (
            <Card variant="premium" className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
              <div className="flex items-start gap-3">
                <TrendingUp size={24} className="text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-[var(--text)] mb-1">
                    Продукт-чемпион по эффективности
                  </h5>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>{champProduct.name}</strong> показывает лучший индекс эффективности ({champProduct.efficiency?.toFixed(1)}). 
                    Подумайте, не он ли должен стать ядром сезона?
                  </p>
                </div>
              </div>
            </Card>
          )}

          {hasLowMargins && state.product.products.some(p => p.name) && (
            <Card variant="default" className="p-4 bg-yellow-500/10 border-yellow-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-[var(--text)] mb-1">
                    Внимание: тонкая маржа
                  </h5>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Похоже, у ключевых продуктов маржа ниже 20%. 
                    Это важная тема для обсуждения на Start-СС — возможно, нужно пересмотреть ценообразование или структуру затрат.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};
