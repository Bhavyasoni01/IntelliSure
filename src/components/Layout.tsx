import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Home, FileText, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center px-4 hover:text-blue-600"
              >
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => navigate('/new-claim')}
                className="flex items-center px-4 hover:text-blue-600"
              >
                <FileText className="h-5 w-5 mr-2" />
                New Claim
              </button>
              <button
                onClick={() => navigate('/previous-claims')}
                className="flex items-center px-4 hover:text-blue-600"
              >
                <FileText className="h-5 w-5 mr-2" />
                Previous Claims
              </button>
              <button
                onClick={() => navigate('/account')}
                className="flex items-center px-4 hover:text-blue-600"
              >
                <User className="h-5 w-5 mr-2" />
                Account
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 hover:text-red-600"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;