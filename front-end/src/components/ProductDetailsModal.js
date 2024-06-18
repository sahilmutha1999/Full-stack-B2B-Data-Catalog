import React from "react";
import "./css/ProductDetailsModal.css"; // Import CSS file for styling

/**
 * ProductDetailsModal Component
 * @param {Object} product - The product object containing details to display
 * @param {Function} onClose - Callback function to close the modal
 */
const ProductDetailsModal = ({ product, onClose }) => {
  // If product or product fields are not valid, return null (don't render the modal)
  if (!product || !Array.isArray(product.fields)) return null;

  return (
    <div className="details-modal-overlay"> {/* Overlay container for modal */}
      <div className="details-modal-content"> {/* Modal content container */}
        <span className="close" onClick={onClose}>
          &times;
        </span> {/* Close button with 'X' icon */}
        <h2>{product.name} Details</h2> {/* Product name as modal title */}
        <hr /> {/* Horizontal line for separation */}
        <div className="product-details"> {/* Container for product details */}
          {/* Detail rows displaying various product information */}
          <div className="detail-row">
            <label>ID:</label>
            <span>{product.id}</span>
          </div>
          <div className="detail-row">
            <label>Name:</label>
            <span>{product.name}</span>
          </div>
          <div className="detail-row">
            <label>Category:</label>
            <span>{product.category}</span>
          </div>
          <div className="detail-row">
            <label>Record Count:</label>
            <span>{product.recordCount}</span>
          </div>
          <div className="detail-row">
            <label>Fields:</label>
            <ul>
              {/* List each field in the product's fields array */}
              {product.fields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal; // Exporting ProductDetailsModal component
