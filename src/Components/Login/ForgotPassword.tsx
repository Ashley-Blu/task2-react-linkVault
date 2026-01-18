import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login-Style.css';
import linkIcon from '../../assets/PICT.png';
import { requestPasswordReset, resetPassword } from '../../utils/auth';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetRequested, setResetRequested] = useState(false);

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    const result = requestPasswordReset(email);
    
    if (result.success && result.token) {
      setIsSuccess(true);
      setToken(result.token);
      setResetRequested(true);
      setMessage('Please check your email for the reset link. For demo purposes, you can enter the new password below.');
    } else {
      setIsSuccess(false);
      setMessage(result.message);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsSuccess(false);
      return;
    }
    
    // Call the resetPassword function with email, token, and new password
    const result = resetPassword(email, token, newPassword);
    
    if (result.success) {
      navigate('/login', { state: { message: 'Password reset successful. Please login with your new password.' } });
    } else {
      setMessage(result.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={linkIcon} alt="Link Icon" className="login-icon" />
        <h2 className="login-title">Reset Password</h2>
        
        {!resetRequested ? (
          <form onSubmit={handleRequestReset} className="login-form">
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
            
            {message && (
              <p className={isSuccess ? "login-success" : "login-error"}>
                {message}
              </p>
            )}
            
            <button type="submit" className="login-button">Request Reset</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="login-form">
            <div className="login-input-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="login-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            {message && (
              <p className={isSuccess ? "login-success" : "login-error"}>
                {message}
              </p>
            )}
            
            <button type="submit" className="login-button">Reset Password</button>
          </form>
        )}
        
        <p className="login-footer">
          Remember your password?{" "}
          <span className="login-link-text" onClick={() => navigate('/login')}>
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;