import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import Link from 'next/link';

interface Theme {
  id: number;
  name: string;
  description: string;
  preview: string;
  category: string;
}

const themes: Theme[] = [
  {
    id: 1,
    name: 'Modern Minimal',
    description: 'Clean and minimal design perfect for modern brands',
    preview: '/api/placeholder/400/300',
    category: 'Fashion'
  },
  {
    id: 2,
    name: 'Bold & Vibrant',
    description: 'Eye-catching design with vibrant colors',
    preview: '/api/placeholder/400/300',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Classic Elegance',
    description: 'Timeless design for luxury and premium brands',
    preview: '/api/placeholder/400/300',
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Tech Forward',
    description: 'Modern design focused on technology products',
    preview: '/api/placeholder/400/300',
    category: 'Electronics'
  }
];

export default function ThemeSelection() {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const filteredThemes = selectedCategory === 'All' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <span className="font-semibold">Choose Your Store Theme</span>
            </div>
            
            <button 
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedTheme 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedTheme}
            >
              Continue
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex gap-4 mb-8">
          {['All', 'Fashion', 'Electronics'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map(theme => (
            <div 
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                selectedTheme === theme.id 
                  ? 'ring-2 ring-blue-600 scale-[1.02]' 
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="relative">
                <img
                  src={theme.preview}
                  alt={`${theme.name} preview`}
                  className="w-full aspect-[4/3] object-cover"
                />
                {selectedTheme === theme.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {theme.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {theme.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Help Text */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't worry, you can customize your theme colors and style after selection
        </p>
      </main>
    </div>
  );
}