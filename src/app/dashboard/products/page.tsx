"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Copy, 
  Eye,
  Tag,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  inventory: number;
  category: string;
  status: string;
  image: string;
}

// Sample product data
const products: Product[] = [
  { 
    id: 1, 
    name: 'Wireless Earbuds Pro', 
    price: 49.99, 
    inventory: 124, 
    category: 'Electronics',
    status: 'Active',
    image: '/earbuds.jpg'
  },
  { 
    id: 2, 
    name: 'Ultra Slim Laptop Case', 
    price: 24.99, 
    inventory: 85, 
    category: 'Accessories',
    status: 'Active',
    image: '/laptop-case.jpg'
  },
  { 
    id: 3, 
    name: 'Smart Watch Elite', 
    price: 125.00, 
    inventory: 42, 
    category: 'Electronics',
    status: 'Active',
    image: '/smartwatch.jpg'
  },
  { 
    id: 4, 
    name: 'Premium Leather Wallet', 
    price: 39.99, 
    inventory: 56, 
    category: 'Accessories',
    status: 'Draft',
    image: '/wallet.jpg'
  },
  { 
    id: 5, 
    name: '4K Action Camera', 
    price: 199.99, 
    inventory: 28, 
    category: 'Electronics',
    status: 'Active',
    image: '/camera.jpg'
  },
  { 
    id: 6, 
    name: 'Bluetooth Speaker Mini', 
    price: 79.99, 
    inventory: 63, 
    category: 'Electronics',
    status: 'Low Stock',
    image: '/speaker.jpg'
  },
  { 
    id: 7, 
    name: 'Thermal Travel Mug', 
    price: 19.99, 
    inventory: 92, 
    category: 'Home & Kitchen',
    status: 'Active',
    image: '/mug.jpg'
  },
  { 
    id: 8, 
    name: 'Fitness Tracker Band', 
    price: 59.99, 
    inventory: 0, 
    category: 'Electronics',
    status: 'Out of Stock',
    image: '/tracker.jpg'
  },
  { 
    id: 9, 
    name: 'Ergonomic Desk Chair', 
    price: 199.99, 
    inventory: 17, 
    category: 'Furniture',
    status: 'Active',
    image: '/chair.jpg'
  },
  { 
    id: 10, 
    name: 'Wireless Charging Pad', 
    price: 34.99, 
    inventory: 71, 
    category: 'Electronics',
    status: 'Active',
    image: '/charging-pad.jpg'
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let colorClass = '';
  
  switch (status) {
    case 'Active':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'Draft':
      colorClass = 'bg-gray-100 text-gray-800';
      break;
    case 'Low Stock':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Out of Stock':
      colorClass = 'bg-red-100 text-red-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'ascending' | 'descending' }>({ 
    key: 'name', 
    direction: 'ascending' 
  });
  const [productsData, setProductsData] = useState<Product[]>(products);
  const router = useRouter();
  
  // Category options
  const categories = ['All', 'Electronics', 'Accessories', 'Home & Kitchen', 'Furniture'];
  
  // Status options
  const statuses = ['All', 'Active', 'Draft', 'Low Stock', 'Out of Stock'];
  
  // Handle sort
  const requestSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Sort products
  const sortedProducts = [...productsData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  
  // Filter products
  const filteredProducts = sortedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Toggle product selection
  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  // Select all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };
  
  // Bulk actions
  const bulkDelete = () => {
    alert(`Deleting ${selectedProducts.length} products`);
    // In real app, would delete selected products
    setSelectedProducts([]);
  };
  
  // Handle view product
  const handleViewProduct = (product: Product) => {
    alert(`Viewing product: ${product.name}\nPrice: $${product.price}\nInventory: ${product.inventory}\nCategory: ${product.category}\nStatus: ${product.status}`);
  };
  
  // Handle edit product
  const handleEditProduct = (productId: number) => {
    router.push(`/dashboard/products/new?id=${productId}`);
  };
  
  // Handle duplicate product
  const handleDuplicateProduct = (product: Product) => {
    alert(`Product "${product.name}" has been duplicated.`);
  };
  
  // Handle delete product
  const handleDeleteProduct = (productId: number) => {
    if (confirm(`Are you sure you want to delete this product?`)) {
      setProductsData(productsData.filter(product => product.id !== productId));
      // Also remove from selected products if it's there
      if (selectedProducts.includes(productId)) {
        setSelectedProducts(selectedProducts.filter(id => id !== productId));
      }
    }
  };
  
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
              <h1 className="text-xl font-semibold text-gray-900">Products</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/products/import"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Import
              </Link>
              <Link
                href="/dashboard/products/new"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and bulk actions */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <select
                    className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
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
          
          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 mr-4">
                    {selectedProducts.length} selected
                  </span>
                  <button 
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium mr-4"
                    onClick={() => setSelectedProducts([])}
                  >
                    Deselect All
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Tag className="h-4 w-4 mr-1.5 text-gray-500" />
                    Update Status
                  </button>
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                    onClick={bulkDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-1.5 text-red-500" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Products Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('name')}
                    >
                      Product
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('category')}
                    >
                      Category
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('price')}
                    >
                      Price
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider focus:outline-none"
                      onClick={() => requestSort('inventory')}
                    >
                      Inventory
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                            {/* Placeholder for product image */}
                            <span className="text-xs text-gray-500">Image</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.inventory}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button 
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleDuplicateProduct(product)}
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
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
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                    <span className="font-medium">{products.length}</span> products
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