import React from 'react';

const Navbar = ({ setCurrentPage, currentPage }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentPage('landing')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              💰 BudgetPlanner
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('about')}
              className={`${
                currentPage === 'about' 
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => setCurrentPage('login')}
              className={`${
                currentPage === 'login'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentPage('register')}
              className={`${
                currentPage === 'register'
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } px-4 py-2 rounded-md`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;