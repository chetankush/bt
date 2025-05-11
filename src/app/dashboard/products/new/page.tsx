"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Save, 
  X, 
  ImagePlus, 
  Trash2, 
  Plus, 
  Info, 
  DollarSign, 
  Package,
  Tag,
  Truck,
  BarChart3,
  Archive
} from 'lucide-react';

// Sample category options
const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Accessories' },
  { id: 3, name: 'Home & Kitchen' },
  { id: 4, name: 'Furniture' },
  { id: 5, name: 'Clothing' },
  { id: 6, name: 'Books' },
];

interface ImageData {
  id: number;
  name: string;
  url: string;
}

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  compareAtPrice: string;
  costPerItem: string;
  sku: string;
  barcode: string;
  quantity: string;
  category: string;
  tags: string[];
  taxable: boolean;
  shippingRequired: boolean;
  status: string;
  images: ImageData[];
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  variants: any[]; // Using any[] for now, would define proper type in production
}

export default function NewProductPage() {
  const router = useRouter();
  
  // Product form state
  const [productForm, setProductForm] = useState<ProductFormState>({
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
    costPerItem: '',
    sku: '',
    barcode: '',
    quantity: '',
    category: '',
    tags: [],
    taxable: true,
    shippingRequired: true,
    status: 'draft',
    images: [],
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    variants: []
  });

  // Tag input state
  const [tagInput, setTagInput] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setProductForm({ ...productForm, [name]: checked });
    } else if (name.includes('.')) {
      // Handle nested properties (like dimensions)
      const [parent, child] = name.split('.');
      setProductForm({
        ...productForm,
        [parent]: {
          ...productForm[parent as keyof ProductFormState],
          [child]: value
        }
      });
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  // Handle tag input 
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Add tag when Enter is pressed
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!productForm.tags.includes(tagInput.trim())) {
        setProductForm({
          ...productForm,
          tags: [...productForm.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setProductForm({
      ...productForm,
      tags: productForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you'd upload to a server
    // This is just a placeholder for demo purposes
    const files = Array.from(e.target.files || []);
    
    if (files.length) {
      // Simulate adding image URLs
      const newImages = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        url: URL.createObjectURL(file)
      }));
      
      setProductForm({
        ...productForm,
        images: [...productForm.images, ...newImages]
      });
    }
  };

  // Remove image
  const removeImage = (imageId: number) => {
    setProductForm({
      ...productForm,
      images: productForm.images.filter(image => image.id !== imageId)
    });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server
    console.log('Product data to submit:', productForm);
    // Show success message
    alert('Product added successfully!');
    // Redirect to products list
    router.push('/dashboard/products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard/products" className="flex items-center text-gray-400 hover:text-gray-600 mr-2">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Add New Product</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={productForm.name}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g. Wireless Earbuds Pro"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      value={productForm.description}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Describe your product..."
                    />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Media</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Upload button */}
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors aspect-square"
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-500">Add Image</span>
                      <input
                        type="file"
                        id="image-upload"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    
                    {/* Display uploaded images */}
                    {productForm.images.map((image) => (
                      <div key={image.id} className="relative border border-gray-200 rounded-lg overflow-hidden aspect-square">
                        <div className="absolute inset-0">
                          <Image 
                            src={image.url} 
                            alt={image.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {productForm.images.length === 0 && (
                    <p className="text-sm text-gray-500 mt-4">
                      Drag and drop images or click to upload. You can add multiple images for your product.
                    </p>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Pricing</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          value={productForm.price}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="compareAtPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Compare-at Price
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="compareAtPrice"
                          id="compareAtPrice"
                          value={productForm.compareAtPrice}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Customers will see this as the original price
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="costPerItem" className="block text-sm font-medium text-gray-700 mb-1">
                        Cost per item
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="costPerItem"
                          id="costPerItem"
                          value={productForm.costPerItem}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Used to calculate profit margins
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center">
                      <input
                        id="taxable"
                        name="taxable"
                        type="checkbox"
                        checked={productForm.taxable}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="taxable" className="ml-2 block text-sm text-gray-700">
                        This product is taxable
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Inventory</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                        SKU (Stock Keeping Unit)
                      </label>
                      <input
                        type="text"
                        name="sku"
                        id="sku"
                        value={productForm.sku}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g. WEP-001"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
                        Barcode (ISBN, UPC, GTIN, etc.)
                      </label>
                      <input
                        type="text"
                        name="barcode"
                        id="barcode"
                        value={productForm.barcode}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="e.g. 123456789012"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={productForm.quantity}
                      onChange={handleChange}
                      min="0"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center">
                      <input
                        id="shippingRequired"
                        name="shippingRequired"
                        type="checkbox"
                        checked={productForm.shippingRequired}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="shippingRequired" className="ml-2 block text-sm text-gray-700">
                        This product requires shipping
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Shipping</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (in kg)
                    </label>
                    <input
                      type="text"
                      name="weight"
                      id="weight"
                      value={productForm.weight}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0.0"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="dimensions.length" className="block text-sm font-medium text-gray-700 mb-1">
                        Length (cm)
                      </label>
                      <input
                        type="text"
                        name="dimensions.length"
                        id="dimensions.length"
                        value={productForm.dimensions.length}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dimensions.width" className="block text-sm font-medium text-gray-700 mb-1">
                        Width (cm)
                      </label>
                      <input
                        type="text"
                        name="dimensions.width"
                        id="dimensions.width"
                        value={productForm.dimensions.width}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dimensions.height" className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="text"
                        name="dimensions.height"
                        id="dimensions.height"
                        value={productForm.dimensions.height}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Organization & Status */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Status</h2>
                </div>
                <div className="p-6">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Product status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={productForm.status}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Organization</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={productForm.category}
                      onChange={handleChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {productForm.tags.map((tag) => (
                        <div 
                          key={tag}
                          className="flex items-center bg-blue-50 text-blue-700 text-sm rounded-full px-3 py-1"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-blue-500 hover:text-blue-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagKeyDown}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter tags (press Enter to add)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Buttons at bottom */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 