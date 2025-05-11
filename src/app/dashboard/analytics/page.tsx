"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp,
  BarChart3,
  LineChart,
  PieChart,
  Filter,
  Download,
  Calendar,
  CreditCard,
  Globe,
  MapPin,
  TrendingUp,
  UserPlus,
  Eye
} from 'lucide-react';

// Sample analytics data
const summaryMetrics = [
  { id: 'revenue', label: 'Total Revenue', value: '$24,950', change: '+12.5%', isPositive: true, icon: DollarSign },
  { id: 'orders', label: 'Total Orders', value: '356', change: '+8.2%', isPositive: true, icon: ShoppingCart },
  { id: 'customers', label: 'Total Customers', value: '214', change: '+15.3%', isPositive: true, icon: Users },
  { id: 'avgOrder', label: 'Avg. Order Value', value: '$70.08', change: '+4.6%', isPositive: true, icon: CreditCard },
];

const timeFrames = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date', 'Custom'];

const topProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', sales: 64, revenue: 3199.36, percentOfTotal: 15 },
  { id: 2, name: 'Smart Watch Elite', sales: 42, revenue: 5250.00, percentOfTotal: 12 },
  { id: 3, name: 'Ultra Slim Laptop Case', sales: 38, revenue: 949.62, percentOfTotal: 8 },
  { id: 4, name: 'Bluetooth Speaker Mini', sales: 35, revenue: 2799.65, percentOfTotal: 7 },
  { id: 5, name: 'Premium Phone Charger', sales: 32, revenue: 1119.68, percentOfTotal: 6 },
];

const trafficSources = [
  { source: 'Direct', sessions: 2450, percentage: 35, color: '#3b82f6' },
  { source: 'Organic Search', sessions: 1680, percentage: 24, color: '#10b981' },
  { source: 'Social Media', sessions: 1260, percentage: 18, color: '#6366f1' },
  { source: 'Referrals', sessions: 840, percentage: 12, color: '#f97316' },
  { source: 'Email', sessions: 770, percentage: 11, color: '#8b5cf6' },
];

const customerLocations = [
  { location: 'United States', customers: 98, percentage: 46, color: '#3b82f6' },
  { location: 'Canada', customers: 45, percentage: 21, color: '#10b981' },
  { location: 'United Kingdom', customers: 32, percentage: 15, color: '#6366f1' },
  { location: 'Australia', customers: 19, percentage: 9, color: '#f97316' },
  { location: 'Germany', customers: 12, percentage: 6, color: '#8b5cf6' },
  { location: 'Other', customers: 8, percentage: 3, color: '#9ca3af' },
];

const dailySales = [
  { day: 'Mon', sales: 1250, orders: 18 },
  { day: 'Tue', sales: 1480, orders: 22 },
  { day: 'Wed', sales: 1620, orders: 24 },
  { day: 'Thu', sales: 1350, orders: 19 },
  { day: 'Fri', sales: 1880, orders: 27 },
  { day: 'Sat', sales: 2100, orders: 32 },
  { day: 'Sun', sales: 1750, orders: 26 },
];

export default function AnalyticsDashboard() {
  const [timeFrame, setTimeFrame] = useState('Last 30 days');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-gray-600 mr-2">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <div className="relative">
                <select
                  className="pl-3 pr-10 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  {timeFrames.map((frame) => (
                    <option key={frame} value={frame}>{frame}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryMetrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-blue-50">
                  <metric.icon className="w-5 h-5 text-blue-600" />
                </div>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.label}</h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-semibold text-gray-800">{metric.value}</p>
                <span className={`text-xs ${metric.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {metric.isPositive ? (
                    <ArrowUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-1" />
                  )}
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Sales Trend</h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">Daily</button>
                <button className="px-3 py-1 text-xs font-medium rounded-full text-gray-500 hover:bg-gray-100">Weekly</button>
                <button className="px-3 py-1 text-xs font-medium rounded-full text-gray-500 hover:bg-gray-100">Monthly</button>
              </div>
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 flex flex-col gap-2">
              <div className="flex justify-between items-end h-full pb-6 relative">
                {dailySales.map((data, index) => (
                  <div key={index} className="flex flex-col items-center w-1/7">
                    <div className="w-12 bg-blue-500 rounded-t-md" style={{ height: `${(data.sales / 2100) * 100}%` }}></div>
                    <span className="text-xs text-gray-500 mt-2">{data.day}</span>
                  </div>
                ))}
                {/* Y-axis values would be here in a real chart */}
              </div>
              <div className="grid grid-cols-7 text-center border-t border-gray-200 pt-2">
                {dailySales.map((data, index) => (
                  <div key={index} className="text-xs text-gray-500">${data.sales}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Traffic Sources</h2>
            
            {/* Pie chart placeholder */}
            <div className="h-40 flex justify-center items-center mb-4 relative">
              <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="w-20 h-20 text-gray-300" />
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></div>
                    <span className="text-sm text-gray-700">{source.source}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{source.percentage}%</span>
                    <span className="text-xs text-gray-500">{source.sessions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
              <Link href="/dashboard/products" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th scope="col" className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th scope="col" className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{product.sales}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${product.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-medium text-gray-900">{product.percentOfTotal}%</span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1 ml-auto">
                          <div className="h-1.5 bg-blue-600 rounded-full" style={{ width: `${product.percentOfTotal}%` }}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Locations */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Customer Locations</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                View Map
              </button>
            </div>
            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th scope="col" className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                    <th scope="col" className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerLocations.map((location) => (
                    <tr key={location.location} className="hover:bg-gray-50">
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{location.location}</span>
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{location.customers}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-medium text-gray-900">{location.percentage}%</span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1 ml-auto">
                          <div className="h-1.5 rounded-full" style={{ width: `${location.percentage}%`, backgroundColor: location.color }}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Insights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Behavior Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Customer Behavior</h2>
              <div className="p-1.5 rounded-md bg-gray-100">
                <UserPlus className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">New Customers</span>
                  <span className="text-sm font-medium text-gray-900">68</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className="w-7/12 h-1.5 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Returning Customers</span>
                  <span className="text-sm font-medium text-gray-900">146</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className="w-10/12 h-1.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Cart Abandonment</span>
                  <span className="text-sm font-medium text-gray-900">28%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className="w-3/12 h-1.5 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Metrics Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Conversion Metrics</h2>
              <div className="p-1.5 rounded-md bg-gray-100">
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Store Visits</span>
                  <span className="text-sm font-medium text-gray-900">7,845</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className="w-full h-1.5 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Product Views</span>
                  <span className="text-sm font-medium text-gray-900">4,582</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className="w-7/12 h-1.5 bg-indigo-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Add to Cart</span>
                  <span className="text-sm font-medium text-gray-900">812</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className="w-1/6 h-1.5 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Purchases</span>
                  <span className="text-sm font-medium text-gray-900">356</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div className="w-1/12 h-1.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Products Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Popular Pages</h2>
              <div className="p-1.5 rounded-md bg-gray-100">
                <Eye className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { page: 'Homepage', views: 3240, percentage: 42 },
                { page: 'Electronics Category', views: 1850, percentage: 24 },
                { page: 'Wireless Earbuds Pro', views: 1245, percentage: 16 },
                { page: 'Smart Watch Elite', views: 985, percentage: 12 },
                { page: 'About Us', views: 525, percentage: 6 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-900">{item.page}</span>
                    <span className="block text-xs text-gray-500">{item.views} views</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 