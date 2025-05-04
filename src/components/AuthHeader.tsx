"use client"
// components/AuthHeader.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, ShoppingBag } from 'lucide-react';

const AuthHeader = () => {
  const pathname = usePathname();
  
  // Helper function to determine which button to show
  const getAuthButton = () => {
    // For seller signup/login pages
    if (pathname?.includes('/auth/seller')) {
      return (
        <Link 
          href="/auth/login"
          className="flex items-center gap-2 px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Sign in as Buyer</span>
        </Link>
      );
    }
    
    // For regular user login/signup pages
    if (pathname?.includes('/auth')) {
      return (
        <Link 
          href="/auth/seller/login"
          className="flex items-center gap-2 px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors"
        >
          <Store className="w-4 h-4" />
          <span>Become a Seller</span>
        </Link>
      );
    }
    
    // Default/fallback
    return null;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            BrandsTenet
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {getAuthButton()}

          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;