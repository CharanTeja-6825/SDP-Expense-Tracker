// API service for backend integration
const API_BASE_URL = 'http://localhost:1430';

// Simple fetch wrapper
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Details (${response.status}):`, errorText);
      throw new Error(`API call failed: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: async (username, password) => {
    return apiCall(`/user-api/login/${username}/${password}`, {
      method: 'GET',
    });
  },
  
  register: async (userData) => {
    return apiCall('/user-api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
};

// Budget API calls
export const budgetAPI = {
  // Income APIs
  getIncomes: (userId) => apiCall(`/income-api/getAll/${userId}`),
  createIncome: (income) => apiCall('/income-api/create', {
    method: 'POST',
    body: JSON.stringify(income),
  }),
  deleteIncome: (userId, incomeId) => apiCall(`/income-api/user/${userId}/income/${incomeId}`, {
    method: 'DELETE',
  }),
  getTotalIncome: (userId) => apiCall(`/income-api/total/${userId}`),

  // Expense APIs
  getExpenses: (userId) => apiCall(`/expense-api/getAll/user/${userId}`),
  createExpense: (expense) => apiCall('/expense-api/create', {
    method: 'POST',
    body: JSON.stringify(expense),
  }),
  deleteExpense: (userId, expenseId) => apiCall(`/expense-api/user/${userId}/expense/${expenseId}`, {
    method: 'DELETE',
  }),
  getTotalExpense: (userId) => apiCall(`/expense-api/total/${userId}`),

  // Savings Goals APIs
  getSavingsGoals: (userId) => apiCall(`/goal-api/getAll/${userId}`),
  createSavingsGoal: (goal) => apiCall('/goal-api/create', {
    method: 'POST',
    body: JSON.stringify(goal),
  }),
  addAmountToGoal: (userId, goalId, amount) => apiCall(`/goal-api/addamount/user/${userId}/goal/${goalId}/amount/${amount}`, {
    method: 'PUT',
  }),
  deleteSavingsGoal: (userId, goalId) => apiCall(`/goal-api/user/${userId}/goal/${goalId}`, {
    method: 'DELETE',
  }),
};
