import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

const SavingsGoals = () => {
  const { savingsGoals, addSavingsGoal, deleteSavingsGoal, addAmountToSavingsGoal } = useBudget();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.targetAmount) {
      setLoading(true);
      setError('');
      
      const result = await addSavingsGoal({
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount) || 0,
        deadline: formData.deadline
      });
      
      if (result.success) {
        setFormData({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
        setShowForm(false);
      } else {
        setError(result.error || 'Failed to add savings goal');
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addToSavings = async (goalId, amount) => {
    const result = await addAmountToSavingsGoal(goalId, parseFloat(amount));
    if (!result.success) {
      setError(result.error || 'Failed to add amount to savings goal');
    }
  };

  const handleDeleteGoal = async (goalId, goalName, currentAmount, targetAmount) => {
    // Double verification - confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this savings goal?\n\nGoal: ${goalName}\nProgress: $${currentAmount} / $${targetAmount}\n\nThis action cannot be undone and all progress will be lost.`
    );
    
    if (!confirmDelete) {
      return; // User cancelled deletion
    }

    const result = await deleteSavingsGoal(goalId);
    if (!result.success) {
      setError(result.error || 'Failed to delete savings goal');
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Savings Goals</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {showForm ? 'Cancel' : 'Add Goal'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Emergency Fund, Vacation"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount ($)
              </label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Amount ($)
              </label>
              <input
                type="number"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 transition duration-200"
          >
            {loading ? 'Adding Goal...' : 'Add Goal'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {savingsGoals.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No savings goals yet. Add one to get started!</p>
        ) : (
          savingsGoals.map((goal) => {
            const progress = getProgressPercentage(goal.currentamount || 0, goal.targetamount || 1);
            
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-gray-800">{goal.goalname}</h4>
                  <button
                    onClick={() => handleDeleteGoal(goal.id, goal.goalname, goal.currentamount || 0, goal.targetamount)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>${goal.currentamount || 0} / ${goal.targetamount}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>Target: {formatDate(goal.deadlinedate)}</span>
                  <span className={`px-2 py-1 rounded ${
                    progress >= 100 ? 'bg-green-100 text-green-800' :
                    progress >= 50 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {progress >= 100 ? 'Complete' : 
                     progress >= 50 ? 'In Progress' : 'Just Started'}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Add amount"
                    step="0.01"
                    min="0"
                    className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        addToSavings(goal.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      if (input.value) {
                        addToSavings(goal.id, input.value);
                        input.value = '';
                      }
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavingsGoals;
