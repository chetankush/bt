"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CreditCard, 
  Home,
  CheckCircle,
  Clock,
  Share2,
  AlertCircle
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface OrderDetails {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  items: OrderItem[];
  paymentMethod: string;
  storeName: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// This would typically come from a database or API call using the orderId param
const getOrderDetails = (orderId: string): OrderDetails => {
  // For demo purposes, we'll return mock data
  return {
    id: orderId,
    date: '2023-10-15',
    status: 'shipped',
    total: 499.99,
    subtotal: 459.99,
    tax: 20.00,
    shipping: 20.00,
    items: [
      {
        id: 'ITEM001',
        name: 'Wireless Bluetooth Headphones',
        price: 199.99,
        quantity: 1,
        imageUrl: '/headphones.jpg'
      },
      {
        id: 'ITEM002',
        name: 'Smart Watch Series 5',
        price: 259.99,
        quantity: 1,
        imageUrl: '/smartwatch.jpg'
      },
      {
        id: 'ITEM003',
        name: 'USB-C Charging Cable',
        price: 19.99,
        quantity: 2,
        imageUrl: '/cable.jpg'
      }
    ],
    paymentMethod: 'Visa ending in 4242',
    storeName: 'ElectroTech Store',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States'
    },
    trackingNumber: 'TRK78945612300',
    estimatedDelivery: '2023-10-20'
  };
};

const OrderDetailPage = ({ params }: { params: { orderId: string } }) => {
  const router = useRouter();
  const orderId = params.orderId;
  const order = getOrderDetails(orderId);

  const getStatusIcon = (status: OrderDetails['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'processing':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'cancelled':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: OrderDetails['status']) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/buyer/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Order Details</h1>
          </div>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            <Home className="h-5 w-5" />
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Placed on {new Date(order.date).toLocaleDateString()} from {order.storeName}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className="font-medium">{getStatusText(order.status)}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          {order.trackingNumber && order.status === 'shipped' && (
            <div className="bg-blue-50 p-4 border-t border-blue-100">
              <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Your order is on its way</p>
                    <p className="text-sm text-gray-500">Estimated delivery on {new Date(order.estimatedDelivery!).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Track Package
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                  <span className="text-sm text-gray-500">{order.items.length} items</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex items-start">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 mr-4">
                      {/* Replace with actual image */}
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <Package className="h-10 w-10" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-md font-medium text-gray-900">{item.name}</h4>
                      <div className="mt-1 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="mt-4">
                        <Link 
                          href={`/buyer/order-again?itemId=${item.id}`}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">{order.paymentMethod}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Subtotal</span>
                    <span className="text-sm text-gray-900">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Shipping</span>
                    <span className="text-sm text-gray-900">${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Tax</span>
                    <span className="text-sm text-gray-900">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
              </div>
              <div className="p-6">
                <div className="space-y-1 text-sm text-gray-500">
                  <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>
            
            {/* Need Help */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Contact Store
                </button>
                <button className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Return Items
                </button>
                <Link 
                  href="/buyer/support"
                  className="block text-center text-sm text-blue-600 hover:text-blue-700"
                >
                  View Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailPage; 