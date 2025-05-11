"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Star, Filter, X, ChevronDown, Sliders, Map as MapIcon, Menu } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

// Mock store data
interface Store {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  imageUrl: string;
  verified: boolean;
}

// Mock data for stores
const MOCK_STORES: Store[] = [
  {
    id: "store-1",
    name: "Tech Haven",
    description: "Premium electronics and gadgets store with the latest technology.",
    category: "Electronics",
    rating: 4.8,
    reviewCount: 235,
    location: {
      city: "San Francisco",
      state: "California",
      country: "USA",
      coordinates: [-122.4194, 37.7749]
    },
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1120&q=80",
    verified: true
  },
  {
    id: "store-2",
    name: "Fashion Forward",
    description: "Trendy clothing and accessories for all seasons.",
    category: "Fashion",
    rating: 4.6,
    reviewCount: 189,
    location: {
      city: "New York",
      state: "New York",
      country: "USA",
      coordinates: [-73.9352, 40.7306]
    },
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    verified: true
  },
  {
    id: "store-3",
    name: "Home Essentials",
    description: "Everything you need to make your house a home.",
    category: "Home & Living",
    rating: 4.5,
    reviewCount: 156,
    location: {
      city: "Chicago",
      state: "Illinois",
      country: "USA",
      coordinates: [-87.6298, 41.8781]
    },
    imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    verified: false
  },
  {
    id: "store-4",
    name: "Organic Grocery",
    description: "Fresh organic produce and groceries from local farms.",
    category: "Groceries",
    rating: 4.7,
    reviewCount: 204,
    location: {
      city: "Austin",
      state: "Texas",
      country: "USA",
      coordinates: [-97.7431, 30.2672]
    },
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    verified: true
  },
  {
    id: "store-5",
    name: "Beauty Bliss",
    description: "Premium skincare, makeup, and beauty products.",
    category: "Beauty",
    rating: 4.9,
    reviewCount: 278,
    location: {
      city: "Los Angeles",
      state: "California",
      country: "USA",
      coordinates: [-118.2437, 34.0522]
    },
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1087&q=80",
    verified: true
  },
  {
    id: "store-6",
    name: "Pet Paradise",
    description: "Everything your furry friends need: food, toys, and accessories.",
    category: "Pets",
    rating: 4.6,
    reviewCount: 142,
    location: {
      city: "Seattle",
      state: "Washington",
      country: "USA",
      coordinates: [-122.3321, 47.6062]
    },
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    verified: false
  },
  {
    id: "store-7",
    name: "Bookworm's Corner",
    description: "Curated collection of bestsellers, classics, and indie publications.",
    category: "Books",
    rating: 4.8,
    reviewCount: 172,
    location: {
      city: "Portland",
      state: "Oregon",
      country: "USA",
      coordinates: [-122.6765, 45.5231]
    },
    imageUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    verified: true
  },
  {
    id: "store-8",
    name: "Sports Unlimited",
    description: "Equipment and apparel for every sport and outdoor activity.",
    category: "Sports",
    rating: 4.4,
    reviewCount: 118,
    location: {
      city: "Denver",
      state: "Colorado",
      country: "USA",
      coordinates: [-104.9903, 39.7392]
    },
    imageUrl: "https://images.unsplash.com/photo-1596523341556-62b0fea3acc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    verified: false
  }
];

// Get unique categories
const ALL_CATEGORIES = ['All Categories', ...Array.from(new Set(MOCK_STORES.map(store => store.category)))];

// Get unique cities
const ALL_CITIES = ['All Cities', ...Array.from(new Set(MOCK_STORES.map(store => store.location.city)))];

const StoresPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedRating, setSelectedRating] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  
  // Filter stores based on search query and filters
  const filteredStores = MOCK_STORES.filter(store => {
    // Search query filter
    const matchesSearch = 
      searchQuery === '' || 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      store.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      store.category === selectedCategory;
    
    // City filter
    const matchesCity = 
      selectedCity === 'All Cities' || 
      store.location.city === selectedCity;
    
    // Rating filter
    const matchesRating = 
      selectedRating === 0 || 
      store.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesCity && matchesRating;
  });

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedCity('All Cities');
    setSelectedRating(0);
    setSearchQuery('');
  };

  // Simple handler for store selection
  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isLoggedIn={isAuthenticated}
        userAvatar={user?.avatarUrl}
        userName={user?.name}
        cartItemCount={getCartCount()}
        isSellerAccount={user?.role === 'seller'}
      />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Local Stores</h1>
            <p className="text-gray-600">Find and shop from the best local stores in your area</p>
          </div>

          {/* Search and View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search stores, products, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              
              <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-l-full ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-r-full ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Map View
                </button>
              </div>
            </div>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden md:block mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {ALL_CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* City Filter */}
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {ALL_CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Rating:</span>
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedRating === rating 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>

                {/* Reset Filters */}
                <button
                  onClick={resetFilters}
                  className="ml-auto px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Sidebar */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-40 overflow-hidden md:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
              <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setShowMobileFilters(false)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="flex-1 px-4 py-6 space-y-6">
                      {/* Category Filter */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                        <div className="space-y-2">
                          {ALL_CATEGORIES.map((category) => (
                            <div key={category} className="flex items-center">
                              <input
                                id={`category-${category}`}
                                name="category"
                                type="radio"
                                checked={selectedCategory === category}
                                onChange={() => setSelectedCategory(category)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor={`category-${category}`}
                                className="ml-3 text-sm text-gray-700"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* City Filter */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">City</h3>
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          {ALL_CITIES.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      {/* Rating Filter */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Rating</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 3, 3.5, 4, 4.5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setSelectedRating(rating)}
                              className={`px-3 py-2 rounded-md text-sm ${
                                selectedRating === rating 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                          onClick={resetFilters}
                        >
                          Reset All
                        </button>
                        <button
                          type="button"
                          className="bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => setShowMobileFilters(false)}
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Options for Mobile */}
          <div className="flex md:hidden items-center justify-center mb-6">
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-full">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-l-full ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-r-full ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
              >
                Map
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {filteredStores.length} {filteredStores.length === 1 ? 'store' : 'stores'}
            </p>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStores.map((store) => (
                <Link 
                  key={store.id}
                  href={`/stores/${store.id}`}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={store.imageUrl}
                      alt={`${store.name} storefront`}
                      fill
                      className="object-cover"
                    />
                    {store.verified && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Verified
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {store.category}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {store.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{store.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{store.location.city}, {store.location.state}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {store.description}
                    </p>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{store.reviewCount} reviews</span>
                      <span className="text-blue-600 text-sm font-medium">View Store →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Map View - Replace with placeholder */}
          {viewMode === 'map' && (
            <div className="h-[70vh] rounded-xl overflow-hidden shadow-md bg-gray-200 relative">
              {/* Placeholder for map */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <MapIcon className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Map View</h3>
                <p className="text-gray-500 max-w-md text-center px-4">
                  Interactive map is currently disabled. This would show store locations on a geographical map.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4 px-4">
                  {filteredStores.map((store) => (
                    <div 
                      key={store.id}
                      className="bg-white p-3 rounded-lg shadow flex items-center gap-3 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleStoreClick(store)}
                    >
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{store.name}</p>
                        <p className="text-xs text-gray-500">{store.location.city}, {store.location.state}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredStores.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
                <Sliders className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stores found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your filters or search term to find stores that match your criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoresPage;
