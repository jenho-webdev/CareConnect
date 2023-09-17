import React, { useState, useEffect } from 'react';

const ForgotPassword = () => {
  useEffect(() => {
    document.title = 'CareConnect | Forgot Password';
  }, []);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement the logic to send a password reset link to the user's email
    // You can use an API call here to handle this functionality

    // For demonstration purposes, we'll simulate success after a brief delay
    setTimeout(() => {
      setSuccess(true);
      setMessage('Password reset link sent successfully. Please check your email.');
    }, 2000);
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <p>Enter your email address below to reset your password.</p>

      {success ? (
        <div className="success-message">{message}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
