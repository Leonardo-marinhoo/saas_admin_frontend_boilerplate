# E-Food Admin Interface

A React-based admin interface for managing an online menu system.

## Features

- Category management (CRUD operations)
- Product management (CRUD operations)
- Image upload support
- Form validation
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Laravel backend API running on http://localhost:8000

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  ├── components/
  │   ├── Categories/
  │   │   ├── index.tsx
  │   │   └── styles.ts
  │   └── Products/
  │       ├── index.tsx
  │       └── styles.ts
  ├── services/
  │   └── api/
  │       ├── productCategoriesApi.ts
  │       └── productsApi.ts
  ├── store.ts
  ├── App.tsx
  └── main.tsx
```

## API Endpoints

### Categories
- GET /api/product-categories - List all categories
- POST /api/product-categories - Create a category
- PUT /api/product-categories/{id} - Update a category
- DELETE /api/product-categories/{id} - Delete a category

### Products
- GET /api/products - List all products
- POST /api/products - Create a product
- GET /api/products/{id} - Get a single product
- PUT /api/products/{id} - Update a product
- DELETE /api/products/{id} - Delete a product

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
- Styled Components
- Vite
