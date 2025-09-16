import React from 'react';
import { useBudget } from '../context/BudgetContext';

const ExpenseChart = () => {
  const { getExpensesByCategory, getTotalExpenses } = useBudget();
  
  const expensesByCategory = getExpensesByCategory();
  const totalExpenses = getTotalExpenses();
  
  if (totalExpenses === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Breakdown</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No expenses to display yet.</p>
        </div>
      </div>
    );
  }

  // Simple color palette for categories
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0'
  ];

  const categoryData = Object.entries(expensesByCategory).map(([category, amount], index) => ({
    category,
    amount,
    percentage: (amount / totalExpenses * 100).toFixed(1),
    color: colors[index % colors.length]
  }));

  // Simple pie chart using CSS and basic calculations
  let cumulativePercentage = 0;
  const pieSlices = categoryData.map((data, index) => {
    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
    const endAngle = (cumulativePercentage + parseFloat(data.percentage)) * 3.6;
    cumulativePercentage += parseFloat(data.percentage);
    
    return {
      ...data,
      startAngle,
      endAngle
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Breakdown</h3>
      
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Simple Pie Chart */}
        <div className="relative">
          <div className="w-48 h-48 rounded-full overflow-hidden" style={{
            background: `conic-gradient(${pieSlices.map(slice => 
              `${slice.color} ${slice.startAngle}deg ${slice.endAngle}deg`
            ).join(', ')})`
          }}>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">${totalExpenses.toFixed(0)}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {categoryData.map((data, index) => (
            <div key={data.category} className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-sm" 
                style={{ backgroundColor: data.color }}
              ></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">{data.category}</div>
                <div className="text-xs text-gray-500">
                  ${data.amount.toFixed(2)} ({data.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Bars */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-700 mb-4">Category Details</h4>
        <div className="space-y-3">
          {categoryData.map((data) => (
            <div key={data.category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{data.category}</span>
                <span className="font-medium">${data.amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${data.percentage}%`,
                    backgroundColor: data.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
