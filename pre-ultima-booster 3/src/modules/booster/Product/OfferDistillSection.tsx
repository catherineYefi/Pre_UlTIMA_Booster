// ============================================
// PRE-ULTIMA BOOSTER — Offer Distill Section
// ============================================

import React, { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { Textarea } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { SectionTitle } from '../../../components/ui/ProgressBar';
import { OfferBlock } from '../../../lib/types';

interface OfferFormProps {
  title: string;
  icon: React.ReactNode;
  offer: OfferBlock;
  onUpdate: (offer: Partial<OfferBlock>) => void;
  color: string;
}

const OfferForm: React.FC<OfferFormProps> = ({
  title,
  icon,
  offer,
  onUpdate,
  color
}) => {
  const [generatedPhrase, setGeneratedPhrase] = useState('');

  const generateOfferPhrase = () => {
    if (!offer.audience || !offer.pain || !offer.mechanism || !offer.promise) {
      setGeneratedPhrase('Заполните основные поля для генерации фразы');
      return;
    }

    const phrase = `Помогаем ${offer.audience} решить "${offer.pain}" через ${offer.mechanism}, чтобы получить ${offer.promise}.`;
    setGeneratedPhrase(phrase);
  };

  return (
    <Card variant="elevated" className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          {icon}
        </div>
        <h4 className="text-xl font-bold text-[var(--text)]">{title}</h4>
      </div>

      <div className="space-y-4">
        {/* Аудитория */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Аудитория
          </label>
          <Textarea
            value={offer.audience}
            onChange={(e) => onUpdate({ audience: e.target.value })}
            placeholder="Для кого этот оффер? Кто точная аудитория?"
            className="min-h-[80px]"
          />
        </div>

        {/* Боль */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Боль
          </label>
          <Textarea
            value={offer.pain}
            onChange={(e) => onUpdate({ pain: e.target.value })}
            placeholder="Какую конкретную боль решаете?"
            className="min-h-[80px]"
          />
        </div>

        {/* Обещание (Трансформация) */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Обещание (Трансформация)
          </label>
          <Textarea
            value={offer.promise}
            onChange={(e) => onUpdate({ promise: e.target.value })}
            placeholder="Что получит клиент? Куда переместится из точки А в точку Б?"
            className="min-h-[80px]"
          />
        </div>

        {/* Механика */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Механика
          </label>
          <Textarea
            value={offer.mechanism}
            onChange={(e) => onUpdate({ mechanism: e.target.value })}
            placeholder="Как именно это будет достигнуто? Через что?"
            className="min-h-[80px]"
          />
        </div>

        {/* Социальные доказательства */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Социальные доказательства
          </label>
          <Textarea
            value={offer.proof}
            onChange={(e) => onUpdate({ proof: e.target.value })}
            placeholder="Кейсы, отзывы, цифры, которые доказывают, что это работает"
            className="min-h-[80px]"
          />
        </div>

        {/* Почему сейчас */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Почему сейчас
          </label>
          <Textarea
            value={offer.whyNow}
            onChange={(e) => onUpdate({ whyNow: e.target.value })}
            placeholder="Почему клиент должен действовать именно сейчас? Что будет, если не сделает?"
            className="min-h-[80px]"
          />
        </div>

        {/* Generate Phrase Button */}
        <div>
          <Button
            variant="secondary"
            onClick={generateOfferPhrase}
            className="w-full"
          >
            <Zap size={18} />
            Собрать в одну фразу
          </Button>
          
          {generatedPhrase && (
            <div className="mt-4 p-4 rounded-xl bg-[var(--accent)] bg-opacity-10 border border-[var(--accent)]">
              <p className="text-sm font-medium text-[var(--text)]">
                {generatedPhrase}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// ============================================
// Main Section Component
// ============================================

export const OfferDistillSection: React.FC = () => {
  const { state, updateProduct } = useBooster();

  return (
    <div>
      <SectionTitle icon={<Sparkles size={28} />}>
        Офферный дистиллят
      </SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Premium Offer */}
        <OfferForm
          title="Премиальный оффер"
          icon={<Sparkles size={20} className="text-white" />}
          offer={state.product.premiumOffer}
          onUpdate={(offer) => updateProduct({
            premiumOffer: { ...state.product.premiumOffer, ...offer }
          })}
          color="from-purple-600 to-pink-600"
        />

        {/* Mass Offer */}
        <OfferForm
          title="Массовый оффер"
          icon={<Zap size={20} className="text-white" />}
          offer={state.product.massOffer}
          onUpdate={(offer) => updateProduct({
            massOffer: { ...state.product.massOffer, ...offer }
          })}
          color="from-blue-600 to-cyan-600"
        />
      </div>
    </div>
  );
};
