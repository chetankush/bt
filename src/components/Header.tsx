'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Store, ShoppingBag, User, LogOut, Settings, Heart, Package, ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;
  cartItemCount?: number;
  isSellerAccount?: boolean;
}

const Header = ({ 
  isLoggedIn = false, 
  userAvatar = '/user-avatar.jpg', 
  userName = 'John Doe',
  cartItemCount = 0,
  isSellerAccount = false
}: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown') && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    setIsDropdownOpen(false);
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            BrandsTenet
          </Link>

          {/* Search Bar Component */}
          <SearchBar />
          
          {/* Navigation */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link 
                  href="/auth/seller/signup" 
                  className="hidden md:flex items-center gap-2 px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors"
                >
                  <Store className="w-4 h-4" />
                  <span>Become a Seller</span>
                </Link>
                <Link 
                  href="/auth/login"
                  className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/cart" 
                  className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                
                <div className="relative user-dropdown">
                  <button 
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image 
                        src={userAvatar} 
                        alt={userName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500 mt-1">example@email.com</p>
                      </div>
                      
                      <div className="py-1">
                        <Link 
                          href={isSellerAccount ? "/dashboard" : "/buyer/dashboard"}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link 
                          href="/orders"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Package className="w-4 h-4" />
                          <span>My Orders</span>
                        </Link>
                        <Link 
                          href="/wishlist"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Heart className="w-4 h-4" />
                          <span>Wishlist</span>
                        </Link>
                        <Link 
                          href="/settings"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 