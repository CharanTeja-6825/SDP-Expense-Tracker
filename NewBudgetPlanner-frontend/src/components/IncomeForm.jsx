import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

const IncomeForm = () => {
  const { addIncome } = useBudget();
  const [formData, setFormData] = useState({
    amount: '',
    source: 'Salary',
    frequency: 'Monthly',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const incomeSources = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Rental',
    'Bonus',
    'Gift',
    'Other'
  ];

  const frequencies = [
    'One-time',
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Yearly'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount) {
      setLoading(true);
      setError('');
      
      const result = await addIncome({
        source: formData.source,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        date: formData.date
      });
      
      if (result.success) {
        setFormData({
          amount: '',
          source: 'Salary',
          frequency: 'Monthly',
          date: new Date().toISOString().split('T')[0]
        });
      } else {
        setError(result.error || 'Failed to add income');
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Income</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            Income Source
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {incomeSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {frequencies.map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? 'Adding Income...' : 'Add Income'}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
