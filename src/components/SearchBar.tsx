"use client"

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import useLoading from '@/hooks/useLoading';
import Loader from './Loader';

const SearchBar = () => {
  const { isLoading, withLoading } = useLoading();
  const [mounted, setMounted] = useState(false);

  // Only render after component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async () => {
    await withLoading(async () => {
      // Your async operation here
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
  };

  // If not mounted yet, return a placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {/* Empty div with same dimensions to match server rendering */}
            <div className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Find stores and products near you..."
            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          />
          <div className="absolute inset-y-1 right-1 px-[13px] flex items-center justify-center bg-blue-600 text-white rounded-full">
            <div className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Find stores and products near you..."
          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={handleSearch}
          className="absolute inset-y-1 right-1 px-[13px] flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
          aria-label="Search stores and products"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default SearchBar; 