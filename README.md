# Full-stack-B2B-Data-Catalog
A React and Node based web application that allows user to signup, login and view the B2B Data Catalog. Built on SQLite or database and Express.js.

## Overview

This project is a Data Catalog web application developed using Node.js, Express.js for the backend, SQLite for storage, and React.js for the frontend. The system allows users to viewing product details and search for products by name or category.

### Scope of Work

The scope of this project includes:
- Implementing CRUD (Create, Read, Update, Delete) operations for products.
- Integrating a search functionality to filter products based on name or category.
- Using SQLite for data storage to maintain product records.
- Building a responsive frontend interface using React.js to interact with the backend API.

### Implemented Features

- **Backend (Node.js and Express.js):**
  - RESTful API endpoints for CRUD operations on products.
  - Integration with SQLite database for persistent storage.
  - Authentication using JWT (JSON Web Token).

- **Frontend (React.js):**
  - Product list page displaying products in a table format.
  - Modal components for creating new products and viewing product details.
  - Search functionality to filter products by name or category.

### Steps to Run the Code

1. **Backend Setup:**
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```
   - The backend server will run on `http://localhost:5000`.

2. **Frontend Setup:**
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```
   - The frontend development server will run on `http://localhost:3000`.

### Sample Dataset JSON

Here is an example of a sample dataset in JSON format:

```json
[
  {
    "id": 1,
    "name": "Product 1",
    "category": "Firmographic",
    "recordCount": 100,
    "fields": ["Company Name", "Company Address", "Revenue"]
  },
  {
    "id": 2,
    "name": "Product 2",
    "category": "Psychographic",
    "recordCount": 200,
    "fields": ["Personality Traits", "Values"]
  }
]
```
### Routing Endpoints

| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/api/products`               | Get all products                |
| GET    | `/api/products/:id`           | Get a product by ID             |
| GET    | `/api/products/search/:query` | Search products by name or category |
