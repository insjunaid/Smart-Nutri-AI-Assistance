import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {!isHomePage && <Sidebar />}
        <main className={`flex-1 ${isHomePage ? 'px-4' : 'px-6'} py-8`}>
          <div className={`max-w-7xl mx-auto ${isHomePage ? '' : 'ml-0 lg:ml-64'} transition-all duration-300`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;