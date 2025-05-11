"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Store, 
  Search, 
  ShoppingCart, 
  Filter, 
  ChevronDown, 
  Star, 
  Heart,
  Map,
  Phone,
  Mail,
  Clock,
  User,
  Grid,
  List,
  SlidersHorizontal,
  Package
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

interface StoreDetails {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  location: string;
  contactPhone: string;
  contactEmail: string;
  businessHours: string;
  owner: string;
  joinedDate: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
}

// Mock data for store details
const getStoreDetails = (storeId: string): StoreDetails => {
  return {
    id: storeId,
    name: 'Tech Wizards',
    description: 'Your one-stop shop for all things tech. We offer the latest gadgets, accessories, and smart home devices at competitive prices.',
    logo: '/techlogo.png',
    coverImage: '/techcover.jpg',
    rating: 4.8,
    reviewCount: 256,
    categories: ['Electronics', 'Accessories', 'Smart Home', 'Gadgets', 'Computers'],
    location: 'San Francisco, CA',
    contactPhone: '+1 (555) 123-4567',
    contactEmail: 'contact@techwizards.com',
    businessHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
    owner: 'Alex Johnson',
    joinedDate: '2020-05-15'
  };
};

// Mock data for products
const getStoreProducts = (): Product[] => {
  return [
    {
      id: 'prod1',
      name: 'Wireless Noise-Cancelling Headphones',
      price: 299.99,
      discountPrice: 249.99,
      imageUrl: '/headphones.jpg',
      category: 'Electronics',
      rating: 4.9,
      reviewCount: 128,
      inStock: true,
      isFeatured: true,
      isNew: false
    },
    {
      id: 'prod2',
      name: 'Smart Watch Series 5',
      price: 399.99,
      imageUrl: '/smartwatch.jpg',
      category: 'Gadgets',
      rating: 4.7,
      reviewCount: 89,
      inStock: true,
      isFeatured: true,
      isNew: true
    },
    {
      id: 'prod3',
      name: 'Portable Bluetooth Speaker',
      price: 129.99,
      discountPrice: 99.99,
      imageUrl: '/speaker.jpg',
      category: 'Electronics',
      rating: 4.5,
      reviewCount: 74,
      inStock: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 'prod4',
      name: 'Wireless Charging Pad',
      price: 49.99,
      imageUrl: '/chargingpad.jpg',
      category: 'Accessories',
      rating: 4.4,
      reviewCount: 65,
      inStock: true,
      isFeatured: false,
      isNew: true
    },
    {
      id: 'prod5',
      name: 'Smart Home Hub',
      price: 199.99,
      imageUrl: '/smarthome.jpg',
      category: 'Smart Home',
      rating: 4.6,
      reviewCount: 42,
      inStock: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 'prod6',
      name: 'Mechanical Keyboard RGB',
      price: 149.99,
      imageUrl: '/keyboard.jpg',
      category: 'Computers',
      rating: 4.7,
      reviewCount: 53,
      inStock: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 'prod7',
      name: 'USB-C Hub Multiport Adapter',
      price: 79.99,
      discountPrice: 59.99,
      imageUrl: '/usbhub.jpg',
      category: 'Accessories',
      rating: 4.3,
      reviewCount: 38,
      inStock: true,
      isFeatured: false,
      isNew: false
    },
    {
      id: 'prod8',
      name: 'Wireless Gaming Mouse',
      price: 89.99,
      imageUrl: '/mouse.jpg',
      category: 'Computers',
      rating: 4.8,
      reviewCount: 67,
      inStock: false,
      isFeatured: false,
      isNew: false
    }
  ];
};

const StoreDetailPage = ({ params }: { params: { storeId: string } }) => {
  const router = useRouter();
  const storeId = params.storeId;
  const store = getStoreDetails(storeId);
  const products = getStoreProducts();
  const { user, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();

  // State for filtering and sorting
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on selected category
  const filteredProducts = activeCategory 
    ? products.filter(product => product.category === activeCategory)
    : products;

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew ? 1 : -1;
      case 'price-low':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-high':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isLoggedIn={isAuthenticated}
        userAvatar={user?.avatarUrl}
        userName={user?.name}
        cartItemCount={getCartCount()}
        isSellerAccount={user?.role === 'seller'}
      />
      
      {/* Store Header with Cover Image */}
      <div className="relative h-64 bg-gray-200 mt-16">
        {/* This would be the cover image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <Store className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{store.rating} ({store.reviewCount} reviews)</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-600">{store.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
              {/* Store Info Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">About Store</h2>
                <p className="mt-2 text-sm text-gray-500">{store.description}</p>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <Map className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-500">{store.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-500">{store.contactPhone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-500">{store.contactEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Business Hours</p>
                      <p className="text-sm text-gray-500">{store.businessHours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Store Owner</p>
                      <p className="text-sm text-gray-500">{store.owner}</p>
                      <p className="text-sm text-gray-500">Member since {new Date(store.joinedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Categories Section */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeCategory === null
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </button>
                  
                  {store.categories.map((category) => (
                    <button 
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                  
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center">
                  <span className="text-sm text-gray-500 mr-4">
                    Showing {sortedProducts.length} products
                  </span>
                  <div className="border border-gray-300 rounded-md p-1 flex">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                    >
                      <Grid className="h-4 w-4 text-gray-500" />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                    >
                      <List className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Expanded Filters (show when filters button is clicked) */}
              {showFilters && (
                <div className="p-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Range
                      </label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <span>-</span>
                        <input 
                          type="number" 
                          placeholder="Max" 
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Any Rating</option>
                        <option>4★ & Up</option>
                        <option>3★ & Up</option>
                        <option>2★ & Up</option>
                        <option>1★ & Up</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Availability
                      </label>
                      <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>All Products</option>
                        <option>In Stock Only</option>
                        <option>On Sale</option>
                        <option>New Arrivals</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="mr-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Reset
                    </button>
                    <button className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Products Display */}
            {viewMode === 'grid' ? (
              // Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative h-48 bg-gray-200">
                        {/* This would be the product image */}
                        <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <Package className="h-12 w-12" />
                        </div>
                        
                        {/* Sale badge */}
                        {product.discountPrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            SALE
                          </div>
                        )}
                        
                        {/* New badge */}
                        {product.isNew && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">{product.category}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2 leading-snug mb-1">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          {product.discountPrice ? (
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                              <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <button className="text-gray-400 hover:text-red-500">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <button 
                        disabled={!product.inStock}
                        className={`mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          product.inStock 
                            ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        ) : (
                          'Out of Stock'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 flex flex-col sm:flex-row">
                      <Link href={`/products/${product.id}`} className="sm:w-48 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <div className="relative h-48 sm:h-full bg-gray-200 rounded-lg">
                          {/* This would be the product image */}
                          <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                            <Package className="h-12 w-12" />
                          </div>
                          
                          {/* Sale badge */}
                          {product.discountPrice && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              SALE
                            </div>
                          )}
                          
                          {/* New badge */}
                          {product.isNew && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                              NEW
                            </div>
                          )}
                        </div>
                      </Link>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-500">{product.category}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                          </div>
                        </div>
                        
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-gray-500 mb-4 flex-grow">
                          {/* This would be a product description */}
                          High-quality product with premium features. Perfect for everyday use and designed to last.
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            {product.discountPrice ? (
                              <div className="flex items-center">
                                <span className="text-xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button className="text-gray-400 hover:text-red-500">
                              <Heart className="h-5 w-5" />
                            </button>
                            
                            <button 
                              disabled={!product.inStock}
                              className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                product.inStock 
                                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
                                  : 'bg-gray-300 cursor-not-allowed'
                              }`}
                            >
                              {product.inStock ? (
                                <>
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </>
                              ) : (
                                'Out of Stock'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-2">
                  Previous
                </button>
                <button className="px-3 py-2 border border-blue-500 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mx-2">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ml-2">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreDetailPage;
