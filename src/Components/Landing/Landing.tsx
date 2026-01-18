/**
 * Landing Page Component
 *
 * The main landing page that welcomes users and offers options to sign up or log in.
 * Features a split layout with brand information and call-to-action button.
 *
 * @component
 * @returns {JSX.Element} The rendered landing page
 *
 * @example
 * return (
 *   <LandingPage />
 * );
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing-Style.css";
import linkIcon from "../../assets/PICT.png";

/**
 * Displays the landing/home page with welcome message and navigation
 *
 * @function
 * @name LandingPage
 * @returns {JSX.Element} Landing page UI with brand info and get started button
 */
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Handles the "Get Started" button click
   * Navigates user to the sign up page
   *
   * @function handleGetStarted
   * @returns {void}
   */
  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="landing-card">
      {/* Right Section */}
      <div className="split left">
        <p className="brand">
          <span>L</span>inks-in
        </p>
        <img src={linkIcon} alt="The link icon" className="landing-picture" />
        <h4>Welcome to Links-in</h4>
        <p>Your favourite link manager</p>
      </div>

      {/* Left Section */}
      <div className="split right">
        <h1>Links In</h1>

        <div className="landing-content">
          <p className="landing-description">
            Links-in is your personal link manager that helps you organize and
            access your favorite websites in one place.
          </p>
          <button onClick={handleGetStarted} className="get-started-button">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
