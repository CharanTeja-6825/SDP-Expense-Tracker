import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth status
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  // If user is logged in, show dashboard
  if (user) {
    return <Dashboard />;
  }

  // If user is not logged in, show appropriate page
  switch (currentPage) {
    case 'login':
      return <Login onLoginSuccess={() => setCurrentPage('dashboard')} setCurrentPage={setCurrentPage} />;
    case 'register':
      return <Register onRegisterSuccess={() => setCurrentPage('dashboard')} setCurrentPage={setCurrentPage} />;
    case 'landing':
    default:
      return <LandingPage setCurrentPage={setCurrentPage} />;
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
