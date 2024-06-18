import React, { useState, useEffect } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import "./css/ProductList.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term input
  const [products, setProducts] = useState([]); // State for products fetched from API
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State to control visibility of product details modal
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control visibility of logout confirmation modal
  const [currentProduct, setCurrentProduct] = useState(null); // State to hold current product for details modal
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  // Check for token and redirect to login if missing
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const normalizedData = data.map((product) => ({
          ...product,
          fields: product.fields ? JSON.parse(product.fields) : [],
        }));

        setProducts(normalizedData);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError("Failed to fetch products. Please try again."); // Set error message
      }
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Open modal with details of selected product
  const openDetailsModal = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}?_=${new Date().getTime()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const product = await response.json();
      product.fields = JSON.parse(product.fields);

      setCurrentProduct(product);
      setShowDetailsModal(true); // Show details modal
    } catch (error) {
      console.error("Error fetching product details:", error.message);
      setError("Failed to fetch product details. Please try again."); // Set error message
    }
  };

  // Close product details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setCurrentProduct(null);
  };

  // Open logout confirmation modal
  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  // Close logout confirmation modal
  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.replace("/login"); // Use replace to prevent back navigation
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list-page">
      {/* Top bar with logo and logout button */}
      <div className="top-bar">
        <img src="logo.png" alt="Logo" className="logo" />
        <button className="logout-button" onClick={openLogoutModal}>
          Logout
        </button>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display error message if there's an error */}
      {error && <div className="error-message">{error}</div>}

      {/* Product table container */}
      <div className="product-table-container">
        <div className="product-table">
          {/* Table to display products */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Record Count</th>
                <th>Fields</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through filtered products and display each row */}
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.recordCount}</td>
                  <td>
                    {/* Button to view more fields of the product */}
                    <button
                      className="fields-button"
                      onClick={() => openDetailsModal(product.id)}
                    >
                      More Fields
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render product details modal if showDetailsModal is true */}
      {showDetailsModal && currentProduct && (
        <ProductDetailsModal
          product={currentProduct}
          onClose={closeDetailsModal}
        />
      )}

      {/* Render logout confirmation modal if showLogoutModal is true */}
      {showLogoutModal && (
        <LogoutConfirmationModal
          onConfirm={handleLogout}
          onCancel={closeLogoutModal}
        />
      )}
    </div>
  );
};

export default ProductList; // Export ProductList component
