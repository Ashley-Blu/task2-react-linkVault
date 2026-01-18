/**
 * Login Page Component
 *
 * User authentication page with email and password input.
 * Supports login verification and displays password reset option.
 * Shows success messages from password reset flow.
 *
 * @component
 * @returns {JSX.Element} The rendered login form
 *
 * @example
 * return (
 *   <LoginPage />
 * );
 */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login-Style.css";
import linkIcon from "../../assets/PICT.png";
import { verifyCredentials } from "../../utils/auth";

/**
 * Displays the login form with email and password fields
 *
 * @function
 * @name LoginPage
 * @returns {JSX.Element} Login form UI with error/success messaging
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Effect hook to display password reset success message
   * Checks for message passed through navigation state
   */
  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  /**
   * Handles login form submission
   * Verifies credentials and navigates to link page on success
   *
   * @function handleSubmit
   * @param {React.FormEvent} e - Form submission event
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    const result = verifyCredentials(email, password);

    if (result.success) {
      // Login successful
      navigate("/linkpage");
    } else {
      // Provide specific error messages
      if (result.error === "email") {
        setError("Email not found. Please check and try again");
      } else if (result.error === "password") {
        setError("Password is incorrect. Please try again");
      } else {
        setError("An error occurred. Please try again");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={linkIcon} alt="Link Icon" className="login-icon" />
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p
            className="login-forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
          {error && <p className="login-error">{error}</p>}
          {successMessage && <p className="login-success">{successMessage}</p>}
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-footer">
          Don't have an account?{" "}
          <span className="login-link-text" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
