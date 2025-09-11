import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login-Style.css';
import linkIcon from '../../assets/PICT.png';
import { verifyCredentials } from '../../utils/auth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (verifyCredentials(email, password)) {
      // Login successful
      navigate('/linkpage');
    } else {
      // Login failed
      setError('Invalid email or password');
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
          <p className="login-forgot-password" onClick={() => console.log('Forgot Password clicked')}>
            Forgot Password?
          </p>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="login-footer">
          Don't have an account?{" "}
          <span className="login-link-text" onClick={() => navigate('/signup')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
