import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing-Style.css";
import linkIcon from "../../assets/PICT.png";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

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

          <div className="name-input">
            <label htmlFor="name">Name:</label>
            <br />
            <input type="text" id="name" placeholder="Please enter your name..." />
          </div>

          <div className="email-input">
            <label htmlFor="email">Email:</label>
            <br />
            <input type="email" id="email" placeholder="Please enter your email..." />
          </div>

          <div className="password-input">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Please create your password..."
            />
          </div>

          <div className="button">
            <button onClick={() => navigate("/LinkPage")}>Get started</button>
          </div>
        </div>
      </div>
  );
};

export default LandingPage;
