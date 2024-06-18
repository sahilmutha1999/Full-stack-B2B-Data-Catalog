import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage'; // Import Login component for login page
import ProductList from './components/ProductList'; // Import ProductList component for product list page
import ProductDetail from './components/ProductDetail'; // Import ProductDetail component for product detail page
import './App.css'; // Import App.css for global styles

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for ProductList page */}
        <Route path="/products" element={<ProductList />} />
        
        {/* Dynamic route for ProductDetail page */}
        <Route path="/products/:productId" element={<ProductDetail />} />
        
        {/* Default route redirects to Login page */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
