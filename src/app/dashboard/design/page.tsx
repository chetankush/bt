"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  PaintBucket, 
  Palette,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Layers,
  MonitorSmartphone,
  ChevronRight,
  Smartphone
} from 'lucide-react';

// Sample theme data
const colorSchemes = [
  { id: 1, name: 'Modern Blue', primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6', text: '#1e293b', background: '#f8fafc' },
  { id: 2, name: 'Forest Green', primary: '#047857', secondary: '#065f46', accent: '#10b981', text: '#1f2937', background: '#f9fafb' },
  { id: 3, name: 'Sunset Orange', primary: '#ea580c', secondary: '#9a3412', accent: '#f97316', text: '#1e293b', background: '#fff7ed' },
  { id: 4, name: 'Elegant Purple', primary: '#7e22ce', secondary: '#581c87', accent: '#a855f7', text: '#1e293b', background: '#faf5ff' },
  { id: 5, name: 'Classic Gray', primary: '#4b5563', secondary: '#374151', accent: '#6b7280', text: '#1f2937', background: '#f9fafb' },
];

const fontOptions = [
  { id: 1, name: 'Inter', value: 'Inter, sans-serif', style: 'Modern, clean' },
  { id: 2, name: 'Playfair Display', value: 'Playfair Display, serif', style: 'Elegant, luxury' },
  { id: 3, name: 'Roboto', value: 'Roboto, sans-serif', style: 'Versatile, neutral' },
  { id: 4, name: 'Poppins', value: 'Poppins, sans-serif', style: 'Modern, geometric' },
  { id: 5, name: 'Montserrat', value: 'Montserrat, sans-serif', style: 'Contemporary, professional' },
];

const layoutOptions = [
  { id: 1, name: 'Classic Grid', description: 'Traditional grid layout', preview: '/grid-layout.png' },
  { id: 2, name: 'Masonry', description: 'Pinterest-style staggered grid', preview: '/masonry-layout.png' },
  { id: 3, name: 'List View', description: 'Clean list with product details', preview: '/list-layout.png' },
];

export default function StoreDesign() {
  const [activeTab, setActiveTab] = useState('theme');
  const [selectedColor, setSelectedColor] = useState(colorSchemes[0]);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
  const [selectedLayout, setSelectedLayout] = useState(layoutOptions[0]);
  const [logoUrl, setLogoUrl] = useState('/demo-logo.png');
  const [bannerUrl, setBannerUrl] = useState('/demo-banner.jpg');
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'theme':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Color Scheme</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedColor(scheme)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedColor.id === scheme.id 
                      ? 'border-blue-500 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">{scheme.name}</span>
                    {selectedColor.id === scheme.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div style={{ backgroundColor: scheme.primary }} className="w-8 h-8 rounded"></div>
                    <div style={{ backgroundColor: scheme.secondary }} className="w-8 h-8 rounded"></div>
                    <div style={{ backgroundColor: scheme.accent }} className="w-8 h-8 rounded"></div>
                    <div style={{ backgroundColor: scheme.text }} className="w-8 h-8 rounded"></div>
                    <div style={{ backgroundColor: scheme.background, border: '1px solid #e5e7eb' }} className="w-8 h-8 rounded"></div>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Fonts</h3>
            <div className="space-y-4 mb-8">
              {fontOptions.map((font) => (
                <button
                  key={font.id}
                  onClick={() => setSelectedFont(font)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedFont.id === font.id 
                      ? 'border-blue-500 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span 
                        className="text-lg font-medium text-gray-900 block"
                        style={{ fontFamily: font.value }}
                      >
                        {font.name}
                      </span>
                      <span className="text-sm text-gray-500">{font.style}</span>
                    </div>
                    {selectedFont.id === font.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'layout':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Layout</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {layoutOptions.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedLayout.id === layout.id 
                      ? 'border-blue-500 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Layout Preview</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900 block">{layout.name}</span>
                      <span className="text-sm text-gray-500">{layout.description}</span>
                    </div>
                    {selectedLayout.id === layout.id && (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Homepage Layout</h3>
            <div className="space-y-4 mb-8">
              <div className="p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-2">Featured Products Section</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-gray-100 rounded h-24 mb-2">
                  <span className="text-gray-500 text-sm">Section Preview</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Position: Top</span>
                  <button className="text-sm text-blue-600">Customize</button>
                </div>
              </div>

              <div className="p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-2">Categories Section</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-gray-100 rounded h-24 mb-2">
                  <span className="text-gray-500 text-sm">Section Preview</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Position: Middle</span>
                  <button className="text-sm text-blue-600">Customize</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'branding':
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Store Logo</h3>
            <div className="mb-8">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-32 h-32 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                  {logoUrl ? (
                    <div className="relative w-28 h-28">
                      <Image fill src={logoUrl} alt="Store logo" className="object-contain" />
                    </div>
                  ) : (
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                <div className="space-y-4">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Replace Logo
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                    Remove
                  </button>
                  <p className="text-xs text-gray-500">Recommended size: 400x400px</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Store Banner</h3>
            <div className="mb-8">
              <div className="flex flex-col gap-4 mb-4">
                <div className="w-full h-48 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                  {bannerUrl ? (
                    <div className="relative w-full h-full">
                      <Image fill src={bannerUrl} alt="Store banner" className="object-cover" />
                    </div>
                  ) : (
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                <div className="flex gap-4">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Replace Banner
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                    Remove
                  </button>
                </div>
                <p className="text-xs text-gray-500">Recommended size: 1600x400px</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="text-black hover:text-gray-600">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <span className="font-semibold text-black">Store Design</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <button
                onClick={() => setActiveTab('theme')}
                className={`w-full px-4 py-4 text-left text-sm font-medium flex items-center gap-3 ${
                  activeTab === 'theme' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Palette className="w-5 h-5" />
                <span>Theme & Colors</span>
              </button>
              <button
                onClick={() => setActiveTab('layout')}
                className={`w-full px-4 py-4 text-left text-sm font-medium flex items-center gap-3 ${
                  activeTab === 'layout' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Layout className="w-5 h-5" />
                <span>Layout</span>
              </button>
              <button
                onClick={() => setActiveTab('branding')}
                className={`w-full px-4 py-4 text-left text-sm font-medium flex items-center gap-3 ${
                  activeTab === 'branding' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <ImageIcon className="w-5 h-5" />
                <span>Logo & Branding</span>
              </button>
            </div>
            
            <div className="mt-6 bg-white rounded-lg shadow p-5">
              <h3 className="font-medium text-gray-900 mb-4">Showcase Your Brand</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your store design is the first impression customers have of your brand. Make it count with a professional and cohesive look.
              </p>
              <Link 
                href="/dashboard/design/templates" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Browse pre-made templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Tab content */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              {renderTabContent()}
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Live Preview</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-2 rounded-md ${previewDevice === 'desktop' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <MonitorSmartphone className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-2 rounded-md ${previewDevice === 'mobile' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <Smartphone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 flex justify-center">
                <div 
                  className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${
                    previewDevice === 'desktop' ? 'w-full max-w-3xl aspect-[16/9]' : 'w-64 aspect-[9/16]'
                  }`}
                  style={{ 
                    backgroundColor: selectedColor.background, 
                    fontFamily: selectedFont.value
                  }}
                >
                  {/* Mock Store Preview */}
                  <div className="h-14 px-4 flex items-center" style={{ backgroundColor: selectedColor.primary, color: '#ffffff' }}>
                    <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
                    <span className="font-medium">Your Store</span>
                  </div>
                  <div className="p-3">
                    <div className="w-full h-36 bg-gray-100 mb-4 flex items-center justify-center rounded">
                      <span className="text-sm text-gray-500">Banner Image</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="w-24 h-24 bg-gray-100 rounded"></div>
                      <div className="w-24 h-24 bg-gray-100 rounded"></div>
                      <div className="w-24 h-24 bg-gray-100 rounded"></div>
                      <div className="w-24 h-24 bg-gray-100 rounded"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </div>
                    <button 
                      className="px-4 py-2 rounded text-white text-sm"
                      style={{ backgroundColor: selectedColor.primary }}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 