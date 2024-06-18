// Import necessary modules and hooks from React and React Router DOM
import React, { useState } from "react";
import "./css/LoginPage.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom"; // Hook for navigation

// Functional component for Login page
const Login = () => {
  // State variables using useState hook
  const [isLogin, setIsLogin] = useState(true); // State to track whether user is logging in or registering
  const [username, setUsername] = useState(""); // State to hold username input
  const [password, setPassword] = useState(""); // State to hold password input
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Determine API endpoint based on whether user is logging in or registering
    const url = isLogin
      ? "http://localhost:3000/api/login"
      : "http://localhost:3000/api/register";
    const method = "POST"; // HTTP method for API request

    try {
      // Send request to API endpoint with username and password in JSON format
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Handle error responses from API
      if (!response.ok) {
        const errorData = await response.json(); // Parse JSON error response
        throw new Error(errorData.error || "Authentication failed"); // Throw error with custom message
      }

      // Parse successful response from API
      const data = await response.json();

      // Handle login or registration success
      if (isLogin) {
        localStorage.setItem("token", data.token); // Store JWT token in localStorage
        navigate("/products"); // Redirect to products page after successful login
      } else {
        // Clear form fields on successful registration
        setUsername("");
        setPassword("");
        setIsLogin(true); // Switch back to login mode
        alert("Registration successful! Please login to continue."); // Show success message
      }
    } catch (error) {
      console.error("Authentication error:", error); // Log authentication error to console
      alert("Authentication failed. Please try again."); // Show alert to user on authentication failure
    }
  };

  // JSX for rendering login form and UI
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form">
          <div className="form-header">
            <h1>{isLogin ? "Login" : "Sign Up"}</h1> {/* Display header based on login mode */}
          </div>
          <form onSubmit={handleSubmit} className="loginform">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                required
              />
            </div>
            {!isLogin && ( // Render terms and conditions checkbox only in Sign Up mode
              <div className="form-group checkboxdiv">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  By clicking on this you agree to our{" "}
                  <span className="terms-link">terms and conditions</span>.
                </label>
              </div>
            )}
            <button type="submit" className="submit-btn">
              {isLogin ? "Login" : "Sign Up"} {/* Display button text based on login mode */}
            </button>
            {isLogin ? ( // Render toggle link to switch between Login and Sign Up modes
              <p>
                Don't have an account?{" "}
                <span
                  className="toggle-form"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Sign Up Here
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="toggle-form"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  Login Here
                </span>
              </p>
            )}
          </form>
        </div>
        <div className="login-image">
          <img src="signup.png" alt="Welcome" />{" "}
          {/* Placeholder image for visual appeal */}
        </div>
      </div>
    </div>
  );
};

export default Login; // Export Login component
