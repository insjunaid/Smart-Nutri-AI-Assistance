import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Heart, Scale, Ruler, Activity, Utensils, Ban } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const { user, setUser, updateUserPreferences } = useUser();
  const [activeTab, setActiveTab] = useState('personal');
  
  if (!user) {
    return (
      <div className="pt-20 pb-10 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-10 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your personal information and preferences
        </p>
      </header>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-64 bg-gray-50 p-6 border-r border-gray-200">
            <div className="text-center mb-6">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full mx-auto"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <User className="h-12 w-12 text-green-600" />
                </div>
              )}
              <h2 className="mt-4 font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            
            <nav className="space-y-1">
              <NavButton 
                icon={<User className="h-5 w-5" />}
                label="Personal Information"
                active={activeTab === 'personal'}
                onClick={() => setActiveTab('personal')}
              />
              <NavButton 
                icon={<Heart className="h-5 w-5" />}
                label="Health Goals"
                active={activeTab === 'goals'}
                onClick={() => setActiveTab('goals')}
              />
              <NavButton 
                icon={<Ban className="h-5 w-5" />}
                label="Dietary Restrictions"
                active={activeTab === 'restrictions'}
                onClick={() => setActiveTab('restrictions')}
              />
              <NavButton 
                icon={<Utensils className="h-5 w-5" />}
                label="Food Preferences"
                active={activeTab === 'preferences'}
                onClick={() => setActiveTab('preferences')}
              />
            </nav>
          </div>
          
          {/* Content */}
          <div className="md:flex-1 p-6">
            {activeTab === 'personal' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            <Scale className="h-4 w-4" />
                          </span>
                        </div>
                        <input
                          type="number"
                          id="age"
                          value={user.age || ''}
                          onChange={(e) => setUser({...user, age: parseInt(e.target.value)})}
                          className="pl-10 block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="Years"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={user.gender || ''}
                        onChange={(e) => setUser({...user, gender: e.target.value as any})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                        Weight
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            <Scale className="h-4 w-4" />
                          </span>
                        </div>
                        <input
                          type="number"
                          id="weight"
                          value={user.weight || ''}
                          onChange={(e) => setUser({...user, weight: parseInt(e.target.value)})}
                          className="pl-10 block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="kg"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">kg</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                        Height
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            <Ruler className="h-4 w-4" />
                          </span>
                        </div>
                        <input
                          type="number"
                          id="height"
                          value={user.height || ''}
                          onChange={(e) => setUser({...user, height: parseInt(e.target.value)})}
                          className="pl-10 block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="cm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">cm</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
                        Activity Level
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            <Activity className="h-4 w-4" />
                          </span>
                        </div>
                        <select
                          id="activity"
                          value={user.activityLevel || ''}
                          onChange={(e) => setUser({...user, activityLevel: e.target.value as any})}
                          className="pl-10 block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
                        >
                          <option value="">Select level</option>
                          <option value="sedentary">Sedentary (little or no exercise)</option>
                          <option value="light">Lightly active (light exercise 1-3 days/week)</option>
                          <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
                          <option value="active">Active (hard exercise 6-7 days/week)</option>
                          <option value="very active">Very active (very hard exercise & physical job)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {activeTab === 'goals' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Goals</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select your primary fitness goals
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['weight loss', 'weight gain', 'muscle gain', 'maintenance', 'improved energy', 'better sleep', 'sports performance'].map((goal) => (
                        <label
                          key={goal}
                          className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            user.preferences.fitnessGoals.includes(goal)
                              ? 'bg-green-50 border-2 border-green-500'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={user.preferences.fitnessGoals.includes(goal)}
                            onChange={(e) => {
                              const updatedGoals = e.target.checked
                                ? [...user.preferences.fitnessGoals, goal]
                                : user.preferences.fitnessGoals.filter(g => g !== goal);
                              
                              updateUserPreferences({
                                fitnessGoals: updatedGoals
                              });
                            }}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-900 capitalize">
                            {goal}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily calorie and macro targets
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-sm font-medium text-gray-500">Calories</span>
                        <span className="block text-xl font-semibold text-gray-900">2,100</span>
                        <span className="text-xs text-gray-500">kcal/day</span>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-sm font-medium text-gray-500">Protein</span>
                        <span className="block text-xl font-semibold text-gray-900">140</span>
                        <span className="text-xs text-gray-500">g/day (27%)</span>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-sm font-medium text-gray-500">Carbs</span>
                        <span className="block text-xl font-semibold text-gray-900">210</span>
                        <span className="text-xs text-gray-500">g/day (40%)</span>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="block text-sm font-medium text-gray-500">Fat</span>
                        <span className="block text-xl font-semibold text-gray-900">77</span>
                        <span className="text-xs text-gray-500">g/day (33%)</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      These targets are calculated based on your personal information and goals
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'restrictions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Dietary Restrictions</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dietary Preferences
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'gluten-free', 'dairy-free', 'low-carb'].map((diet) => (
                        <label
                          key={diet}
                          className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            user.preferences.dietaryRestrictions.includes(diet)
                              ? 'bg-green-50 border-2 border-green-500'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={user.preferences.dietaryRestrictions.includes(diet)}
                            onChange={(e) => {
                              const updatedDiets = e.target.checked
                                ? [...user.preferences.dietaryRestrictions, diet]
                                : user.preferences.dietaryRestrictions.filter(d => d !== diet);
                              
                              updateUserPreferences({
                                dietaryRestrictions: updatedDiets
                              });
                            }}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-900 capitalize">
                            {diet}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Food Allergies and Intolerances
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['peanuts', 'tree nuts', 'shellfish', 'fish', 'eggs', 'milk', 'soy', 'wheat'].map((allergy) => (
                        <label
                          key={allergy}
                          className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            user.preferences.allergies.includes(allergy)
                              ? 'bg-red-50 border-2 border-red-500'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={user.preferences.allergies.includes(allergy)}
                            onChange={(e) => {
                              const updatedAllergies = e.target.checked
                                ? [...user.preferences.allergies, allergy]
                                : user.preferences.allergies.filter(a => a !== allergy);
                              
                              updateUserPreferences({
                                allergies: updatedAllergies
                              });
                            }}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-900 capitalize">
                            {allergy}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Food Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favorite Cuisines
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['mediterranean', 'asian', 'mexican', 'italian', 'indian', 'american', 'middle eastern', 'french', 'greek'].map((cuisine) => (
                        <label
                          key={cuisine}
                          className={`flex items-center p-3 rounded-lg cursor-pointer ${
                            user.preferences.mealPreferences.cuisines.includes(cuisine)
                              ? 'bg-green-50 border-2 border-green-500'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={user.preferences.mealPreferences.cuisines.includes(cuisine)}
                            onChange={(e) => {
                              const updatedCuisines = e.target.checked
                                ? [...user.preferences.mealPreferences.cuisines, cuisine]
                                : user.preferences.mealPreferences.cuisines.filter(c => c !== cuisine);
                              
                              updateUserPreferences({
                                mealPreferences: {
                                  ...user.preferences.mealPreferences,
                                  cuisines: updatedCuisines
                                }
                              });
                            }}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-900 capitalize">
                            {cuisine}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meal Size Preference
                      </label>
                      <div className="space-y-2">
                        {['small', 'medium', 'large'].map((size) => (
                          <label
                            key={size}
                            className={`flex items-center p-3 rounded-lg cursor-pointer ${
                              user.preferences.mealPreferences.mealSize === size
                                ? 'bg-green-50 border-2 border-green-500'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              checked={user.preferences.mealPreferences.mealSize === size}
                              onChange={() => {
                                updateUserPreferences({
                                  mealPreferences: {
                                    ...user.preferences.mealPreferences,
                                    mealSize: size as any
                                  }
                                });
                              }}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-900 capitalize">
                              {size} portions
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meals Per Day
                      </label>
                      <div className="space-y-2">
                        {[3, 4, 5, 6].map((count) => (
                          <label
                            key={count}
                            className={`flex items-center p-3 rounded-lg cursor-pointer ${
                              user.preferences.mealPreferences.mealFrequency === count
                                ? 'bg-green-50 border-2 border-green-500'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              checked={user.preferences.mealPreferences.mealFrequency === count}
                              onChange={() => {
                                updateUserPreferences({
                                  mealPreferences: {
                                    ...user.preferences.mealPreferences,
                                    mealFrequency: count
                                  }
                                });
                              }}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-900">
                              {count} meals per day
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      active
        ? 'text-green-700 bg-green-50'
        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
    }`}
  >
    <span className="mr-3 h-5 w-5">{icon}</span>
    {label}
  </button>
);

export default ProfilePage;