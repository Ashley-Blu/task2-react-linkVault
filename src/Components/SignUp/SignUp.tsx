/**
 * Sign Up Page Component
 *
 * User registration page with email and password validation.
 * Features real-time password confirmation validation and error handling.
 *
 * @component
 * @returns {JSX.Element} The rendered sign up form
 *
 * @example
 * return (
 *   <SignUpPage />
 * );
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp-Style.css";
import linkIcon from "../../assets/PICT.png";
import { registerUser, validateSignup } from "../../utils/auth";

/**
 * Displays the sign up form with email, password, and password confirmation fields
 *
 * @function
 * @name SignUpPage
 * @returns {JSX.Element} Sign up form UI with input validation feedback
 */
const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");

  /**
   * Effect hook to validate password confirmation in real-time
   * Updates passwordMatch state whenever either password field changes
   */
  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true); // Reset when confirm password is empty
    }
  }, [password, confirmPassword]);

  /**
   * Handles sign up form submission
   * Validates all inputs and registers user with error handling
   *
   * @function handleSubmit
   * @param {React.FormEvent} e - Form submission event
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all inputs
    const validationResult = validateSignup(email, password, confirmPassword);
    if (!validationResult.valid) {
      setError(validationResult.error);
      return;
    }

    const result = registerUser(email, password);
    if (result.success) {
      // Registration successful
      navigate("/linkpage");
    } else {
      // Show specific error message
      setError(result.error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={linkIcon} alt="Link Icon" className="signup-icon" />
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                !passwordMatch && confirmPassword ? "password-mismatch" : ""
              }
              required
            />
            {!passwordMatch && confirmPassword && (
              <p className="password-feedback">Passwords do not match</p>
            )}
          </div>
          {error && <p className="signup-error">{error}</p>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-footer">
          Already have an account?{" "}
          <span className="signup-link-text" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
