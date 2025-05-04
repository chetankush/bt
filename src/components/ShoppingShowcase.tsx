import React from 'react';
import { Search, ShoppingCart, MapPin, CreditCard } from 'lucide-react';

const ShoppingShowcase = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Side */}
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Shop From Your Favorite Local Stores
              {/* <span className="block text-2xl md:text-3xl mt-4 text-black font-normal">
                All in one place
              </span> */}
            </h2>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex text-black items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition-colors">
                  <Search className="w-6 h-6 text-black group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black ">Find Local Products</h3>
                  <p className="text-black">Discover and shop from stores in your neighborhood. Support your local businesses.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition-colors">
                  <ShoppingCart className="w-6 h-6 text-black group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">One Cart, Multiple Stores</h3>
                  <p className="text-black">Add products from different stores to a single cart. Checkout once for all your items.</p>
                </div>
              </div>
{/* 
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition-colors">
                  <CreditCard className="w-6 h-6 text-black group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Secure Checkout</h3>
                  <p className="text-black">Pay securely with your preferred payment method. All transactions are protected.</p>
                </div>
              </div> */}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-6">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-gray-50 transition-colors">
                View Stores
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square">
              {/* Main Product Card */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden p-8">
                <div className="h-full flex flex-col">
                  <div className="relative h-3/4 bg-gray-100 rounded-2xl overflow-hidden mb-6">
                    <img 
                      src="/product_image.png" 
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 px-4 py-2 bg-black text-white text-sm rounded-full">
                      Popular Choice
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-black">Jordan Nike Originals</h4>
                      <div className="flex items-center gap-2 text-black">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Local Store, 2.5 mi away</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-black">$299</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 top-1/4 transform translate-x-1/2 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-black">Added to Cart</div>
                    <div className="text-gray-500">Just now</div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 -bottom-4 transform -translate-x-1/2 bg-white p-4 rounded-2xl shadow-lg">
                <div className="text-sm space-y-1">
                  <div className="font-semibold text-black">Chat with Store Owner</div>
                  <div className="text-gray-500">24x7 support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingShowcase;