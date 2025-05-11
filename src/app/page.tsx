"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { Store, ShoppingBag, Zap, Search, Globe, CreditCard } from 'lucide-react';
import StepsSection from '@/components/StepsSection';
import ShoppingShowcase from '@/components/ShoppingShowcase';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

// Sample store data
const storeData = [
  {
    id: 1,
    name: "Urban Styles",
    slug: "urban-styles",
    category: "Fashion",
    location: "New York, NY",
    rating: 4.8,
    description: "Contemporary fashion store featuring trendy clothing and accessories.",
    productCount: 150,
    imageUrl: "/s1.jpg"
  },
  {
    id: 2,
    name: "Tech Haven",
    slug: "tech-haven",
    category: "Electronics",
    location: "San Francisco, CA",
    rating: 4.9,
    description: "Premium electronics and gadgets with expert customer service.",
    productCount: 200,
    imageUrl: "/s2.jpg"
  },
  {
    id: 3,
    name: "Elite Boutique",
    slug: "elite-boutique",
    category: "Fashion",
    location: "Los Angeles, CA",
    rating: 4.7,
    description: "Luxury fashion boutique offering exclusive designer collections.",
    productCount: 120,
    imageUrl: "/s3.jpg"
  },
  {
    id: 4,
    name: "Digital Dreams",
    slug: "digital-dreams",
    category: "Electronics",
    location: "Seattle, WA",
    rating: 4.6,
    description: "Your one-stop shop for all things tech and gaming.",
    productCount: 180,
    imageUrl: "/s7.jpg"
  },
  {
    id: 5,
    name: "Trendy Threads",
    slug: "trendy-threads",
    category: "Fashion",
    location: "Miami, FL",
    rating: 4.5,
    description: "Curated collection of the latest fashion trends.",
    productCount: 160,
    imageUrl: "/s5.jpg"
  },
  {
    id: 6,
    name: "Gadget Galaxy",
    slug: "gadget-galaxy",
    category: "Electronics",
    location: "Austin, TX",
    rating: 4.8,
    description: "Discover the latest innovations in tech and electronics.",
    productCount: 190,
    imageUrl: "/s6.jpg"
  }
];

export default function LandingPage() {
  const { user, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        isLoggedIn={isAuthenticated} 
        userAvatar={user?.avatarUrl} 
        userName={user?.name}
        cartItemCount={getCartCount()}
        isSellerAccount={user?.role === 'seller'}
      />

      {/* Hero Section */}
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 py-16">
            {/* Hero Content */}
            <div className="flex-1 space-y-8">
              <h1 className="text-4xl md:text-6xl -mt-8 pb-4 font-bold text-gray-900 leading-tight">
                Create Your Online Store in 2 Steps.
              </h1>
              <p className="text-xl text-gray-600">
                Launch your store instantly without any technical knowledge. Start selling to customers everywhere, no coding required.
              </p>
              <Link 
                href="/themeselection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                <span className="text-lg">Create Your Store Now</span>
              </Link>
            </div>

            {/* Hero Image */}
            <div className="flex-1 flex justify-center items-center">
              <div className="w-full max-w-xl aspect-[4/3] bg-white rounded-3xl shadow-lg overflow-hidden relative">
                {/* Fade Effect Container */}
                <div className="absolute inset-0 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/15" />
                </div>
                
                {/* Responsive Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/bgimg.png"
                    fill
                    alt="Store Preview"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

       {/* Stores Listing Section */}
       <section className="py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
           You Can also Discover Local Stores
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl ">
            Browse and shop from the best local stores in your area. Support your community by shopping locally.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex gap-4 mb-4 sm:mb-0 flex-wrap">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
              All Stores
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              Fashion
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              Electronics
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              Beauty
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              Groceries
            </button>
          </div>
          <select className="pl-4 py-2 border border-gray-200 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Most Popular</option>
            <option>Newest First</option>
            <option>Closest to Me</option>
          </select>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {storeData.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link href="/stores" className="px-8 py-3 bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors inline-block">
            View More Stores
          </Link>
        </div>
      </div>
    </section>
    <StepsSection/>
    <ShoppingShowcase/>
    <Footer/>
    </div>
  );
}

interface Store {
  id: number;
  name: string;
  slug: string;
  category: string;
  location: string;
  rating: number;
  description: string;
  productCount: number;
  imageUrl: string;
}

const StoreCard = ({ store} : { store: Store }) => (
  <Link href={`/stores/${store.id}`} className="block">
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={store.imageUrl}
          alt={`${store.name} Preview`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-black shadow-md text-white text-sm font-medium rounded-full">
          {store.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{store.name}</h3>
            <p className="text-sm text-gray-500">{store.location}</p>
          </div>
          <div className="flex items-center text-sm text-yellow-500">
            <span className="mr-1">{store.rating}</span>
            <span>★</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {store.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{store.productCount}+ Products</span>
          <span className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Visit Store →
          </span>
        </div>
      </div>
    </div>
  </Link>
);
