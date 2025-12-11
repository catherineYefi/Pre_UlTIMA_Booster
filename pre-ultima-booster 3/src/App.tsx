// ============================================
// PRE-ULTIMA BOOSTER — Main App
// ============================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BoosterProvider } from './state/BoosterContext';
import { Header, Sidebar } from './components/layout/Layout';
import { DashboardPage } from './modules/booster/Dashboard/DashboardPage';
import { ProductPage } from './modules/booster/Product/ProductPage';
import { EconomyPage } from './modules/booster/Economy/EconomyPage';
import { StrategyPage } from './modules/booster/Strategy/StrategyPage';

import './styles/globals.css';
import './styles/theme.css';

const App: React.FC = () => {
  return (
    <BoosterProvider>
      <Router>
        <div className="min-h-screen bg-[var(--bg)] animated-gradient-bg">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/economy" element={<EconomyPage />} />
                <Route path="/strategy" element={<StrategyPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </BoosterProvider>
  );
};

export default App;
