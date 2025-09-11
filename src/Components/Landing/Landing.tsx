import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing-Style.css';
import linkIcon from '../../assets/PICT.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <img src={linkIcon} alt="Link Icon" className="landing-icon" />
        <h2 className="landing-title">Welcome to the Link App</h2>
        <p className="landing-subtitle">Your personal link manager.</p>
        <button className="landing-button" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
        <button className="landing-button landing-button-secondary" onClick={() => navigate('/login')}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
