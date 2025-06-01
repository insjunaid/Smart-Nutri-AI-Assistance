import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  Camera, 
  Utensils, 
  PieChart, 
  Heart, 
  ShoppingCart, 
  BookOpen, 
  Settings 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block fixed top-16 left-0 w-64 h-full bg-white shadow-sm overflow-y-auto">
      <div className="py-6">
        <div className="px-6 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </h2>
          <nav className="mt-3 space-y-1">
            <SidebarLink to="/meal-planner" icon={<Calendar />} label="Meal Planner" />
            <SidebarLink to="/food-analysis" icon={<Camera />} label="Food Analysis" />
            <SidebarLink to="/recipes" icon={<Utensils />} label="Recipes" />
            <SidebarLink to="/nutrition-tracking" icon={<PieChart />} label="Nutrition Tracking" />
          </nav>
        </div>

        <div className="px-6 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Personal
          </h2>
          <nav className="mt-3 space-y-1">
            <SidebarLink to="/health-goals" icon={<Heart />} label="Health Goals" />
            <SidebarLink to="/shopping-list" icon={<ShoppingCart />} label="Shopping List" />
            <SidebarLink to="/nutrition-education" icon={<BookOpen />} label="Learn" />
            <SidebarLink to="/profile" icon={<Settings />} label="Settings" />
          </nav>
        </div>

        <div className="px-6">
          <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4">
            <h3 className="font-medium text-green-800">Need help with nutrition?</h3>
            <p className="text-sm text-gray-600 mt-1">Our AI assistant is here to answer your questions.</p>
            <button className="mt-3 w-full py-2 px-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors">
              Ask NutriAI
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'text-green-700 bg-green-50'
          : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
      }`
    }
  >
    <span className="mr-3 h-5 w-5">{icon}</span>
    {label}
  </NavLink>
);

export default Sidebar;