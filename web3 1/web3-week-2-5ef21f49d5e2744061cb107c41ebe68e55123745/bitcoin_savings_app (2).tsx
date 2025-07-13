import React, { useState } from 'react';
import { Wallet, TrendingUp, Calendar, Target, Settings, Plus, Bitcoin, DollarSign, BarChart3, Clock, CheckCircle, ArrowUp, ArrowDown, PiggyBank, Zap, AlertTriangle } from 'lucide-react';

const BitcoinSavingsApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [btcBalance] = useState(0.00234567);
  const [btcUsdValue] = useState(1247.89);
  const [savingsBalance] = useState(850.00);
  const [totalInvested] = useState(1800.00);
  const [monthlySavings] = useState(200);
  const [savingsGoal] = useState(10000);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [investmentMode, setInvestmentMode] = useState('btc'); // 'btc' ou 'savings'
  
  // Dados de performance
  const savingsYield = 0.125; // 12.5% ao ano da poupança
  const btcYield = 0.45; // 45% de retorno do Bitcoin
  const inflationRate = 0.048; // 4.8% inflação anual
  const savingsRealYield = savingsYield - inflationRate; // Rendimento real da poupança
  
  const totalBalance = btcUsdValue + savingsBalance;
  const totalGain = totalBalance - totalInvested;
  const totalYield = (totalGain / totalInvested) * 100;
  
  // Simulação se todo dinheiro estivesse na poupança
  const ifAllInSavings = totalInvested * (1 + savingsYield);
  const extraGainVsSavings = totalBalance - ifAllInSavings;
  
  const transactions = [
    { date: '2025-01-15', amount: 50, btc: 0.00089, price: 56180, type: 'btc' },
    { date: '2025-01-10', amount: 100, btc: 0, price: 0, type: 'savings' },
    { date: '2025-01-01', amount: 100, btc: 0.00178, price: 56250, type: 'btc' },
    { date: '2024-12-15', amount: 50, btc: 0.00094, price: 53190, type: 'btc' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Saldo Total */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Patrimônio Total</h2>
          <Wallet className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          <div className="flex items-center space-x-2">
            <span className="text-xl opacity-90">
              {totalYield >= 0 ? '+' : ''}
              {totalYield.toFixed(1)}%
            </span>
            <span className="text-sm opacity-75">
              R$ {totalGain >= 0 ? '+' : ''}{totalGain.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Comparação de Rendimentos */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Comparação de Rendimentos</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Bitcoin className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-orange-700">Bitcoin</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">+{(btcYield * 100).toFixed(1)}%</div>
            <div className="text-sm text-orange-600">R$ {btcUsdValue.toFixed(2)}</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <PiggyBank className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-700">Poupança</span>
            </div>
            <div className="text-2xl font-bold text-green-600">+{(savingsYield * 100).toFixed(1)}%</div>
            <div className="text-sm text-green-600">R$ {savingsBalance.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Ganho extra vs Poupança total:</span>
            <span className="text-lg font-bold text-blue-600">
              R$ +{extraGainVsSavings.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Distribuição de Investimentos */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Distribuição dos Investimentos</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Bitcoin</span>
            </div>
            <div className="text-right">
              <div className="font-medium">R$ {btcUsdValue.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{((btcUsdValue / totalBalance) * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Poupança</span>
            </div>
            <div className="text-right">
              <div className="font-medium">R$ {savingsBalance.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{((savingsBalance / totalBalance) * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="flex h-2 rounded-full overflow-hidden">
              <div 
                className="bg-orange-500"
                style={{ width: `${(btcUsdValue / totalBalance) * 100}%` }}
              ></div>
              <div 
                className="bg-green-500"
                style={{ width: `${(savingsBalance / totalBalance) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowAddFunds(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Investir</span>
        </button>
        <button
          onClick={() => setActiveTab('auto')}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span>Automático</span>
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
            <span>R$ {totalBalance.toLocaleString('pt-BR')} / R$ {savingsGoal.toLocaleString('pt-BR')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(totalBalance / savingsGoal) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600">
            {((totalBalance / savingsGoal) * 100).toFixed(1)}% da meta atingida
          </div>
        </div>
      </div>

      {/* Histórico Recente */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
        <div className="space-y-3">
          {transactions.slice(0, 4).map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'btc' ? 'bg-orange-100' : 'bg-green-100'
                }`}>
                  {tx.type === 'btc' ? 
                    <Bitcoin className="w-5 h-5 text-orange-500" /> : 
                    <PiggyBank className="w-5 h-5 text-green-500" />
                  }
                </div>
                <div>
                  <div className="font-medium">
                    {tx.type === 'btc' ? 'Compra Bitcoin' : 'Poupança'}
                  </div>
                  <div className="text-sm text-gray-500">{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">R$ {tx.amount}</div>
                {tx.type === 'btc' && (
                  <div className="text-sm text-gray-500">₿ {tx.btc.toFixed(8)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComparison = () => (
    <div className="space-y-6">
      {/* Alerta sobre inflação */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Impacto da Inflação</span>
        </div>
        <div className="text-sm text-yellow-700">
          Poupança rende {(savingsYield * 100).toFixed(1)}% ao ano, mas a inflação é {(inflationRate * 100).toFixed(1)}%.
          Rendimento real: {(savingsRealYield * 100).toFixed(1)}%
        </div>
      </div>

      {/* Comparação Detalhada */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Comparação Detalhada</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="font-medium text-gray-600">Investimento</div>
            <div className="font-medium text-gray-600">Bitcoin</div>
            <div className="font-medium text-gray-600">Poupança</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center py-3 border-t">
            <div className="text-sm">Rendimento anual</div>
            <div className="text-orange-600 font-bold">+{(btcYield * 100).toFixed(1)}%</div>
            <div className="text-green-600 font-bold">+{(savingsYield * 100).toFixed(1)}%</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center py-3 border-t">
            <div className="text-sm">Proteção inflação</div>
            <div className="text-orange-600 font-bold">✓ Sim</div>
            <div className="text-red-600 font-bold">✗ Não</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center py-3 border-t">
            <div className="text-sm">Volatilidade</div>
            <div className="text-orange-600 font-bold">Alta</div>
            <div className="text-green-600 font-bold">Baixa</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center py-3 border-t">
            <div className="text-sm">Liquidez</div>
            <div className="text-orange-600 font-bold">24/7</div>
            <div className="text-green-600 font-bold">Dias úteis</div>
          </div>
        </div>
      </div>

      {/* Simulação de Cenários */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Simulação - Se todo dinheiro estivesse em...</h3>
        
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-orange-700">100% Bitcoin</span>
              <span className="text-xl font-bold text-orange-600">
                R$ {(totalInvested * (1 + btcYield)).toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-orange-600">
              Diferença: R$ +{((totalInvested * (1 + btcYield)) - totalBalance).toFixed(2)}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-700">100% Poupança</span>
              <span className="text-xl font-bold text-green-600">
                R$ {ifAllInSavings.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-green-600">
              Diferença: R$ {(ifAllInSavings - totalBalance).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Estratégia Recomendada */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Estratégia Recomendada</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span>Diversifique: 60% Bitcoin, 40% Poupança</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span>Use DCA para reduzir volatilidade</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span>Mantenha reserva de emergência na poupança</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span>Revise estratégia mensalmente</span>
          </div>
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
                <span>Valor total:</span>
                <span className="font-medium">R$ {monthlySavings}/mês</span>
              </div>
              <div className="flex justify-between">
                <span>Bitcoin (60%):</span>
                <span className="font-medium">R$ {(monthlySavings * 0.6).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Poupança (40%):</span>
                <span className="font-medium">R$ {(monthlySavings * 0.4).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Próxima aplicação:</span>
                <span className="font-medium">01/02/2025</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
              Editar Distribuição
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg transition-colors">
              Pausar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Benefícios da Estratégia Mista</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Reduz risco geral do portfolio</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Mantém liquidez para emergências</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Aproveita oportunidades do Bitcoin</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Disciplina financeira automatizada</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AddFundsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Fazer Investimento</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Valor (R$)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Investir em:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInvestmentMode('btc')}
                className={`p-3 rounded-lg border transition-colors ${
                  investmentMode === 'btc' 
                    ? 'bg-orange-50 border-orange-500 text-orange-700' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Bitcoin className="w-5 h-5 mx-auto mb-1" />
                Bitcoin
              </button>
              <button
                onClick={() => setInvestmentMode('savings')}
                className={`p-3 rounded-lg border transition-colors ${
                  investmentMode === 'savings' 
                    ? 'bg-green-50 border-green-500 text-green-700' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <PiggyBank className="w-5 h-5 mx-auto mb-1" />
                Poupança
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
              Investir Agora
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
        <h1 className="text-xl font-bold text-gray-800">SmartSaver</h1>
        <p className="text-sm text-gray-600">Bitcoin + Poupança inteligente</p>
      </div>

      {/* Content */}
      <div className="px-6 py-4 pb-20">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'comparison' && renderComparison()}
        {activeTab === 'auto' && renderAutoSavings()}
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
            onClick={() => setActiveTab('comparison')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'comparison' ? 'text-blue-500 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs mt-1">Comparação</span>
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
        </div>
      </div>

      {showAddFunds && <AddFundsModal />}
    </div>
  );
};

export default BitcoinSavingsApp;