import React, { useState } from 'react';
import { Wallet, TrendingUp, Calendar, Target, Settings, Plus, Bitcoin, DollarSign, BarChart3, Clock, CheckCircle } from 'lucide-react';

const BitcoinSavingsApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [btcBalance] = useState(0.00234567);
  const [usdValue] = useState(1247.89);
  const [monthlySavings] = useState(200);
  const [savingsGoal] = useState(10000);
  const [showAddFunds, setShowAddFunds] = useState(false);

  const transactions = [
    { date: '2025-01-15', amount: 50, btc: 0.00089, price: 56180 },
    { date: '2025-01-01', amount: 100, btc: 0.00178, price: 56250 },
    { date: '2024-12-15', amount: 50, btc: 0.00094, price: 53190 },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Saldo Principal */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Sua Poupança Bitcoin</h2>
          <Bitcoin className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold">₿ {btcBalance.toFixed(8)}</div>
          <div className="text-xl opacity-90">R$ {usdValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          <div className="text-sm opacity-75">+12.5% este mês</div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowAddFunds(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Fundos</span>
        </button>
        <button
          onClick={() => setActiveTab('auto')}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span>Aporte Automático</span>
        </button>
      </div>

      {/* Meta de Poupança */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Meta de Poupança</h3>
          <Target className="w-6 h-6 text-purple-500" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>R$ {usdValue.toLocaleString('pt-BR')} / R$ {savingsGoal.toLocaleString('pt-BR')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(usdValue / savingsGoal) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600">
            {((usdValue / savingsGoal) * 100).toFixed(1)}% da meta atingida
          </div>
        </div>
      </div>

      {/* Histórico Recente */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="font-medium">Compra Automática</div>
                  <div className="text-sm text-gray-500">{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">R$ {tx.amount}</div>
                <div className="text-sm text-gray-500">₿ {tx.btc.toFixed(8)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAutoSavings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Aporte Automático</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">Ativo</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Configuração Atual</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Valor:</span>
                <span className="font-medium">R$ {monthlySavings}/mês</span>
              </div>
              <div className="flex justify-between">
                <span>Frequência:</span>
                <span className="font-medium">Todo dia 1</span>
              </div>
              <div className="flex justify-between">
                <span>Próxima compra:</span>
                <span className="font-medium">01/02/2025</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
              Editar Valor
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg transition-colors">
              Pausar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Estratégia DCA</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Compras regulares reduzem volatilidade</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Média de preços ao longo do tempo</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Disciplina financeira automatizada</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <span className="font-semibold">Retorno Total</span>
          </div>
          <div className="text-2xl font-bold text-green-600">+12.5%</div>
          <div className="text-sm text-gray-500">R$ 139.89</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-blue-500" />
            <span className="font-semibold">Tempo Médio</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">3.2 meses</div>
          <div className="text-sm text-gray-500">Holding period</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Histórico de Compras</h3>
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
              <div>
                <div className="font-medium">{tx.date}</div>
                <div className="text-sm text-gray-500">Preço: R$ {tx.price.toLocaleString('pt-BR')}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">R$ {tx.amount}</div>
                <div className="text-sm text-gray-500">₿ {tx.btc.toFixed(8)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AddFundsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Adicionar Fundos</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Valor (R$)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="100"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
              Comprar Agora
            </button>
            <button
              onClick={() => setShowAddFunds(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">BitcoinSaver</h1>
        <p className="text-sm text-gray-600">Sua poupança em Bitcoin</p>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'auto' && renderAutoSavings()}
        {activeTab === 'stats' && renderStats()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white border-t px-6 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'text-blue-500 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs mt-1">Início</span>
          </button>
          <button
            onClick={() => setActiveTab('auto')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'auto' ? 'text-blue-500 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Automático</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'stats' ? 'text-blue-500 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs mt-1">Estatísticas</span>
          </button>
        </div>
      </div>

      {showAddFunds && <AddFundsModal />}
    </div>
  );
};

export default BitcoinSavingsApp;