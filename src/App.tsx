import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MealPlannerPage from './pages/MealPlannerPage';
import FoodAnalysisPage from './pages/FoodAnalysisPage';
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from './context/UserContext';
import { NutritionProvider } from './context/NutritionContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <NutritionProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/meal-planner" element={<MealPlannerPage />} />
              <Route path="/food-analysis" element={<FoodAnalysisPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Layout>
        </NutritionProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;