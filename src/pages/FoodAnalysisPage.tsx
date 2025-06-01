import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Search, Upload, X, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNutrition, FoodItem } from '../context/NutritionContext';

const FoodAnalysisPage: React.FC = () => {
  const { analyzeFood, recentFoodItems } = useNutrition();
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [searchText, setSearchText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodItem | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const resetImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleAnalyze = async () => {
    if ((inputMode === 'text' && searchText) || (inputMode === 'image' && selectedImage)) {
      setIsAnalyzing(true);
      try {
        const input = inputMode === 'text' ? searchText : selectedImage!;
        const result = await analyzeFood(input);
        setAnalysisResult(result);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <div className="pt-20 pb-10 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Food Analysis</h1>
        <p className="text-gray-600 mt-2">
          Analyze foods by text search or image upload to get detailed nutritional information
        </p>
      </header>

      {/* Input Selection Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setInputMode('text')}
            className={`flex-1 py-4 text-center font-medium ${
              inputMode === 'text'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Search className="inline-block h-5 w-5 mr-2" />
            Search by Text
          </button>
          <button
            onClick={() => setInputMode('image')}
            className={`flex-1 py-4 text-center font-medium ${
              inputMode === 'image'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Camera className="inline-block h-5 w-5 mr-2" />
            Upload Image
          </button>
        </div>

        <div className="p-6">
          {inputMode === 'text' ? (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search for a food item (e.g., apple, chicken breast)"
                  className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">
                Try specific queries like "1 medium apple" or "100g grilled chicken breast"
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                isDragActive
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <input {...getInputProps()} />
              
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Food preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetImage();
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    Drag & drop a food image here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports JPEG, JPG and PNG files
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={
              isAnalyzing || 
              (inputMode === 'text' && !searchText) || 
              (inputMode === 'image' && !selectedImage)
            }
            className="mt-6 w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Food'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden"
        >
          <div className="bg-green-50 p-4 border-b border-green-100">
            <h2 className="text-xl font-semibold text-green-800">Analysis Results</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              {analysisResult.imageUrl && (
                <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={analysisResult.imageUrl} 
                    alt={analysisResult.name} 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              
              <div className="md:flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{analysisResult.name}</h3>
                    <p className="text-gray-600">{analysisResult.servingSize}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {analysisResult.category}
                    </span>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <span className="block text-sm font-medium text-gray-600">Calories</span>
                    <span className="block text-3xl font-bold text-gray-900">{analysisResult.calories}</span>
                    <span className="text-sm text-gray-500">kcal</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-green-600" />
                    Nutrition Facts
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <NutrientBar 
                      label="Protein" 
                      value={analysisResult.protein} 
                      unit="g" 
                      color="bg-blue-500" 
                    />
                    <NutrientBar 
                      label="Carbs" 
                      value={analysisResult.carbs} 
                      unit="g" 
                      color="bg-amber-500" 
                    />
                    <NutrientBar 
                      label="Fat" 
                      value={analysisResult.fat} 
                      unit="g" 
                      color="bg-red-500" 
                    />
                    <NutrientBar 
                      label="Fiber" 
                      value={analysisResult.fiber} 
                      unit="g" 
                      color="bg-green-500" 
                    />
                    <NutrientBar 
                      label="Sugar" 
                      value={analysisResult.sugar} 
                      unit="g" 
                      color="bg-purple-500" 
                    />
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h4>
                  <p className="text-gray-700">
                    {analysisResult.name} is a {analysisResult.category.toLowerCase()} that provides {analysisResult.calories} calories per serving. 
                    It's {analysisResult.protein > 15 ? 'high' : 'moderate'} in protein and {analysisResult.fiber > 5 ? 'a good source of fiber' : 'contains some fiber'}.
                    {analysisResult.sugar > 10 ? ' Note that it contains a significant amount of sugar.' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Analyses */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Analyzed Foods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentFoodItems.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.calories} kcal per serving</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NutrientBarProps {
  label: string;
  value: number;
  unit: string;
  color: string;
}

const NutrientBar: React.FC<NutrientBarProps> = ({ label, value, unit, color }) => {
  // Calculate bar width based on some max value (adjust as needed)
  const maxValue = 50; // Arbitrary max value for visual scaling
  const percentage = Math.min(100, (value / maxValue) * 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}{unit}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FoodAnalysisPage;