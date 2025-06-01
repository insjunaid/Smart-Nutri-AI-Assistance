import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Calendar, ChevronDown, Info } from 'lucide-react';
import { useNutrition, Meal } from '../context/NutritionContext';
import { useUser } from '../context/UserContext';

const MealPlannerPage: React.FC = () => {
  const { user } = useUser();
  const { currentMealPlan, generateMealPlan, savedMeals } = useNutrition();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState('today');
  
  const handleGenerateMealPlan = async () => {
    setIsLoading(true);
    await generateMealPlan();
    setIsLoading(false);
  };
  
  return (
    <div className="pt-20 pb-10 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Meal Plan</h1>
        <p className="text-gray-600 mt-2">
          Personalized meals based on your nutrition needs and preferences
        </p>
      </header>
      
      {/* Meal Plan Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {['today', 'tomorrow', 'week'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDay === day
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleGenerateMealPlan}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="-ml-1 mr-2 h-4 w-4" />
              Generate Meal Plan
            </>
          )}
        </button>
      </div>
      
      {/* Meal Plan Content */}
      {currentMealPlan ? (
        <div className="space-y-8">
          {/* Nutrition Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Nutrition Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NutritionStat label="Calories" value={`${currentMealPlan.totalCalories} kcal`} />
              <NutritionStat label="Protein" value={`${currentMealPlan.totalProtein}g`} />
              <NutritionStat label="Carbs" value={`${currentMealPlan.totalCarbs}g`} />
              <NutritionStat label="Fat" value={`${currentMealPlan.totalFat}g`} />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <Info className="h-4 w-4 text-blue-500 mr-2" />
                <p>
                  This meal plan is optimized for {user?.preferences.fitnessGoals.join(', ')} 
                  based on your profile and preferences.
                </p>
              </div>
            </div>
          </div>
          
          {/* Meals */}
          <div className="space-y-6">
            {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
              const meal = currentMealPlan.meals.find(m => m.type === mealType);
              return meal ? <MealCard key={mealType} meal={meal} /> : null;
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Calendar className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Meal Plan Generated Yet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Click the "Generate Meal Plan" button to create a personalized meal plan based on your preferences and nutritional needs.
          </p>
          <button
            onClick={handleGenerateMealPlan}
            className="inline-flex items-center px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <RefreshCw className="-ml-1 mr-2 h-5 w-5" />
            Generate Meal Plan
          </button>
        </div>
      )}
    </div>
  );
};

interface NutritionStatProps {
  label: string;
  value: string;
}

const NutritionStat: React.FC<NutritionStatProps> = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div 
      layout
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img 
            src={meal.imageUrl} 
            alt={meal.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 mb-2">
                {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{meal.name}</h3>
              <p className="text-gray-600 mt-1">{meal.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="block text-sm font-medium text-gray-500">Calories</span>
                <span className="block text-lg font-semibold text-gray-900">{meal.calories}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {meal.ingredients.slice(0, 3).map((ingredient, i) => (
              <span key={i} className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
                {ingredient}
              </span>
            ))}
            {meal.ingredients.length > 3 && (
              <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
                +{meal.ingredients.length - 3} more
              </span>
            )}
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="block text-xs font-medium text-gray-500">Protein</span>
                  <span className="block text-sm font-semibold text-gray-900">{meal.protein}g</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Carbs</span>
                  <span className="block text-sm font-semibold text-gray-900">{meal.carbs}g</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">Fat</span>
                  <span className="block text-sm font-semibold text-gray-900">{meal.fat}g</span>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mt-4 mb-2">Preparation</h4>
              <p className="text-gray-600 text-sm">{meal.preparation}</p>
              
              <div className="mt-4 flex space-x-3">
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                  Add to Shopping List
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors">
                  Replace Meal
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MealPlannerPage;