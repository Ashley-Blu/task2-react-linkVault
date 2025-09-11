import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing-Style.css";
import linkIcon from "../../assets/PICT.png";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
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
          <h1>Create an account</h1>
          <p>
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

          <div className="landing-content">
            <p className="landing-description">
              Links-in is your personal link manager that helps you organize and access your favorite websites in one place.
            </p>
            <button onClick={handleGetStarted} className="get-started-button">Get Started</button>
          </div>
        </div>
      </div>
  );
};

export default LandingPage;
