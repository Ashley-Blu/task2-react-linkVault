import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp-Style.css';
import linkIcon from '../../assets/PICT.png';
import { registerUser } from '../../utils/auth';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState('');
  
  // Check password match in real-time
  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true); // Reset when confirm password is empty
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      registerUser(email, password);
      // Registration successful
      navigate('/linkpage');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during registration');
      }
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
              className={!passwordMatch && confirmPassword ? 'password-mismatch' : ''}
              required
            />
            {!passwordMatch && confirmPassword && (
              <p className="password-feedback">Passwords do not match</p>
            )}
          </div>
          {error && <p className="signup-error">{error}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signup-footer">
          Already have an account?{" "}
          <span className="signup-link-text" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
