"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ChevronDown,
  Package,
  Truck,
  ShieldCheck,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

interface ProductDetails {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  storeId: string;
  storeName: string;
  relatedProducts: string[];
  reviews: ProductReview[];
}

const getProductDetails = (productId: string): ProductDetails => {
  // Mock data - in a real app this would come from an API call
  return {
    id: productId,
    name: "Wireless Noise-Cancelling Headphones",
    brand: "AudioTech",
    price: 299.99,
    discountPrice: 249.99,
    rating: 4.7,
    reviewCount: 128,
    inStock: true,
    stockCount: 23,
    description: "Experience superior sound quality with these premium wireless headphones. Featuring advanced noise cancellation technology, comfortable over-ear design, and long battery life for all-day listening pleasure.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Premium comfort with memory foam ear cups",
      "Built-in microphone for calls",
      "Bluetooth 5.0 connectivity",
      "Fast charging - 5 minutes for 3 hours of playback"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 Ohm",
      "Bluetooth Version": "5.0",
      "Battery Life": "40 hours (ANC on), 60 hours (ANC off)",
      "Charging Time": "2 hours",
      "Weight": "250g",
      "Color": "Matte Black",
      "Connectivity": "Bluetooth, 3.5mm audio jack",
      "In the Box": "Headphones, Carrying case, USB-C charging cable, 3.5mm audio cable"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"
    ],
    storeId: "store123",
    storeName: "Tech Wizards",
    relatedProducts: ["prod1", "prod2", "prod3", "prod4"],
    reviews: [
      {
        id: "rev1",
        userName: "John D.",
        rating: 5,
        date: "2023-09-10",
        title: "Best headphones I've ever owned",
        comment: "I've tried many headphones in the past, but these are by far the best. The noise cancellation is exceptional, and the sound quality is incredible. Battery life is also impressive - I've used them for a week without needing to recharge.",
        helpful: 24,
        notHelpful: 2,
        verified: true
      },
      {
        id: "rev2",
        userName: "Sarah M.",
        rating: 4,
        date: "2023-08-22",
        title: "Great quality with minor issues",
        comment: "Sound quality is amazing and the battery lasts forever. The only downside is that they get a bit uncomfortable after wearing them for 3+ hours. Otherwise, they're perfect!",
        helpful: 18,
        notHelpful: 3,
        verified: true
      },
      {
        id: "rev3",
        userName: "Michael T.",
        rating: 5,
        date: "2023-08-15",
        title: "Worth every penny",
        comment: "These headphones have transformed my listening experience. The noise cancellation is so good that I can't hear anything around me when it's turned on. Perfect for focusing on work or enjoying music.",
        helpful: 12,
        notHelpful: 0,
        verified: true
      }
    ]
  };
};

const ProductDetailPage = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { addToCart, getCartCount } = useCart();
  
  const productId = params.productId;
  const product = getProductDetails(productId);
  
  // State
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product.stockCount || 10)) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    try {
      // Add to cart using CartContext
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.images[0],
        storeId: product.storeId,
        storeName: product.storeName
      }, quantity);
      
      // Show success message
      setShowCartSuccess(true);
      setTimeout(() => setShowCartSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
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
      
      {/* Cart Success Message */}
      {showCartSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <Check className="h-5 w-5 mr-2" />
          <span>Added to cart successfully!</span>
        </div>
      )}
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </button>
            
            <nav className="ml-4 text-sm text-gray-500 flex items-center">
              <Link href="/" className="hover:text-gray-900">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href={`/stores/${product.storeId}`} className="hover:text-gray-900">{product.storeName}</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
            </nav>
          </div>
      
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="aspect-w-1 aspect-h-1 bg-white relative">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                  />
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`border rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="aspect-w-1 aspect-h-1 bg-white relative">
                      <Image
                        src={image}
                        alt={`${product.name} - view ${index + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {product.brand}
                    </span>
                    {product.inStock ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                        In Stock ({product.stockCount})
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center">
                      {product.discountPrice ? (
                        <>
                          <span className="text-3xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                          <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                          <span className="ml-2 text-sm font-medium text-green-600">
                            Save ${(product.price - product.discountPrice).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Short Description */}
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  {/* Key Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Key Features</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Add to Cart Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Quantity */}
                      <div className="w-36">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            id="quantity"
                            min="1"
                            max={product.stockCount || 10}
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                            className="w-12 border-0 text-center focus:ring-0 p-0"
                          />
                          <button 
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= (product.stockCount || 10)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <div className="flex-1">
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          disabled={!product.inStock || isAddingToCart}
                          className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                            !product.inStock 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : isAddingToCart
                                ? 'bg-blue-500 opacity-75'
                                : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shipping & Returns Section */}
              <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping & Returns</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <Truck className="h-5 w-5 text-blue-600 flex-shrink-0 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Fast Delivery</h3>
                      <p className="text-sm text-gray-600">Delivery within 2-5 business days</p>
                    </div>
                  </div>
                  <div className="flex">
                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Secure Payment</h3>
                      <p className="text-sm text-gray-600">Multiple secure payment options</p>
                    </div>
                  </div>
                  <div className="flex">
                    <RefreshCw className="h-5 w-5 text-blue-600 flex-shrink-0 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Easy Returns</h3>
                      <p className="text-sm text-gray-600">30-day return policy with no questions asked</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'specifications'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {/* Description Tab Content */}
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Specifications Tab Content */}
              {activeTab === 'specifications' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Reviews Tab Content */}
              {activeTab === 'reviews' && (
                <div>
                  {/* Reviews Summary */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                        <div className="flex mt-2 justify-center">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">Based on {product.reviewCount} reviews</div>
                      </div>
                      
                      <div className="flex-1 max-w-md">
                        {[5, 4, 3, 2, 1].map(rating => {
                          const count = product.reviews.filter(r => Math.floor(r.rating) === rating).length;
                          const percentage = (count / product.reviews.length) * 100;
                          
                          return (
                            <div key={rating} className="flex items-center mt-1">
                              <span className="text-sm text-gray-600 w-8">{rating} ★</span>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2 mr-2">
                                <div 
                                  className="bg-yellow-400 h-2.5 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-10">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Review List */}
                  <div className="space-y-6">
                    {product.reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between mb-2">
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">{review.userName}</span>
                              {review.verified && (
                                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center mt-1">
                              {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <h4 className="text-gray-900 font-medium mb-1">{review.title}</h4>
                        <p className="text-gray-600 mb-3">{review.comment}</p>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-600 mr-4">Was this review helpful?</span>
                          <button className="flex items-center text-gray-600 hover:text-blue-600 mr-4">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{review.helpful}</span>
                          </button>
                          <button className="flex items-center text-gray-600 hover:text-blue-600">
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            <span>{review.notHelpful}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Link href={`/products/prod${item}`} key={item} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative">
                    <Image
                      src={`https://images.unsplash.com/photo-157${1520000 + item * 10000}-a3e426bf472b?q=80&w=400&auto=format&fit=crop`}
                      alt="Related Product"
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                      Premium Audio Device {item}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">AudioTech</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-gray-900 font-bold">${(99.99 + item * 20).toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.{item + 1}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage; 