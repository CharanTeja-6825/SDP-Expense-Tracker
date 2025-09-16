import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { budgetAPI } from '../services/api';
import { useAuth } from './AuthContext';

// Initial state
const initialState = {
  income: [],
  expenses: [],
  savingsGoals: [],
  loading: false,
  categories: [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ]
};

// Action types
const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_INCOME: 'SET_INCOME',
  SET_EXPENSES: 'SET_EXPENSES',
  SET_SAVINGS_GOALS: 'SET_SAVINGS_GOALS',
  ADD_INCOME: 'ADD_INCOME',
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_SAVINGS_GOAL: 'ADD_SAVINGS_GOAL',
  DELETE_INCOME: 'DELETE_INCOME',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  DELETE_SAVINGS_GOAL: 'DELETE_SAVINGS_GOAL',
  UPDATE_SAVINGS_GOAL: 'UPDATE_SAVINGS_GOAL'
};

// Reducer function
const budgetReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.SET_INCOME:
      return { ...state, income: action.payload };
    case ACTION_TYPES.SET_EXPENSES:
      return { ...state, expenses: action.payload };
    case ACTION_TYPES.SET_SAVINGS_GOALS:
      return { ...state, savingsGoals: action.payload };
    case ACTION_TYPES.ADD_INCOME:
      return { ...state, income: [...state.income, action.payload] };
    case ACTION_TYPES.ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case ACTION_TYPES.ADD_SAVINGS_GOAL:
      return { ...state, savingsGoals: [...state.savingsGoals, action.payload] };
    case ACTION_TYPES.DELETE_INCOME:
      return { 
        ...state, 
        income: state.income.filter(item => item.id !== action.payload) 
      };
    case ACTION_TYPES.DELETE_EXPENSE:
      return { 
        ...state, 
        expenses: state.expenses.filter(item => item.id !== action.payload) 
      };
    case ACTION_TYPES.DELETE_SAVINGS_GOAL:
      return { 
        ...state, 
        savingsGoals: state.savingsGoals.filter(item => item.id !== action.payload) 
      };
    case ACTION_TYPES.UPDATE_SAVINGS_GOAL:
      return {
        ...state,
        savingsGoals: state.savingsGoals.map(goal =>
          goal.id === action.payload.id ? action.payload : goal
        )
      };
    default:
      return state;
  }
};

// Create context
const BudgetContext = createContext();

// Context provider component
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const { user } = useAuth();

  // Load data from backend when user changes
  useEffect(() => {
    if (user && user.id) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user || !user.id) return;
    
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
    try {
      const [incomes, expenses, savingsGoals] = await Promise.all([
        budgetAPI.getIncomes(user.id),
        budgetAPI.getExpenses(user.id),
        budgetAPI.getSavingsGoals(user.id)
      ]);
      
      dispatch({ type: ACTION_TYPES.SET_INCOME, payload: incomes || [] });
      dispatch({ type: ACTION_TYPES.SET_EXPENSES, payload: expenses || [] });
      dispatch({ type: ACTION_TYPES.SET_SAVINGS_GOALS, payload: savingsGoals || [] });
    } catch (error) {
      console.error('Error loading budget data:', error);
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    }
  };

  // Helper functions with backend integration
  const addIncome = async (incomeData) => {
    if (!user || !user.id) return { success: false, error: 'User not logged in' };
    
    try {
      // Map frontend data to backend model structure
      const income = {
        source: incomeData.source,
        amount: incomeData.amount,
        frequency: incomeData.frequency || 'One-time',
        date: incomeData.date,
        user: { id: user.id }
      };
      
      console.log('Sending income data:', income);
      console.log('User ID:', user.id);
      
      const newIncome = await budgetAPI.createIncome(income);
      dispatch({ type: ACTION_TYPES.ADD_INCOME, payload: newIncome });
      return { success: true };
    } catch (error) {
      console.error('Error adding income:', error);
      return { success: false, error: error.message || 'Failed to add income' };
    }
  };

  const addExpense = async (expenseData) => {
    if (!user || !user.id) return { success: false, error: 'User not logged in' };
    
    try {
      // Map frontend data to backend model structure
      const expense = {
        description: expenseData.description,
        amount: expenseData.amount,
        category: expenseData.category,
        date: expenseData.date,
        user: { id: user.id }
      };
      
      const newExpense = await budgetAPI.createExpense(expense);
      dispatch({ type: ACTION_TYPES.ADD_EXPENSE, payload: newExpense });
      return { success: true };
    } catch (error) {
      console.error('Error adding expense:', error);
      return { success: false, error: error.message || 'Failed to add expense' };
    }
  };

  const addSavingsGoal = async (goalData) => {
    if (!user || !user.id) return { success: false, error: 'User not logged in' };
    
    try {
      // Map frontend data to backend model structure
      const goal = {
        goalname: goalData.name,
        targetamount: goalData.targetAmount,
        currentamount: goalData.currentAmount || 0,
        deadlinedate: goalData.deadline,
        user: { id: user.id }
      };
      
      const newGoal = await budgetAPI.createSavingsGoal(goal);
      dispatch({ type: ACTION_TYPES.ADD_SAVINGS_GOAL, payload: newGoal });
      return { success: true };
    } catch (error) {
      console.error('Error adding savings goal:', error);
      return { success: false, error: error.message || 'Failed to add savings goal' };
    }
  };

  const deleteIncome = async (id) => {
    if (!user || !user.id) return { success: false, error: 'User not logged in' };
    
    try {
      await budgetAPI.deleteIncome(user.id, id);
      dispatch({ type: ACTION_TYPES.DELETE_INCOME, payload: id });
      return { success: true };
    } catch (error) {
      console.error('Error deleting income:', error);
      return { success: false, error: error.message || 'Failed to delete income' };
    }
  };

  const deleteExpense = async (id) => {
    if (!user || !user.id) return { success: false, error: 'User not logged in' };
    
    try {
      await budgetAPI.deleteExpense(user.id, id);
      dispatch({ type: ACTION_TYPES.DELETE_EXPENSE, payload: id });
      return { success: true };
    } catch (error) {
      console.error('Error deleting expense:', error);
      return { success: false, error: error.message || 'Failed to delete expense' };
    }
  };

  const deleteSavingsGoal = async (id) => {
    if (!user || !user.id) return { success: false, error: 'User not logged in' };
    
    try {
      await budgetAPI.deleteSavingsGoal(user.id, id);
      dispatch({ type: ACTION_TYPES.DELETE_SAVINGS_GOAL, payload: id });
      return { success: true };
    } catch (error) {
      console.error('Error deleting savings goal:', error);
      return { success: false, error: error.message || 'Failed to delete savings goal' };
    }
  };

  const addAmountToSavingsGoal = async (goalId, amount) => {
    if (!user || !user.id) return { success: false, error: 'User not logged in' };
    
    try {
      await budgetAPI.addAmountToGoal(user.id, goalId, amount);
      
      // Update local state
      const updatedGoals = state.savingsGoals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            currentamount: goal.currentamount + amount
          };
        }
        return goal;
      });
      
      dispatch({ type: ACTION_TYPES.SET_SAVINGS_GOALS, payload: updatedGoals });
      return { success: true };
    } catch (error) {
      console.error('Error adding amount to savings goal:', error);
      return { success: false, error: error.message || 'Failed to add amount to savings goal' };
    }
  };

  // Calculate totals
  const getTotalIncome = () => {
    return state.income.reduce((total, item) => total + (item.amount || 0), 0);
  };

  const getTotalExpenses = () => {
    return state.expenses.reduce((total, item) => total + (item.amount || 0), 0);
  };

  const getRemainingBudget = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    state.expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });
    return categoryTotals;
  };

  const value = {
    ...state,
    addIncome,
    addExpense,
    addSavingsGoal,
    deleteIncome,
    deleteExpense,
    deleteSavingsGoal,
    addAmountToSavingsGoal,
    getTotalIncome,
    getTotalExpenses,
    getRemainingBudget,
    getExpensesByCategory,
    loadData
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook to use the budget context
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
