# Full-stack-B2B-Data-Catalog
A React and Node based web application that allows user to signup, login and view the B2B Data Catalog.

## Overview

This project is a Data Catalog web application developed using Node.js, Express.js for the backend, SQLite for storage, and React.js for the frontend. The system allows users to viewing product details and search for products by name or category.

### Sample Work
![Sign Up Page](https://github.com/sahilmutha1999/Full-stack-B2B-Data-Catalog/blob/main/images/1.png)

![Data Catalog Page](https://github.com/sahilmutha1999/Full-stack-B2B-Data-Catalog/blob/main/images/2.png)

![More Details Pop-up](https://github.com/sahilmutha1999/Full-stack-B2B-Data-Catalog/blob/main/images/3.png)

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

## Steps to Run the Code

### Default User Credentials
- **You can use the following default credentials to log in:**
  ```
  Username: xxxxx
  Password: xxxx
  ```

1. **Backend Setup:**
   - Navigate to the `backend` directory.
     ```bash
     cd Backend
     ```
   - Install dependencies:
     ```bash
     npm i
     ```
   - Start the server:
     ```bash
     npm run start
     ```
   - The backend server will run on `http://localhost:3000`.

2. **Frontend Setup:**
   - Navigate to the `frontend` directory.
     ```bash
     cd font-end
     ```
   - Install dependencies:
     ```bash
     npm i
     ```
   - Start the React development server:
     ```bash
     npm run start
     ```
   - The frontend development server will run on `http://localhost:3001`.

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
| POST   | `/api/register`               | Registers a new user             |
| POST   | `/api/login`                  | Authenticates user and returns a JWT|
| GET    | `/api/products`               | Get all products                |
| GET    | `/api/products/:id`           | Get a product by ID             |




