import React from 'react';
import { useAuth } from '../context/AuthContext';

function LandingPage({ setCurrentPage }) {
  const { loading } = useAuth();

  const features = [
    {
      title: "Income & Expense Tracking",
      description: "Easily track your income and expenses in one place. Categorize transactions and maintain a clear financial record.",
      icon: "💰"
    },
    {
      title: "Budget Analytics",
      description: "View detailed charts and reports of your spending patterns. Make informed decisions with visual insights.",
      icon: "📊"
    },
    {
      title: "Savings Goals",
      description: "Set and track your savings goals. Watch your progress and stay motivated to achieve your financial targets.",
      icon: "🎯"
    },
    {
      title: "Smart Categories",
      description: "Organize your expenses with intelligent categories. Understand where your money goes with detailed breakdowns.",
      icon: "📑"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      text: "This budget planner has transformed how I manage both my personal and business finances. The insights are invaluable!",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      text: "The interface is intuitive and the features are exactly what I needed. It's helped me save more than ever before.",
      avatar: "MC"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">💰 BudgetPlanner</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage('about')} className="text-gray-600 hover:text-gray-900">
                About
              </button>
              <button onClick={() => setCurrentPage('login')} className="text-gray-600 hover:text-gray-900">
                Login
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Take Control of Your Finances
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Smart budgeting tools to help you track, save, and grow your money
            </p>
            <button
              onClick={() => setCurrentPage('register')}
              className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Your Financial Journey
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features that Empower You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who have transformed their financial life
          </p>
          <button
            onClick={() => setCurrentPage('register')}
            className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Create Free Account
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">BudgetPlanner</h3>
              <p className="text-gray-400">
                Your trusted partner in personal finance management.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('login')} className="text-gray-400 hover:text-white">
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('register')} className="text-gray-400 hover:text-white">
                    Register
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Email: support@budgetplanner.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BudgetPlanner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;