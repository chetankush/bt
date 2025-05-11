# BrandsTenet

BrandsTenet is a comprehensive multi-vendor e-commerce platform that connects buyers with local and global sellers in a unified marketplace. The platform enables sellers to create their own branded online stores while providing buyers with a seamless shopping experience across multiple stores.

## 🚀 Features

### For Buyers
- **User Authentication**: Secure signup and login functionality
- **Store Discovery**: Browse and search stores by location, category, and more using both grid and map views
- **Product Browsing**: View and filter products from various stores
- **Order Management**: Track orders, view order history, and manage returns
- **Favorites**: Save favorite stores and products for later
- **Reviews & Ratings**: Rate and review products and stores

### For Sellers
- **Store Creation**: Easy setup and customization of online stores
- **Store Design**: Choose from multiple themes and customize store appearance
- **Product Management**: Add, edit, and manage product listings
- **Order Processing**: Manage orders, shipments, and returns
- **Analytics Dashboard**: Track sales, customer behavior, and other key metrics
- **Marketing Tools**: Promote products and drive traffic to the store

## 🔧 Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Maps & Location**: Mapbox GL
- **UI Components**: Lucide React (icons)
- **Animations**: GSAP

## 📋 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Mapbox API key (for store location features)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/brandstenet.git
   cd brandstenet
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Mapbox token:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
brandstenet/
├─ public/           # Static assets
├─ src/
│  ├─ app/           # Next.js app router pages
│  │  ├─ api/        # API routes
│  │  ├─ auth/       # Authentication pages
│  │  ├─ buyer/      # Buyer pages
│  │  ├─ dashboard/  # Seller dashboard
│  │  ├─ products/   # Product pages
│  │  ├─ stores/     # Store pages
│  ├─ components/    # Reusable React components
│  ├─ hooks/         # Custom React hooks
│  ├─ config/        # Configuration files
├─ .env.local        # Environment variables (create this)
├─ package.json      # Project dependencies
├─ README.md         # Project documentation
```

## 📱 Key Pages

### Buyer Flow
- **Home**: Main landing page
- **Store Listing**: Discover and browse stores
- **Store Detail**: View a specific store and its products
- **Product Detail**: View product information and add to cart
- **Orders**: View and track orders
- **Profile**: Manage account settings

### Seller Flow
- **Dashboard**: Overview of store performance
- **Products**: Manage product listings
- **Orders**: Process and manage orders
- **Analytics**: View sales and visitor data
- **Store Design**: Customize store appearance
- **Settings**: Manage store settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions, feel free to reach out to us at support@brandstenet.com.
