"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, CheckCircle, Truck, CheckSquare, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

enum CheckoutStep {
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation'
}

const CheckoutPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { cart, getCartTotal, getCartCount, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.PAYMENT);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processOrder();
  };
  
  const processOrder = async () => {
    setIsProcessing(true);
    
    try {
      // In a real app, we would make an API call to process the order
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Generate a random order ID
      const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(newOrderId);
      
      // Clear the cart
      clearCart();
      
      // Show confirmation
      setOrderComplete(true);
      setCurrentStep(CheckoutStep.CONFIRMATION);
    } catch (error) {
      console.error('Failed to process order:', error);
      alert('Failed to process your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const subtotal = getCartTotal();
  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  // If cart is empty and not in confirmation step, redirect to cart
  if (cart.length === 0 && currentStep !== CheckoutStep.CONFIRMATION && !orderComplete) {
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
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
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
          {/* Back Button */}
          {currentStep !== CheckoutStep.CONFIRMATION && (
            <div className="mb-6">
              <button
                onClick={() => currentStep === CheckoutStep.PAYMENT 
                  ? setCurrentStep(CheckoutStep.SHIPPING) 
                  : router.push('/cart')
                }
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>{currentStep === CheckoutStep.PAYMENT ? 'Back to Shipping' : 'Back to Cart'}</span>
              </button>
            </div>
          )}
          
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {currentStep === CheckoutStep.CONFIRMATION 
              ? 'Order Confirmation' 
              : 'Checkout'
            }
          </h1>
          
          {/* Progress Steps */}
          {!orderComplete && (
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className={`flex items-center ${currentStep === CheckoutStep.SHIPPING ? 'text-blue-600' : 'text-gray-900'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === CheckoutStep.SHIPPING ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    1
                  </div>
                  <span className="ml-2 font-medium">Shipping</span>
                </div>
                <div className={`w-16 h-0.5 mx-2 ${currentStep === CheckoutStep.SHIPPING ? 'bg-gray-200' : 'bg-blue-600'}`}></div>
                <div className={`flex items-center ${currentStep === CheckoutStep.PAYMENT ? 'text-blue-600' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === CheckoutStep.PAYMENT ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    2
                  </div>
                  <span className="ml-2 font-medium">Payment</span>
                </div>
                <div className={`w-16 h-0.5 mx-2 ${currentStep === CheckoutStep.CONFIRMATION ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${currentStep === CheckoutStep.CONFIRMATION ? 'text-blue-600' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === CheckoutStep.CONFIRMATION ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    3
                  </div>
                  <span className="ml-2 font-medium">Confirmation</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Form */}
              {currentStep === CheckoutStep.SHIPPING && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
                  </div>
                  
                  <form onSubmit={handleShippingSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={shippingInfo.fullName}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Payment Form */}
              {currentStep === CheckoutStep.PAYMENT && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
                  </div>
                  
                  <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentInfoChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentInfoChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentInfoChange}
                          placeholder="MM/YY"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentInfoChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Order Confirmation */}
              {currentStep === CheckoutStep.CONFIRMATION && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">Order Confirmation</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-center items-center mb-6">
                      <div className="bg-green-100 rounded-full p-4">
                        <CheckCircle className="h-16 w-16 text-green-600" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                      Thank You for Your Order!
                    </h3>
                    <p className="text-center text-gray-600 mb-6">
                      Your order has been received and is now being processed.
                    </p>
                    
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium text-gray-900">{orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4 pt-4">
                      <Link
                        href="/orders"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Orders
                      </Link>
                      <Link
                        href="/stores"
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  {/* Cart Items */}
                  {currentStep !== CheckoutStep.CONFIRMATION && (
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-start">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <div className="mt-1">
                              {item.discountPrice ? (
                                <span className="text-sm font-medium text-gray-900">${(item.discountPrice * item.quantity).toFixed(2)}</span>
                              ) : (
                                <span className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Price Summary */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Shipping</span>
                      <span className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax</span>
                      <span className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shipping Information Summary */}
              {currentStep !== CheckoutStep.SHIPPING && currentStep !== CheckoutStep.CONFIRMATION && (
                <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">Shipping Information</h3>
                    <button 
                      onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start">
                      <Truck className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{shippingInfo.fullName}</p>
                        <p className="text-sm text-gray-600 mt-1">{shippingInfo.address}</p>
                        <p className="text-sm text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p className="text-sm text-gray-600">{shippingInfo.country}</p>
                        <p className="text-sm text-gray-600 mt-1">Phone: {shippingInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage; 