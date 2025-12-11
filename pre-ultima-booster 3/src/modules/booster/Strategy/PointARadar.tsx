// ============================================
// PRE-ULTIMA BOOSTER — Point A Radar Chart
// ============================================

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { SectionTitle } from '../../../components/ui/ProgressBar';

export const PointARadar: React.FC = () => {
  const { state } = useBooster();
  const s = state.strategy;

  const data = [
    { subject: 'Продажи', score: s.scoreSales ?? 5 },
    { subject: 'Маркетинг', score: s.scoreMarketing ?? 5 },
    { subject: 'Продукт', score: s.scoreProduct ?? 5 },
    { subject: 'Команда', score: s.scoreTeam ?? 5 },
    { subject: 'Финансы', score: s.scoreFinance ?? 5 },
    { subject: 'Операционка', score: s.scoreOps ?? 5 }
  ];

  // Find weakest zones (2-3 lowest scores)
  const sortedScores = [...data]
    .filter(item => {
      const field = item.subject;
      if (field === 'Продажи') return s.scoreSales !== null;
      if (field === 'Маркетинг') return s.scoreMarketing !== null;
      if (field === 'Продукт') return s.scoreProduct !== null;
      if (field === 'Команда') return s.scoreTeam !== null;
      if (field === 'Финансы') return s.scoreFinance !== null;
      if (field === 'Операционка') return s.scoreOps !== null;
      return false;
    })
    .sort((a, b) => a.score - b.score);

  const weakestZones = sortedScores.slice(0, 3).map(item => item.subject);

  const hasAnyScore = [
    s.scoreSales,
    s.scoreMarketing,
    s.scoreProduct,
    s.scoreTeam,
    s.scoreFinance,
    s.scoreOps
  ].some(score => score !== null);

  return (
    <div>
      <SectionTitle icon={<Activity size={28} />}>
        Визуализация точки А
      </SectionTitle>

      <Card variant="elevated" className="p-6">
        {hasAnyScore ? (
          <div className="space-y-6">
            {/* Radar Chart */}
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                  <PolarGrid 
                    stroke="var(--border-subtle)" 
                    strokeWidth={1}
                  />
                  <PolarAngleAxis 
                    dataKey="subject"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                  />
                  <Radar
                    name="Оценка"
                    dataKey="score"
                    stroke="var(--accent)"
                    fill="var(--accent)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Insights */}
            {weakestZones.length > 0 && (
              <Card variant="premium" className="p-5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                <div className="flex items-start gap-3">
                  <Activity size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-[var(--text)] mb-2">
                      Самые слабые зоны по вашей оценке
                    </h5>
                    <p className="text-sm text-[var(--text-secondary)]">
                      <strong>{weakestZones.join(', ')}</strong><br/>
                      Скорее всего, именно они станут приоритетами сезона. 
                      На Start-СС трекер поможет определить, с чего начать и в какой последовательности работать над улучшениями.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Average Score */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <span className="text-sm text-[var(--muted)]">Средняя оценка:</span>
                <span className="text-xl font-bold gradient-text">
                  {(data.reduce((acc, item) => acc + item.score, 0) / data.length).toFixed(1)}
                </span>
                <span className="text-sm text-[var(--muted)]">/ 10</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-[var(--muted)]">
            Заполните оценки в разделе выше, чтобы увидеть диаграмму
          </div>
        )}
      </Card>
    </div>
  );
};
