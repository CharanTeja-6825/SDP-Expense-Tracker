// API base URL - adjust this to match your backend
const API_BASE_URL = import.meta.env.VITE_API_URL;

// API service class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
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
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      // Handle different response types
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User Authentication APIs
  async register(userData) {
    return this.request('/user-api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(username, password) {
    return this.request(`/user-api/login/${username}/${password}`, {
      method: 'GET',
    });
  }

  // Income APIs
  async createIncome(incomeData) {
    return this.request('/income-api/create', {
      method: 'POST',
      body: JSON.stringify(incomeData),
    });
  }

  async getAllIncomes(userId) {
    return this.request(`/income-api/getAll/${userId}`, {
      method: 'GET',
    });
  }

  async getTotalIncome(userId) {
    return this.request(`/income-api/total/${userId}`, {
      method: 'GET',
    });
  }

  async deleteIncome(userId, incomeId) {
    return this.request(`/income-api/user/${userId}/income/${incomeId}`, {
      method: 'DELETE',
    });
  }

  // Expense APIs
  async createExpense(expenseData) {
    return this.request('/expense-api/create', {
      method: 'POST',
      body: JSON.stringify(expenseData),
    });
  }

  async getAllExpenses(userId) {
    return this.request(`/expense-api/getAll/user/${userId}`, {
      method: 'GET',
    });
  }

  async getTotalExpenses(userId) {
    return this.request(`/expense-api/total/${userId}`, {
      method: 'GET',
    });
  }

  async deleteExpense(userId, expenseId) {
    return this.request(`/expense-api/user/${userId}/expense/${expenseId}`, {
      method: 'DELETE',
    });
  }

  // Savings Goals APIs
  async createSavingGoal(goalData) {
    return this.request('/goal-api/create', {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  }

  async getAllSavingGoals(userId) {
    return this.request(`/goal-api/getAll/${userId}`, {
      method: 'GET',
    });
  }

  async deleteSavingGoal(userId, goalId) {
    return this.request(`/goal-api/user/${userId}/goal/${goalId}`, {
      method: 'DELETE',
    });
  }

  async addAmountToGoal(userId, goalId, amount) {
    return this.request(`/goal-api/addamount/user/${userId}/goal/${goalId}/amount/${amount}`, {
      method: 'PUT',
    });
  }
}

// Create a singleton instance
const apiService = new ApiService();
export default apiService;
