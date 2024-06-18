import React from 'react';
import { useParams } from 'react-router-dom';
import './css/ProductDetail.css'; // Create this CSS file next

const products = [
  // Your product data
];

const ProductDetail = () => {
  const { productId } = useParams(); // Extracting productId from URL params
  const product = products.find((p) => p.id === parseInt(productId)); // Finding product by id

  if (!product) {
    return <div>Loading...</div>; // Render loading state if product not found (can be changed)
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <h2>{product.name}</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Record Count:</strong> {product.recordCount}</p>
        <div className="fields-list">
          <strong>Fields:</strong>
          <ul>
            {product.fields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; // Exporting ProductDetail component
