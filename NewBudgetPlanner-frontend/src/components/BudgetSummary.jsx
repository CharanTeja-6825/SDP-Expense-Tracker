import React from 'react';
import { useBudget } from '../context/BudgetContext';

const BudgetSummary = () => {
  const { 
    getTotalIncome, 
    getTotalExpenses, 
    getRemainingBudget,
    getExpensesByCategory,
    income,
    expenses 
  } = useBudget();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const remainingBudget = getRemainingBudget();
  const expensesByCategory = getExpensesByCategory();

  const isOverBudget = remainingBudget < 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Budget Summary</h3>
      
      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="text-sm font-medium text-green-600 mb-1">Total Income</h4>
          <p className="text-2xl font-bold text-green-700">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="text-sm font-medium text-red-600 mb-1">Total Expenses</h4>
          <p className="text-2xl font-bold text-red-700">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg border ${isOverBudget ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
          <h4 className={`text-sm font-medium mb-1 ${isOverBudget ? 'text-red-600' : 'text-blue-600'}`}>
            Remaining Budget
          </h4>
          <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-700' : 'text-blue-700'}`}>
            ${remainingBudget.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Overspending Alert */}
      {isOverBudget && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Warning:</strong> You are over budget by ${Math.abs(remainingBudget).toFixed(2)}!
        </div>
      )}

      {/* Expense Breakdown */}
      {Object.keys(expensesByCategory).length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-700 mb-3">Expenses by Category</h4>
          <div className="space-y-2">
            {Object.entries(expensesByCategory).map(([category, amount]) => {
              const percentage = totalExpenses > 0 ? (amount / totalExpenses * 100) : 0;
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-16 text-right">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Income Sources</p>
          <p className="text-lg font-semibold text-gray-700">{income.length}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-lg font-semibold text-gray-700">{expenses.length}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
