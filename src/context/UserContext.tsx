import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  fitnessGoals: string[];
  mealPreferences: {
    cuisines: string[];
    mealSize: 'small' | 'medium' | 'large';
    mealFrequency: number;
  };
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: 'male' | 'female' | 'other';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
  avatar?: string;
  preferences: UserPreferences;
}

interface UserContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isProfileComplete: boolean;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data
const mockUser: UserProfile = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  age: 32,
  weight: 70,
  height: 175,
  gender: 'male',
  activityLevel: 'moderate',
  avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
  preferences: {
    dietaryRestrictions: ['vegetarian'],
    allergies: ['peanuts'],
    fitnessGoals: ['weight loss', 'muscle gain'],
    mealPreferences: {
      cuisines: ['mediterranean', 'asian', 'mexican'],
      mealSize: 'medium',
      mealFrequency: 3
    }
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  
  useEffect(() => {
    // Simulate loading user data from API/localStorage
    setTimeout(() => {
      setUser(mockUser);
    }, 500);
  }, []);
  
  useEffect(() => {
    if (user) {
      const requiredFields = ['name', 'email', 'age', 'weight', 'height', 'gender', 'activityLevel'];
      const hasAllRequiredFields = requiredFields.every(field => 
        field in user && user[field as keyof UserProfile] !== undefined
      );
      
      const hasPreferences = user.preferences && 
        user.preferences.dietaryRestrictions.length > 0 &&
        user.preferences.fitnessGoals.length > 0;
        
      setIsProfileComplete(hasAllRequiredFields && hasPreferences);
    }
  }, [user]);
  
  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences
        }
      });
    }
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, isProfileComplete, updateUserPreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};