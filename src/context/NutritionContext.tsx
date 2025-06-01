import React, { createContext, useContext, useState } from 'react';

export interface Meal {
  id: string;
  name: string;
  description: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  imageUrl: string;
  preparation: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  servingSize: string;
  category: string;
  imageUrl?: string;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface NutritionContextType {
  currentMealPlan: MealPlan | null;
  recentFoodItems: FoodItem[];
  savedMeals: Meal[];
  analyzedFoods: FoodItem[];
  generateMealPlan: () => Promise<void>;
  analyzeFood: (input: string | File) => Promise<FoodItem>;
  saveMeal: (meal: Meal) => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

// Mock food database
const mockFoodDatabase: FoodItem[] = [
  {
    id: '1',
    name: 'Apple',
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    fiber: 4.4,
    sugar: 19,
    servingSize: '1 medium (182g)',
    category: 'Fruits',
    imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    servingSize: '100g, cooked',
    category: 'Protein',
    imageUrl: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Biryani',
    calories: 400,
    protein: 15,
    carbs: 45,
    fat: 18,
    fiber: 3,
    sugar: 2,
    servingSize: '1 cup (250g)',
    category: 'Main Dishes',
    imageUrl: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Salmon Fillet',
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0,
    servingSize: '100g',
    category: 'Protein',
    imageUrl: 'https://images.pexels.com/photos/3296280/pexels-photo-3296280.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Quinoa',
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    servingSize: '100g, cooked',
    category: 'Grains',
    imageUrl: 'https://images.pexels.com/photos/7421213/pexels-photo-7421213.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    name: 'Shawarma',
    calories: 380,
    protein: 24,
    carbs: 28,
    fat: 20,
    fiber: 4,
    sugar: 3,
    servingSize: '1 regular wrap (250g)',
    category: 'Main Dishes',
    imageUrl: 'https://images.pexels.com/photos/6697455/pexels-photo-6697455.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

// Mock meals data
const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Greek Yogurt Parfait',
    description: 'Creamy yogurt with fresh berries and honey',
    type: 'breakfast',
    calories: 320,
    protein: 18,
    carbs: 42,
    fat: 8,
    ingredients: ['Greek yogurt', 'Mixed berries', 'Honey', 'Granola'],
    imageUrl: 'https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=600',
    preparation: 'Layer yogurt, berries, and granola in a glass. Drizzle with honey.'
  },
  {
    id: '2',
    name: 'Mediterranean Chickpea Salad',
    description: 'Refreshing salad with chickpeas, vegetables, and feta',
    type: 'lunch',
    calories: 420,
    protein: 15,
    carbs: 52,
    fat: 18,
    ingredients: ['Chickpeas', 'Cucumber', 'Cherry tomatoes', 'Red onion', 'Feta cheese', 'Olive oil', 'Lemon juice'],
    imageUrl: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=600',
    preparation: 'Combine all ingredients in a bowl and toss with olive oil and lemon juice.'
  },
  {
    id: '3',
    name: 'Grilled Salmon with Asparagus',
    description: 'Omega-rich salmon with roasted asparagus',
    type: 'dinner',
    calories: 520,
    protein: 40,
    carbs: 12,
    fat: 32,
    ingredients: ['Salmon fillet', 'Asparagus', 'Lemon', 'Olive oil', 'Garlic', 'Dill'],
    imageUrl: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=600',
    preparation: 'Season salmon and asparagus with olive oil, garlic, and herbs. Grill salmon and roast asparagus at 400°F for 12 minutes.'
  }
];

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMealPlan, setCurrentMealPlan] = useState<MealPlan | null>(null);
  const [recentFoodItems, setRecentFoodItems] = useState<FoodItem[]>([mockFoodDatabase[0], mockFoodDatabase[1]]);
  const [savedMeals, setSavedMeals] = useState<Meal[]>(mockMeals);
  const [analyzedFoods, setAnalyzedFoods] = useState<FoodItem[]>([]);
  
  const generateMealPlan = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newMealPlan: MealPlan = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      meals: mockMeals,
      totalCalories: mockMeals.reduce((sum, meal) => sum + meal.calories, 0),
      totalProtein: mockMeals.reduce((sum, meal) => sum + meal.protein, 0),
      totalCarbs: mockMeals.reduce((sum, meal) => sum + meal.carbs, 0),
      totalFat: mockMeals.reduce((sum, meal) => sum + meal.fat, 0)
    };
    
    setCurrentMealPlan(newMealPlan);
  };
  
  const analyzeFood = async (input: string | File): Promise<FoodItem> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let analyzedFood: FoodItem;
    
    if (typeof input === 'string') {
      // Search in mock database based on input text
      const searchTerm = input.toLowerCase().trim();
      const foundFood = mockFoodDatabase.find(food => 
        food.name.toLowerCase().includes(searchTerm)
      );
      
      if (!foundFood) {
        throw new Error(`Food item "${input}" not found in database`);
      }
      
      analyzedFood = foundFood;
    } else {
      // For image upload, randomly select a food item to simulate image recognition
      const randomIndex = Math.floor(Math.random() * mockFoodDatabase.length);
      analyzedFood = mockFoodDatabase[randomIndex];
    }
    
    setAnalyzedFoods(prev => [analyzedFood, ...prev]);
    setRecentFoodItems(prev => [analyzedFood, ...prev.slice(0, 4)]);
    return analyzedFood;
  };
  
  const saveMeal = (meal: Meal) => {
    setSavedMeals(prev => [meal, ...prev]);
  };
  
  return (
    <NutritionContext.Provider value={{
      currentMealPlan,
      recentFoodItems,
      savedMeals,
      analyzedFoods,
      generateMealPlan,
      analyzeFood,
      saveMeal
    }}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};