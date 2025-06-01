import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Calendar, PieChart, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useNutrition } from '../context/NutritionContext';
import FeatureCard from '../components/ui/FeatureCard';

const HomePage: React.FC = () => {
  const { user, isProfileComplete } = useUser();
  const { savedMeals } = useNutrition();
  
  return (
    <div className="animate-fade-in pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-70"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              The Smartest <span className="text-gradient">AI Nutrition</span> Assistant
            </h1>
            <p className="mt-6 text-xl text-gray-700 max-w-3xl">
              Personalized nutrition guidance powered by artificial intelligence. Get meal plans, 
              analyze foods, and reach your health goals with smart, adaptive recommendations.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link 
                to={isProfileComplete ? "/meal-planner" : "/profile"} 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                {isProfileComplete ? "Get Your Meal Plan" : "Complete Your Profile"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/food-analysis"
                className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors"
              >
                Analyze Food
                <Camera className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How NutriAI Helps You</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI assistant uses advanced technology to provide personalized nutrition guidance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Calendar className="h-8 w-8 text-green-600" />}
              title="Personalized Meal Plans"
              description="Get custom meal plans based on your dietary needs, preferences, and health goals"
              link="/meal-planner"
            />
            <FeatureCard 
              icon={<Camera className="h-8 w-8 text-green-600" />}
              title="Food Analysis"
              description="Analyze foods by taking a photo or searching our database for nutritional information"
              link="/food-analysis"
            />
            <FeatureCard 
              icon={<PieChart className="h-8 w-8 text-green-600" />}
              title="Nutrition Tracking"
              description="Track your nutrition intake and progress toward your health and fitness goals"
              link="/nutrition-tracking"
            />
            <FeatureCard 
              icon={<Utensils className="h-8 w-8 text-green-600" />}
              title="Smart Recipe Suggestions"
              description="Discover recipes tailored to your preferences and available ingredients"
              link="/recipes"
            />
          </div>
        </div>
      </section>
      
      {/* User Welcome or Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {user ? (
            <div className="bg-white rounded-xl shadow-sm p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-50 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
                <p className="mt-2 text-gray-600">
                  {isProfileComplete 
                    ? "Your personalized nutrition journey continues. Here's what's new today."
                    : "Complete your profile to get personalized nutrition recommendations."}
                </p>
                
                {isProfileComplete && (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-medium text-green-800">Today's Recommendation</h3>
                      <p className="text-sm text-gray-600 mt-1">Based on your goals, we recommend focusing on protein intake today.</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800">Meal Plan Status</h3>
                      <p className="text-sm text-gray-600 mt-1">You have a meal plan ready for this week. {savedMeals.length} meals saved.</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h3 className="font-medium text-purple-800">Nutrition Insight</h3>
                      <p className="text-sm text-gray-600 mt-1">You're 15% below your weekly protein goal. Consider adding more lean protein.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Trusted by Nutrition Experts</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                See what nutritionists and users are saying about our AI-powered nutrition assistant
              </p>
              
              <div className="mt-10 grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <img 
                        src={`https://images.pexels.com/photos/22${i}0383/pexels-photo-22${i}0383.jpeg?auto=compress&cs=tinysrgb&w=120`} 
                        alt="Testimonial" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                        <p className="text-sm text-gray-500">Registered Dietitian</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      "This AI nutrition assistant has transformed how I work with clients. The personalized meal plans and food analysis save me hours of work."
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;