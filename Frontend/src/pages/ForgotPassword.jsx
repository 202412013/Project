import React, { useState } from 'react';
import axios from 'axios';
import './styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('Student');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email,
        userType,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="role-selection">
          <p>Select User Role:</p>
          <label>
            <input
              type="radio"
              name="userRole"
              value="Student"
              checked={userType === "Student"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="userRole"
              value="Professor"
              checked={userType === "Professor"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Professor
          </label>
          <label>
            <input
              type="radio"
              name="userRole"
              value="Author"
              checked={userType === "Author"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Author
          </label>
          <label>
            <input
              type="radio"
              name="userRole"
              value="Admin"
              checked={userType === "Admin"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </label>
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
