import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          // You can add a backend API call here to validate the token if needed
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Session validation failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    validateSession();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      // Call backend API
      const response = await authAPI.login(username, password);
      
      // Store user data and token
      const userData = {
        id: response.id,
        name: response.name,
        username: response.username || username
      };
      setUser(userData);
      
      // Store token and user data
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Login failed. Please check your credentials.' };
    }
  };

  const register = async (name, username, password) => {
    setLoading(true);
    try {
      // Call backend API
      const response = await authAPI.register(name, username, password);
      
      // Store user data and token
      setUser({
        id: response.id,
        name: response.name,
        username: response.username || username
      });
      
      // Store token if provided
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
