import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">BrandsTenet</h3>
            <p className="text-gray-600 max-w-sm">
              Creating a seamless connection between local stores and online shoppers. Your one-stop platform for digital commerce.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Sellers */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">For Sellers</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/seller/signup" className="text-gray-600 hover:text-black transition-colors">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link href="/seller/pricing" className="text-gray-600 hover:text-black transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/seller/guide" className="text-gray-600 hover:text-black transition-colors">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="text-gray-600 hover:text-black transition-colors">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/seller/success" className="text-gray-600 hover:text-black transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* For Shoppers */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">For Shoppers</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/stores" className="text-gray-600 hover:text-black transition-colors">
                  Browse Stores
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-black transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-black transition-colors">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-black transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-black transition-colors">
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Contact & Support</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@brandstenet.com
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-black transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 border-t border-gray-200">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h4>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-gray-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} BrandsTenet. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-black transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-black transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;