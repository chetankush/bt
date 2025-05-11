"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  // Fashion Themes
  {
    id: 1,
    name: 'Modern Minimal',
    description: 'Clean and minimal design perfect for modern fashion brands',
    preview: '/api/placeholder/400/300',
    category: 'Fashion'
  },
  {
    id: 2,
    name: 'Luxury Boutique',
    description: 'Elegant and sophisticated design for high-end fashion',
    preview: '/api/placeholder/400/300',
    category: 'Fashion'
  },
  {
    id: 3,
    name: 'Urban Street',
    description: 'Bold and edgy design for streetwear brands',
    preview: '/ftheme.jpg',
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Vintage Collection',
    description: 'Retro-inspired design for vintage fashion stores',
    preview: '/api/placeholder/400/300',
    category: 'Fashion'
  },
  {
    id: 5,
    name: 'Fashion Portfolio',
    description: 'Showcase-style design for fashion designers',
    preview: '/api/placeholder/400/300',
    category: 'Fashion'
  },

  // Electronics Themes
  {
    id: 6,
    name: 'Tech Hub',
    description: 'Modern and sleek design for electronics stores',
    preview: '/api/placeholder/400/300',
    category: 'Electronics'
  },
  {
    id: 7,
    name: 'Gadget Store',
    description: 'Dynamic layout for showcasing the latest gadgets',
    preview: '/api/placeholder/400/300',
    category: 'Electronics'
  },
  {
    id: 8,
    name: 'Smart Home',
    description: 'Clean design focused on smart home products',
    preview: '/api/placeholder/400/300',
    category: 'Electronics'
  },
  {
    id: 9,
    name: 'Gaming Zone',
    description: 'Immersive design for gaming equipment stores',
    preview: '/api/placeholder/400/300',
    category: 'Electronics'
  },
  {
    id: 10,
    name: 'Tech Minimal',
    description: 'Minimalist design for premium electronics',
    preview: '/api/placeholder/400/300',
    category: 'Electronics'
  },

  // Food & Beverage Themes
  {
    id: 11,
    name: 'Café Corner',
    description: 'Warm and inviting design for cafes and coffee shops',
    preview: '/api/placeholder/400/300',
    category: 'Food & Beverage'
  },
  {
    id: 12,
    name: 'Restaurant Elite',
    description: 'Elegant design for fine dining establishments',
    preview: '/api/placeholder/400/300',
    category: 'Food & Beverage'
  },
  {
    id: 13,
    name: 'Bakery Delight',
    description: 'Sweet and charming design for bakeries',
    preview: '/api/placeholder/400/300',
    category: 'Food & Beverage'
  },
  {
    id: 14,
    name: 'Fresh Market',
    description: 'Clean design for grocery and fresh produce stores',
    preview: '/api/placeholder/400/300',
    category: 'Food & Beverage'
  },
  {
    id: 15,
    name: 'Food Truck',
    description: 'Fun and vibrant design for food trucks and street food',
    preview: '/api/placeholder/400/300',
    category: 'Food & Beverage'
  },

  // Health & Beauty Themes
  {
    id: 16,
    name: 'Wellness Spa',
    description: 'Serene design for spa and wellness centers',
    preview: '/api/placeholder/400/300',
    category: 'Health & Beauty'
  },
  {
    id: 17,
    name: 'Beauty Salon',
    description: 'Elegant design for beauty salons and cosmetics',
    preview: '/api/placeholder/400/300',
    category: 'Health & Beauty'
  },
  {
    id: 18,
    name: 'Fitness Studio',
    description: 'Dynamic design for fitness and workout equipment',
    preview: '/api/placeholder/400/300',
    category: 'Health & Beauty'
  },
  {
    id: 19,
    name: 'Organic Beauty',
    description: 'Natural and eco-friendly design for organic products',
    preview: '/api/placeholder/400/300',
    category: 'Health & Beauty'
  },
  {
    id: 20,
    name: 'Medical Care',
    description: 'Professional design for healthcare products',
    preview: '/api/placeholder/400/300',
    category: 'Health & Beauty'
  },

  // Home & Living Themes
  {
    id: 21,
    name: 'Interior Dreams',
    description: 'Sophisticated design for interior decor stores',
    preview: '/api/placeholder/400/300',
    category: 'Home & Living'
  },
  {
    id: 22,
    name: 'Furniture Plus',
    description: 'Clean design for furniture showrooms',
    preview: '/api/placeholder/400/300',
    category: 'Home & Living'
  },
  {
    id: 23,
    name: 'Garden Center',
    description: 'Natural design for garden and outdoor living',
    preview: '/api/placeholder/400/300',
    category: 'Home & Living'
  },
  {
    id: 24,
    name: 'Kitchen Essential',
    description: 'Modern design for kitchen and dining products',
    preview: '/api/placeholder/400/300',
    category: 'Home & Living'
  },
  {
    id: 25,
    name: 'Art & Decor',
    description: 'Creative design for home art and decorations',
    preview: '/api/placeholder/400/300',
    category: 'Home & Living'
  },

  // Books & Stationery Themes
  {
    id: 26,
    name: 'Book Haven',
    description: 'Cozy design for bookstores and libraries',
    preview: '/api/placeholder/400/300',
    category: 'Books & Stationery'
  },
  {
    id: 27,
    name: 'Stationery Studio',
    description: 'Creative design for stationery and art supplies',
    preview: '/api/placeholder/400/300',
    category: 'Books & Stationery'
  },
  {
    id: 28,
    name: 'Academic Corner',
    description: 'Professional design for educational materials',
    preview: '/api/placeholder/400/300',
    category: 'Books & Stationery'
  },
  {
    id: 29,
    name: 'Gift Shop',
    description: 'Playful design for gifts and novelty items',
    preview: '/api/placeholder/400/300',
    category: 'Books & Stationery'
  },
  {
    id: 30,
    name: 'Art Supply',
    description: 'Artistic design for art supply stores',
    preview: '/api/placeholder/400/300',
    category: 'Books & Stationery'
  },

  // Sports & Outdoor Themes
  {
    id: 31,
    name: 'Sports Elite',
    description: 'Dynamic design for sports equipment stores',
    preview: '/api/placeholder/400/300',
    category: 'Sports & Outdoor'
  },
  {
    id: 32,
    name: 'Adventure Gear',
    description: 'Rugged design for outdoor and camping equipment',
    preview: '/api/placeholder/400/300',
    category: 'Sports & Outdoor'
  },
  {
    id: 33,
    name: 'Fitness Pro',
    description: 'Professional design for fitness equipment',
    preview: '/api/placeholder/400/300',
    category: 'Sports & Outdoor'
  },
  {
    id: 34,
    name: 'Bike Shop',
    description: 'Specialized design for cycling and accessories',
    preview: '/api/placeholder/400/300',
    category: 'Sports & Outdoor'
  },
  {
    id: 35,
    name: 'Team Sports',
    description: 'Energetic design for team sports equipment',
    preview: '/api/placeholder/400/300',
    category: 'Sports & Outdoor'
  }
];

export default function ThemeSelection() {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const router = useRouter();
  
  const filteredThemes = selectedCategory === 'All' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);

  const handleContinue = () => {
    if (selectedTheme) {
      // In a real app, this would save the selected theme to the user's profile
      // For now, just redirect to the dashboard
      router.push('/dashboard');
    }
  };

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
              <span className="font-semibold text-black">Choose Your Store Theme</span>
            </div>
            
            <button 
              onClick={handleContinue}
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
          {['All', 'Fashion', 'Electronics', 'Food & Beverage', 'Health & Beauty', 'Home & Living', 'Books & Stationery', 'Sports & Outdoor'].map(category => (
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