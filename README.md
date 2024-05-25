# ShoeShack - An E-commerce Shoe WebApp

## Overview

ShoeShack is a modern and responsive e-commerce web application built with Next.js 14 and Redux Toolkit. It provides users with an intuitive interface to browse, search, and purchase a wide range of shoes. Leveraging the power of Next.js for server-side rendering and Redux Toolkit for state management, ShoeShack ensures a seamless and efficient shopping experience.

## Features

- **Product Catalog**: Browse a wide selection of shoes with detailed product descriptions, prices, and images.
- **Search and Filter**: Easily find shoes using search functionality and various filters (brand, size, color, etc.).
- **Shopping Cart**: Add, update, and remove items from the cart with real-time updates.
- **User Authentication**: Secure user registration and login.
- **Order Management**: Track and manage orders with order history and status updates.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

## Technologies Used

- **Next.js 14**: Framework for server-side rendering and static site generation.
- **Redux Toolkit**: State management solution for efficient and scalable application state.
- **React**: UI library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and product data.

## Installation (for local environments)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ShoeShack.git
   cd ShoeShack/frontend
2. Install dependencies:
   ```bash
   npm install  
3. Set up environment variables by creating a '.env' file in the frontend directory and adding the necessary configurations.
   ```plaintext
    MONGO_URI=
    ACCESS_TOKEN_SECRET=
    CLOUDINARY_CLOUD_NAME=
    API_KEY=
    API_SECRET=
    STRIPE_KEY=
    GOOGLE_SECRET=
    GOOGLE_ID=  
4. Run the development server:
   ```bash
   npm run dev
5. Open your browser and navigate to http://localhost:3000.  

## Deployment
The ShoeShack web application is also hosted online. You can access the live version at:
```arduino
https://shoeshack.vercel.app