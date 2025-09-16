import React, { useState } from 'react';
import { BudgetProvider, useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import IncomeForm from '../components/IncomeForm';
import ExpenseForm from '../components/ExpenseForm';
import BudgetSummary from '../components/BudgetSummary';
import TransactionList from '../components/TransactionList';
import SavingsGoals from '../components/SavingsGoals';
import ExpenseChart from '../components/ExpenseChart';

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();
  const { loading } = useBudget();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'income', name: 'Income', icon: '💰' },
    { id: 'expenses', name: 'Expenses', icon: '💸' },
    { id: 'savings', name: 'Savings', icon: '🎯' },
    { id: 'analytics', name: 'Analytics', icon: '📈' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your budget data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">💰 Budget Planner</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <BudgetSummary />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransactionList />
              <ExpenseChart />
            </div>
          </div>
        )}

        {activeTab === 'income' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncomeForm />
            <TransactionList />
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpenseForm />
            <TransactionList />
          </div>
        )}

        {activeTab === 'savings' && (
          <div className="space-y-6">
            <SavingsGoals />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetSummary />
              <ExpenseChart />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const Dashboard = () => {
  return (
    <BudgetProvider>
      <DashboardContent />
    </BudgetProvider>
  );
};

export default Dashboard;
