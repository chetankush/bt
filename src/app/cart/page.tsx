"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash, X } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { user, isAuthenticated } = useAuth();
  const { cart, getCartTotal, getCartCount, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }
    
    // In a real app, you would validate the coupon code with an API call
    setError('This coupon code is invalid or has expired');
  };

  const subtotal = getCartTotal();
  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

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
          <div className="flex items-center mb-6">
            <Link href="/stores" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="w-16 h-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link 
                href="/stores" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gray-900">Cart Items ({getCartCount()})</h2>
                    </div>
                  </div>

                  <ul className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <li key={item.id} className="p-6">
                        <div className="flex flex-col sm:flex-row items-center">
                          {/* Product Image */}
                          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="sm:ml-6 flex-1">
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">From {item.storeName}</p>
                              </div>
                              <div className="mt-4 sm:mt-0 flex items-center">
                                <button 
                                  className="p-1 rounded-full hover:bg-gray-100"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                                <button 
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="text-right">
                                {item.discountPrice ? (
                                  <div>
                                    <span className="text-lg font-medium text-gray-900">${(item.discountPrice * item.quantity).toFixed(2)}</span>
                                    <span className="ml-2 text-sm line-through text-gray-500">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ) : (
                                  <span className="text-lg font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <form onSubmit={handleCouponSubmit} className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Discount Code</h3>
                      <div className="flex">
                        <input
                          type="text"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Apply
                        </button>
                      </div>
                      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    </form>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Total</span>
                        <span className="text-xl font-semibold text-gray-900">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="mt-6 block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 