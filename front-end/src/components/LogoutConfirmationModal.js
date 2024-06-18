// Import React library and necessary CSS for styling
import React from "react";
import "./css/LogoutConfirmationModal.css"; // Import CSS file for modal styling

// Functional component for Logout Confirmation Modal
const LogoutConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay"> {/* Container for modal overlay */}
      <div className="modal"> {/* Main modal content */}
        <h2>Are you sure you want to Logout?</h2> {/* Modal title */}
        <div className="modal-buttons"> {/* Modal buttons container */}
          <button className="confirm-button" onClick={onConfirm}>
            Yes {/* Button to confirm logout */}
          </button>
          <button className="cancel-button" onClick={onCancel}>
            No {/* Button to cancel logout */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal; // Export LogoutConfirmationModal component
