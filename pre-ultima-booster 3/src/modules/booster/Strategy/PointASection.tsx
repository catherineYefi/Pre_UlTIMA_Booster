// ============================================
// PRE-ULTIMA BOOSTER — Point A Section
// ============================================

import React from 'react';
import { Target } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { SectionTitle } from '../../../components/ui/ProgressBar';

interface ScoreSliderProps {
  label: string;
  value: number | null;
  onChange: (value: number) => void;
}

const ScoreSlider: React.FC<ScoreSliderProps> = ({ label, value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-medium text-[var(--text)]">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold gradient-text">
            {value ?? '—'}
          </span>
          <span className="text-sm text-[var(--muted)]">/ 10</span>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value ?? 5}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: value 
              ? `linear-gradient(to right, var(--accent) 0%, var(--accent) ${value * 10}%, var(--bg-elevated) ${value * 10}%, var(--bg-elevated) 100%)`
              : undefined
          }}
        />
        <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

export const PointASection: React.FC = () => {
  const { state, updateStrategy } = useBooster();

  return (
    <div>
      <SectionTitle icon={<Target size={28} />}>
        Точка А в правде
      </SectionTitle>

      <Card variant="elevated" className="p-6">
        <div className="mb-6">
          <p className="text-sm text-[var(--text-secondary)]">
            Оцените текущее состояние каждой области по шкале от 1 до 10, где:<br/>
            <strong>1</strong> — критично плохо, всё в хаосе<br/>
            <strong>5</strong> — середина, работает, но много проблем<br/>
            <strong>10</strong> — идеально, система отлажена
          </p>
        </div>

        <div className="space-y-6">
          <ScoreSlider
            label="Продажи"
            value={state.strategy.scoreSales}
            onChange={(val) => updateStrategy({ scoreSales: val })}
          />

          <ScoreSlider
            label="Маркетинг"
            value={state.strategy.scoreMarketing}
            onChange={(val) => updateStrategy({ scoreMarketing: val })}
          />

          <ScoreSlider
            label="Продукт"
            value={state.strategy.scoreProduct}
            onChange={(val) => updateStrategy({ scoreProduct: val })}
          />

          <ScoreSlider
            label="Команда"
            value={state.strategy.scoreTeam}
            onChange={(val) => updateStrategy({ scoreTeam: val })}
          />

          <ScoreSlider
            label="Финансы"
            value={state.strategy.scoreFinance}
            onChange={(val) => updateStrategy({ scoreFinance: val })}
          />

          <ScoreSlider
            label="Операционка"
            value={state.strategy.scoreOps}
            onChange={(val) => updateStrategy({ scoreOps: val })}
          />
        </div>
      </Card>
    </div>
  );
};

// Custom CSS for slider (add to globals.css if needed)
const sliderStyles = `
<style>
input[type="range"].slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
  transition: all 0.2s;
}

input[type="range"].slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.6);
}

input[type="range"].slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
  transition: all 0.2s;
}

input[type="range"].slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.6);
}
</style>
`;
