"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ShoppingBag,
  Calendar,
  Download,
  Eye,
  XCircle,
  ChevronRight
} from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  items: number;
  status: string;
  payment: string;
  shippingMethod: string;
}

// Sample order data
const orders: Order[] = [
  { 
    id: 'ORD-7829', 
    customer: 'Alex Johnson', 
    email: 'alex.j@example.com',
    date: '15 Aug 2023', 
    total: 139.99, 
    items: 2,
    status: 'Delivered', 
    payment: 'Credit Card',
    shippingMethod: 'Standard'
  },
  { 
    id: 'ORD-7830', 
    customer: 'Sarah Miller', 
    email: 'sarah.m@example.com',
    date: '15 Aug 2023', 
    total: 89.99, 
    items: 1,
    status: 'Processing', 
    payment: 'PayPal',
    shippingMethod: 'Express'
  },
  { 
    id: 'ORD-7831', 
    customer: 'Michael Davis', 
    email: 'michael.d@example.com',
    date: '14 Aug 2023', 
    total: 219.50, 
    items: 3,
    status: 'Shipped', 
    payment: 'Credit Card',
    shippingMethod: 'Standard'
  },
  { 
    id: 'ORD-7832', 
    customer: 'Emily Wilson', 
    email: 'emily.w@example.com',
    date: '14 Aug 2023', 
    total: 65.75, 
    items: 1,
    status: 'Processing', 
    payment: 'Debit Card',
    shippingMethod: 'Standard'
  },
  { 
    id: 'ORD-7833', 
    customer: 'James Brown', 
    email: 'james.b@example.com',
    date: '13 Aug 2023', 
    total: 178.50, 
    items: 2,
    status: 'Delivered', 
    payment: 'Credit Card',
    shippingMethod: 'Express'
  },
  { 
    id: 'ORD-7834', 
    customer: 'Patricia Moore', 
    email: 'patricia.m@example.com',
    date: '13 Aug 2023', 
    total: 42.99, 
    items: 1,
    status: 'Cancelled', 
    payment: 'PayPal',
    shippingMethod: 'Standard'
  },
  { 
    id: 'ORD-7835', 
    customer: 'Robert Taylor', 
    email: 'robert.t@example.com',
    date: '12 Aug 2023', 
    total: 112.95, 
    items: 3,
    status: 'Delivered', 
    payment: 'Credit Card',
    shippingMethod: 'Standard'
  },
  { 
    id: 'ORD-7836', 
    customer: 'Linda Anderson', 
    email: 'linda.a@example.com',
    date: '12 Aug 2023', 
    total: 199.99, 
    items: 1,
    status: 'Refunded', 
    payment: 'Credit Card',
    shippingMethod: 'Express'
  },
  { 
    id: 'ORD-7837', 
    customer: 'William Harris', 
    email: 'william.h@example.com',
    date: '11 Aug 2023', 
    total: 87.50, 
    items: 2,
    status: 'Delivered', 
    payment: 'Debit Card',
    shippingMethod: 'Standard'
  },
  { 
    id: 'ORD-7838', 
    customer: 'Elizabeth Clark', 
    email: 'elizabeth.c@example.com',
    date: '11 Aug 2023', 
    total: 145.75, 
    items: 4,
    status: 'Shipped', 
    payment: 'PayPal',
    shippingMethod: 'Standard'
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let icon;
  let colorClass = '';
  
  switch (status) {
    case 'Delivered':
      icon = <CheckCircle className="w-4 h-4 mr-1" />;
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'Processing':
      icon = <Clock className="w-4 h-4 mr-1" />;
      colorClass = 'bg-blue-100 text-blue-800';
      break;
    case 'Shipped':
      icon = <Truck className="w-4 h-4 mr-1" />;
      colorClass = 'bg-indigo-100 text-indigo-800';
      break;
    case 'Cancelled':
      icon = <XCircle className="w-4 h-4 mr-1" />;
      colorClass = 'bg-red-100 text-red-800';
      break;
    case 'Refunded':
      icon = <AlertCircle className="w-4 h-4 mr-1" />;
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    default:
      icon = <Clock className="w-4 h-4 mr-1" />;
      colorClass = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {icon}
      {status}
    </span>
  );
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: 'ascending' | 'descending' }>({ 
    key: 'date', 
    direction: 'descending' 
  });
  
  // Status filter options
  const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
  
  // Date filter options
  const dateOptions = ['All', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'];
  
  // Handle sort
  const requestSort = (key: keyof Order) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  
  // Filter orders
  const filteredOrders = sortedOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    // Date filtering would require more complex logic with actual dates
    // This is a simplified version
    const matchesDate = dateFilter === 'All'; // Placeholder, would need real date filtering
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-gray-600 mr-2">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-50 mr-4">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">356</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-50 mr-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-2xl font-semibold text-gray-900">218</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-indigo-50 mr-4">
                <Truck className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Shipped</p>
                <p className="text-2xl font-semibold text-gray-900">42</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-50 mr-4">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Processing</p>
                <p className="text-2xl font-semibold text-gray-900">85</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-red-50 mr-4">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Issues</p>
                <p className="text-2xl font-semibold text-gray-900">11</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by order ID, customer name, or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <select
                    className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    {dateOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  More Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('id')}
                    >
                      Order ID
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('customer')}
                    >
                      Customer
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('date')}
                    >
                      Date
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('total')}
                    >
                      Total
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('items')}
                    >
                      Items
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('status')}
                    >
                      Status
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/dashboard/orders/${order.id}`} 
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                    <span className="font-medium">{orders.length}</span> orders
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 