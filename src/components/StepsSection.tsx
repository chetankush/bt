"use client"

import React, { useState } from 'react';
import { Store, ShoppingBag, Zap, Search, CreditCard, Package } from 'lucide-react';

const StepsSection = () => {
  const [activeTab, setActiveTab] = useState('sellers');

  const sellerSteps = [
    {
      icon: <Store className="w-8 h-8 text-black transition-colors duration-300 group-hover:text-white" />,
      title: "Choose Your Design",
      description: "Select from our professionally designed templates tailored for your business type"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-black transition-colors duration-300 group-hover:text-white" />,
      title: "Add Your Products",
      description: "Upload your products with our easy-to-use dashboard. Add photos, prices, and descriptions"
    },
    {
      icon: <Zap className="w-8 h-8 text-black transition-colors duration-300 group-hover:text-white" />,
      title: "Launch & Sell",
      description: "Go live instantly and start selling to customers in your area and beyond"
    }
  ];

  const shopperSteps = [
    {
      icon: <Search className="w-8 h-8 text-black transition-colors duration-300 group-hover:text-white" />,
      title: "Discover Local Stores",
      description: "Find unique products from stores in your area using our smart search"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-black transition-colors duration-300 group-hover:text-white" />,
      title: "Shop With Ease",
      description: "Browse products, compare prices, and add items to your cart from multiple stores"
    },
    {
      icon: <Package className="w-8 h-8 text-black transition-colors duration-300 group-hover:text-white" />,
      title: "Quick Checkout",
      description: "Enjoy secure payments and convenient delivery options for all your purchases"
    }
  ];

  const steps = activeTab === 'sellers' ? sellerSteps : shopperSteps;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="max-w-xl text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're looking to sell or shop, we've made the process incredibly simple
            </p>
          </div>

          <div className="inline-flex p-1.5 bg-gray-100 rounded-full">
            <button 
              onClick={() => setActiveTab('sellers')}
              className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'sellers' 
                  ? 'bg-black text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Sellers
            </button>
            <button 
              onClick={() => setActiveTab('shoppers')}
              className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === 'shoppers' 
                  ? 'bg-black text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Shoppers
            </button>
          </div>
        </div>

        {/* Steps Grid with Hover Effects */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:bg-gray-50 group"
            >
              <div               className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-black">
                {step.icon}
              </div>
              {/* <div className="relative">
                <span className="absolute -left-4 -top-4 text-6xl font-bold text-gray-100 select-none">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 relative z-10">
                  {step.title}
                </h3>
              </div> */}
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-16">
          <button className="px-12 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
            {activeTab === 'sellers' ? 'Create Your Store Now' : 'Start Shopping Now'}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            {activeTab === 'sellers' 
              ? 'No technical knowledge required. Start selling in minutes.' 
              : 'Browse thousands of products from local stores.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;