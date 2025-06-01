import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, Apple } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Apple className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NutriAI</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search foods, recipes..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
              <NavLink to="/meal-planner" current={location.pathname === "/meal-planner"}>Meal Planner</NavLink>
              <NavLink to="/food-analysis" current={location.pathname === "/food-analysis"}>Food Analysis</NavLink>
            </nav>
            
            <Link 
              to="/profile" 
              className="flex items-center p-1 rounded-full bg-green-50 hover:bg-green-100 transition-all"
            >
              {user?.avatar ? (
                <img src={user.avatar} className="h-8 w-8 rounded-full" alt="Profile" />
              ) : (
                <User className="h-6 w-6 text-green-600" />
              )}
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" current={location.pathname === "/"}>Home</MobileNavLink>
            <MobileNavLink to="/meal-planner" current={location.pathname === "/meal-planner"}>Meal Planner</MobileNavLink>
            <MobileNavLink to="/food-analysis" current={location.pathname === "/food-analysis"}>Food Analysis</MobileNavLink>
            <MobileNavLink to="/profile" current={location.pathname === "/profile"}>My Profile</MobileNavLink>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => (
  <Link
    to={to}
    className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
      current
        ? 'text-green-700 bg-green-50'
        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ to, current, children }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      current
        ? 'text-green-700 bg-green-50'
        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;