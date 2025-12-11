// ============================================
// PRE-ULTIMA BOOSTER — Product Rentgen Section
// ============================================

import React, { useState } from 'react';
import { Scan, ChevronDown, ChevronUp } from 'lucide-react';
import { useBooster } from '../../../state/BoosterContext';
import { Card } from '../../../components/ui/Card';
import { Textarea } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { SectionTitle } from '../../../components/ui/ProgressBar';
import { Hint } from '../../../components/ui/ProgressBar';

export const ProductRtgSection: React.FC = () => {
  const { state, updateProduct } = useBooster();
  const [showExample, setShowExample] = useState(false);

  const exampleText = `
ПРИМЕР (Онлайн-школа по маркетингу):

1. Маржинальная аудитория:
Владельцы малых бизнесов 30-45 лет с выручкой 1-5 млн/мес, которые сами ведут маркетинг, но понимают, что упираются в потолок. Готовы вкладываться в рост.

2. Реальная ценность:
Экономим 6-12 месяцев на поиске работающих каналов методом проб и ошибок. Даем готовые схемы с гарантированным ROI.

3. Топ-3 боли:
- Тратят деньги на рекламу, не понимая, что работает
- Не хватает времени разбираться в сложных инструментах
- Не могут масштабировать бизнес из-за отсутствия системы

4. Продукты (80% выручки сейчас):
Базовый курс "Маркетинг для малого бизнеса" (300k/мес) + консультации (150k/мес)

5. Продукты (80% выручки через 6 мес):
Премиум-программа с сопровождением (600k/мес) + корпоративное обучение (400k/мес)

6. Что рынку не нужно:
Теоретические вебинары без практики. Универсальные решения "для всех ниш".

7. Фраза за 7 секунд:
Помогаем малому бизнесу удвоить выручку за 3 месяца через проверенные маркетинговые схемы.
  `.trim();

  return (
    <Card variant="elevated" className="p-6">
      <SectionTitle icon={<Scan size={28} />}>
        Продуктовая рентгенограмма 2.0
      </SectionTitle>

      <div className="space-y-6">
        {/* Question 1 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-[var(--text)]">
              1. Кто моя наиболее маржинальная аудитория?
            </label>
            <Hint>
              Не "женщины 25-45", а конкретный профиль: "владельцы малых бизнесов с выручкой 1-5 млн, у которых уже есть продукт, но нет системы продаж"
            </Hint>
          </div>
          <Textarea
            value={state.product.targetAudienceMostProfitable}
            onChange={(e) => updateProduct({ targetAudienceMostProfitable: e.target.value })}
            placeholder="Опишите конкретный профиль вашего идеального клиента..."
          />
        </div>

        {/* Question 2 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-[var(--text)]">
              2. В чём реальная ценность продукта для клиента?
            </label>
            <Hint>
              Думайте в категориях: деньги (сколько зарабатывает/экономит), время (сколько экономит часов), риски (что избегает), статус (как меняется позиция)
            </Hint>
          </div>
          <Textarea
            value={state.product.realValue}
            onChange={(e) => updateProduct({ realValue: e.target.value })}
            placeholder="Что реально получает клиент? В чем измеримая ценность?"
          />
        </div>

        {/* Question 3 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-[var(--text)]">
              3. Топ-3 боли, которые мы закрываем лучше всех
            </label>
            <Hint>
              Не общие формулировки "хотят больше денег", а конкретные: "не могут найти хороших менеджеров по продажам", "теряют 40% бюджета на неэффективную рекламу"
            </Hint>
          </div>
          <Textarea
            value={state.product.top3Pains}
            onChange={(e) => updateProduct({ top3Pains: e.target.value })}
            placeholder="Перечислите 3 главные боли, которые решаете лучше конкурентов..."
          />
        </div>

        {/* Question 4 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-[var(--text)]">
              4. Какие продукты дают 80% выручки сейчас?
            </label>
            <Hint>
              Принцип Парето. Обычно 2-3 продукта дают львиную долю денег. Определите их точно.
            </Hint>
          </div>
          <Textarea
            value={state.product.products80Now}
            onChange={(e) => updateProduct({ products80Now: e.target.value })}
            placeholder="Перечислите ключевые продукты с примерной долей выручки..."
          />
        </div>

        {/* Question 5 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-[var(--text)]">
              5. Какие продукты дадут 80% выручки через 6 месяцев?
            </label>
            <Hint>
              Это может совпадать с текущими или быть новыми продуктами. Главное — честно ответить на вопрос: куда двигаться?
            </Hint>
          </div>
          <Textarea
            value={state.product.products80Future}
            onChange={(e) => updateProduct({ products80Future: e.target.value })}
            placeholder="Какие продукты станут ядром бизнеса через полгода?"
          />
        </div>

        {/* Question 6 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-[var(--text)]">
              6. Что я делаю, что рынку вообще не нужно?
            </label>
            <Hint>
              Честный взгляд: какие продукты/услуги тянут время и ресурсы, но не приносят денег и не нужны клиентам? От чего можно отказаться?
            </Hint>
          </div>
          <Textarea
            value={state.product.whatMarketDoesntNeed}
            onChange={(e) => updateProduct({ whatMarketDoesntNeed: e.target.value })}
            placeholder="Что можно смело убрать из продуктовой линейки?"
          />
        </div>

        {/* Question 7 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-[var(--text)]">
              7. Фраза о продукте за 7 секунд
            </label>
            <Hint>
              Короткая, конкретная, цепляющая. "Помогаем X получить Y через Z". Без воды и общих слов.
            </Hint>
          </div>
          <Textarea
            value={state.product.sevenSecondPitch}
            onChange={(e) => updateProduct({ sevenSecondPitch: e.target.value })}
            placeholder="Как бы вы описали продукт за 7 секунд незнакомцу?"
            className="min-h-[80px]"
          />
        </div>

        {/* Example Toggle */}
        <div>
          <Button
            variant="ghost"
            onClick={() => setShowExample(!showExample)}
            className="w-full"
          >
            {showExample ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            {showExample ? 'Скрыть пример' : 'Показать пример заполнения'}
          </Button>
          
          {showExample && (
            <div className="mt-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] whitespace-pre-wrap font-mono">
              {exampleText}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
