"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Settings, 
  BarChart3, 
  Users, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Palette,
  Plus,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Sample data for the dashboard
const storeStats = {
  totalSales: 24950,
  ordersToday: 17,
  visitors: 1258,
  conversionRate: 3.2,
};

const recentOrders = [
  { id: 'ORD-7829', customer: 'Alex Johnson', amount: 139.99, status: 'Delivered', date: '15 Aug 2023' },
  { id: 'ORD-7830', customer: 'Sarah Miller', amount: 89.99, status: 'Processing', date: '15 Aug 2023' },
  { id: 'ORD-7831', customer: 'Michael Davis', amount: 219.50, status: 'Shipped', date: '14 Aug 2023' },
  { id: 'ORD-7832', customer: 'Emily Wilson', amount: 65.75, status: 'Processing', date: '14 Aug 2023' },
];

const topProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', sales: 128, revenue: 6400 },
  { id: 2, name: 'Ultra Slim Laptop Case', sales: 97, revenue: 2425 },
  { id: 3, name: 'Smart Watch Elite', sales: 85, revenue: 10625 },
  { id: 4, name: 'Premium Phone Charger', sales: 76, revenue: 1520 },
];

export default function SellerDashboard() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Use the logout function from Auth context
    logout();
    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">BrandsTenet</span>
          </Link>
        </div>
        <nav className="py-4">
          <div className="px-4 py-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Store Management</p>
          </div>
          <SidebarItem 
            icon={<LayoutDashboard className="w-5 h-5" />}
            text="Dashboard"
            isActive={activeSidebarItem === 'dashboard'}
            onClick={() => setActiveSidebarItem('dashboard')}
            href="/dashboard"
          />
          <SidebarItem 
            icon={<Palette className="w-5 h-5" />}
            text="Store Design"
            isActive={activeSidebarItem === 'design'}
            onClick={() => setActiveSidebarItem('design')}
            href="/dashboard/design"
          />
          <SidebarItem 
            icon={<ShoppingBag className="w-5 h-5" />}
            text="Products"
            isActive={activeSidebarItem === 'products'}
            onClick={() => setActiveSidebarItem('products')}
            href="/dashboard/products"
          />
          <SidebarItem 
            icon={<Package className="w-5 h-5" />}
            text="Orders"
            isActive={activeSidebarItem === 'orders'}
            onClick={() => setActiveSidebarItem('orders')}
            href="/dashboard/orders"
          />
          <SidebarItem 
            icon={<BarChart3 className="w-5 h-5" />}
            text="Analytics"
            isActive={activeSidebarItem === 'analytics'}
            onClick={() => setActiveSidebarItem('analytics')}
            href="/dashboard/analytics"
          />
          <SidebarItem 
            icon={<Users className="w-5 h-5" />}
            text="Customers"
            isActive={activeSidebarItem === 'customers'}
            onClick={() => setActiveSidebarItem('customers')}
            href="/dashboard/customers"
          />
          
          <div className="px-4 py-2 mt-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account</p>
          </div>
          <SidebarItem 
            icon={<Settings className="w-5 h-5" />}
            text="Settings"
            isActive={activeSidebarItem === 'settings'}
            onClick={() => setActiveSidebarItem('settings')}
            href="/dashboard/settings"
          />
          <SidebarItem 
            icon={<CreditCard className="w-5 h-5" />}
            text="Billing"
            isActive={activeSidebarItem === 'billing'}
            onClick={() => setActiveSidebarItem('billing')}
            href="/dashboard/billing"
          />
          <SidebarItem 
            icon={<LogOut className="w-5 h-5" />}
            text="Log Out"
            isActive={false}
            onClick={handleLogout}
            href="#"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard/products/new"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Link>
            <div className="relative">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
                <span className="font-medium text-sm">JS</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              icon={<DollarSign className="w-5 h-5 text-green-600" />} 
              title="Total Sales" 
              value={`$${storeStats.totalSales.toLocaleString()}`} 
              trend="+12.5% from last month"
              trendUp={true}
            />
            <StatCard 
              icon={<ShoppingBag className="w-5 h-5 text-blue-600" />} 
              title="Orders Today" 
              value={storeStats.ordersToday.toString()} 
              trend="+3 since yesterday"
              trendUp={true}
            />
            <StatCard 
              icon={<Users className="w-5 h-5 text-purple-600" />} 
              title="Visitors" 
              value={storeStats.visitors.toLocaleString()} 
              trend="+5.2% from last week"
              trendUp={true}
            />
            <StatCard 
              icon={<TrendingUp className="w-5 h-5 text-orange-600" />} 
              title="Conversion Rate" 
              value={`${storeStats.conversionRate}%`} 
              trend="-0.5% from last week"
              trendUp={false}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Store Visits Graph */}
            <div className="bg-white rounded-lg shadow p-6 col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Store Visits</h2>
                <select className="text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Graph visualization would appear here</p>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
                <Link href="/dashboard/products" className="text-sm text-blue-600 hover:text-blue-800">View all</Link>
              </div>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <ShoppingBag className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} units sold</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">${product.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              <Link href="/dashboard/orders" className="text-sm text-blue-600 hover:text-blue-800">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${order.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/orders/${order.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Component for sidebar items
function SidebarItem({ icon, text, isActive, onClick, href }: { 
  icon: React.ReactNode; 
  text: string; 
  isActive: boolean; 
  onClick: () => void; 
  href: string 
}) {
  return (
    <Link 
      href={href}
      className={`flex items-center space-x-2 px-4 py-3 text-sm rounded-lg transition-colors ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className={isActive ? 'font-medium' : ''}>{text}</span>
      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
  );
}

// Component for stat cards
function StatCard({ icon, title, value, trend, trendUp }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  trend: string; 
  trendUp: boolean 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="p-2 rounded-lg bg-gray-50">{icon}</span>
        <Clock className="w-4 h-4 text-gray-400" />
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        <span className={`text-xs ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center`}>
          {trendUp ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          )}
          {trend}
        </span>
      </div>
    </div>
  );
} 