"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Package, Home, ShoppingBag, Heart, Settings, History, User, CreditCard, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

type DashboardTab = 'profile' | 'orders' | 'wishlist' | 'settings';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

// Mock order data
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-231456',
    date: '2023-11-15',
    total: 249.99,
    status: 'delivered',
    items: [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        quantity: 1,
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'ORD-231423',
    date: '2023-10-28',
    total: 129.97,
    status: 'shipped',
    items: [
      {
        name: 'Premium Leather Wallet',
        quantity: 1,
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1556356868-0ce5fde14fcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      },
      {
        name: 'Designer Watch Band',
        quantity: 1,
        price: 49.98,
        image: 'https://images.unsplash.com/photo-1592496001020-d31bd830f5f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      }
    ]
  },
  {
    id: 'ORD-230987',
    date: '2023-09-15',
    total: 349.95,
    status: 'delivered',
    items: [
      {
        name: 'Smart Speaker',
        quantity: 1,
        price: 199.95,
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      },
      {
        name: 'Wireless Earbuds',
        quantity: 1,
        price: 150.00,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
      }
    ]
  }
];

const BuyerDashboardPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // In a real app, we would use a useEffect for this
    router.push('/auth/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    router.push('/');
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
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 text-center border-b border-gray-100">
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-100">
                    <Image
                      src={user?.avatarUrl || '/user-avatar.jpg'}
                      alt={user?.name || 'User'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center w-full px-4 py-3 rounded-lg ${
                          activeTab === 'profile' 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <User className="h-5 w-5 mr-3" />
                        <span>My Profile</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center w-full px-4 py-3 rounded-lg ${
                          activeTab === 'orders' 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Package className="h-5 w-5 mr-3" />
                        <span>My Orders</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('wishlist')}
                        className={`flex items-center w-full px-4 py-3 rounded-lg ${
                          activeTab === 'wishlist' 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Heart className="h-5 w-5 mr-3" />
                        <span>Wishlist</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center w-full px-4 py-3 rounded-lg ${
                          activeTab === 'settings' 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        <span>Account Settings</span>
                      </button>
                    </li>
                    <li className="pt-4 border-t border-gray-100 mt-4">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              
              <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions or need assistance with your account?
                </p>
                <a 
                  href="#" 
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Contact Support
                </a>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">My Profile</h2>
                  </div>
                  
                  <div className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            defaultValue="John"
                            disabled
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            defaultValue="Doe"
                            disabled
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="john.doe@example.com"
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="+1 (555) 123-4567"
                          disabled
                        />
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Default Shipping Address</h3>
                        
                        <address className="not-italic text-gray-600">
                          <p>123 Main Street</p>
                          <p>Apt 4B</p>
                          <p>New York, NY 10001</p>
                          <p>United States</p>
                        </address>
                      </div>
                      
                      <div className="flex justify-center pt-4">
                        <button
                          type="button"
                          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">My Orders</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              Ordered on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-start">
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
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                <div className="mt-1">
                                  <span className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm font-medium text-gray-900">Total: ${order.total.toFixed(2)}</span>
                          <div className="flex space-x-2">
                            <Link 
                              href={`/orders/${order.id}`}
                              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                            >
                              View Details
                            </Link>
                            {order.status === 'delivered' && (
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                                Write Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {MOCK_ORDERS.length === 0 && (
                      <div className="p-6 text-center">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                        <p className="text-gray-600 mb-6">
                          You haven't placed any orders yet. Start shopping to see your orders here.
                        </p>
                        <Link 
                          href="/stores" 
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                        >
                          <ShoppingBag className="h-5 w-5 mr-2" />
                          <span>Start Shopping</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">My Wishlist</h2>
                  </div>
                  
                  <div className="p-6 text-center">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
                    <p className="text-gray-600 mb-6">
                      Save items you like to your wishlist and they will show up here.
                    </p>
                    <Link 
                      href="/stores" 
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      <span>Explore Products</span>
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
                  </div>
                  
                  <div className="p-6 space-y-8">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Communication Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <input
                            id="orderUpdates"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                            defaultChecked
                          />
                          <label htmlFor="orderUpdates" className="ml-3">
                            <div className="text-sm font-medium text-gray-900">Order Updates</div>
                            <p className="text-sm text-gray-600">Receive notifications about your orders</p>
                          </label>
                        </div>
                        <div className="flex items-start">
                          <input
                            id="promotions"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                            defaultChecked
                          />
                          <label htmlFor="promotions" className="ml-3">
                            <div className="text-sm font-medium text-gray-900">Promotions and Deals</div>
                            <p className="text-sm text-gray-600">Receive promotions, discounts, and special offers</p>
                          </label>
                        </div>
                        <div className="flex items-start">
                          <input
                            id="newsletter"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                          />
                          <label htmlFor="newsletter" className="ml-3">
                            <div className="text-sm font-medium text-gray-900">Newsletter</div>
                            <p className="text-sm text-gray-600">Receive our monthly newsletter with tips and updates</p>
                          </label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-base font-medium text-red-600 mb-4">Danger Zone</h3>
                      <button
                        type="button"
                        className="px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete Account
                      </button>
                      <p className="mt-2 text-sm text-gray-600">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
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

export default BuyerDashboardPage; 