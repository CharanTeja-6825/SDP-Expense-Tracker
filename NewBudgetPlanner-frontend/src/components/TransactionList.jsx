import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

const TransactionList = () => {
  const { income, expenses, deleteIncome, deleteExpense } = useBudget();
  const [deletingItems, setDeletingItems] = useState(new Set());

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteIncome = async (id, source, amount) => {
    // Double verification - confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this income?\n\nSource: ${source}\nAmount: $${amount}\n\nThis action cannot be undone.`
    );
    
    if (!confirmDelete) {
      return; // User cancelled deletion
    }

    setDeletingItems(prev => new Set(prev).add(`income-${id}`));
    const result = await deleteIncome(id);
    if (!result.success) {
      console.error('Failed to delete income:', result.error);
      // Show error to user
      alert('Failed to delete income: ' + (result.error || 'Unknown error'));
    }
    setDeletingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(`income-${id}`);
      return newSet;
    });
  };

  const handleDeleteExpense = async (id, description, amount) => {
    // Double verification - confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this expense?\n\nDescription: ${description}\nAmount: $${amount}\n\nThis action cannot be undone.`
    );
    
    if (!confirmDelete) {
      return; // User cancelled deletion
    }

    setDeletingItems(prev => new Set(prev).add(`expense-${id}`));
    const result = await deleteExpense(id);
    if (!result.success) {
      console.error('Failed to delete expense:', result.error);
      // Show error to user
      alert('Failed to delete expense: ' + (result.error || 'Unknown error'));
    }
    setDeletingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(`expense-${id}`);
      return newSet;
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Transactions</h3>
      
      {/* Income List */}
      {income.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-green-600 mb-3">Income</h4>
          <div className="space-y-2">
            {income.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium text-gray-800">{item.source}</p>
                  <p className="text-sm text-gray-500">{formatDate(item.date)} • {item.frequency}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-green-600">+${item.amount.toFixed(2)}</span>
                  <button
                    onClick={() => handleDeleteIncome(item.id, item.source, item.amount)}
                    disabled={deletingItems.has(`income-${item.id}`)}
                    className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
                    title="Delete income"
                  >
                    {deletingItems.has(`income-${item.id}`) ? '...' : '✕'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense List */}
      {expenses.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-red-600 mb-3">Expenses</h4>
          <div className="space-y-2">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(expense.date)} • {expense.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-red-600">-${expense.amount.toFixed(2)}</span>
                  <button
                    onClick={() => handleDeleteExpense(expense.id, expense.description, expense.amount)}
                    disabled={deletingItems.has(`expense-${expense.id}`)}
                    className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
                    title="Delete expense"
                  >
                    {deletingItems.has(`expense-${expense.id}`) ? '...' : '✕'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {income.length === 0 && expenses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions yet. Start by adding some income or expenses!</p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
