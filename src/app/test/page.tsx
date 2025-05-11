"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TestPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, addToCart, removeFromCart, clearCart, getCartCount } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Only render client-side components after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleAddTestItem = () => {
    addToCart({
      id: Date.now().toString(),
      name: 'Test Product',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      storeId: 'test-store',
      storeName: 'Test Store'
    }, 1);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 pt-24">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isLoggedIn={isAuthenticated}
        userAvatar={user?.avatarUrl}
        userName={user?.name || 'Test User'}
        cartItemCount={getCartCount()}
      />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-xl p-8 my-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Page - System Status</h1>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Authentication Status</h2>
                <p className="mb-2">
                  <span className="font-medium">Logged in:</span> {isAuthenticated ? 'Yes ✅' : 'No ❌'}
                </p>
                {isAuthenticated && (
                  <div>
                    <p><span className="font-medium">User:</span> {user?.name}</p>
                    <p><span className="font-medium">Email:</span> {user?.email}</p>
                    <p><span className="font-medium">Role:</span> {user?.role}</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Cart Status</h2>
                <p className="mb-2">
                  <span className="font-medium">Items in cart:</span> {getCartCount()}
                </p>
                {cart.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">Cart Items:</h3>
                    <ul className="space-y-2">
                      {cart.map(item => (
                        <li key={item.id} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                          <span>{item.name} x {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Actions</h2>
                <div className="flex flex-wrap gap-4">
                  {!isAuthenticated ? (
                    <>
                      <Link 
                        href="/auth/login" 
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Log In
                      </Link>
                      <Link 
                        href="/auth/signup" 
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      Log Out
                    </button>
                  )}

                  <button
                    onClick={handleAddTestItem}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    Add Test Item to Cart
                  </button>

                  {cart.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Homepage
                  </Link>
                  <Link 
                    href="/cart" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cart Page
                  </Link>
                  <Link 
                    href="/stores" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Stores
                  </Link>
                  <Link 
                    href="/buyer/dashboard" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Buyer Dashboard
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Seller Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 