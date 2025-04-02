import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // Simulated user data (replace with API call in a real app)
  const users = [{ email: "test@example.com", password: "password123" }];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password. Please sign up first.");
    } else {
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/Home.jsx"); // Redirect to home page
      }, 15);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h2>Welcome Back!</h2>
        <p>To keep connected with us, please log in with your personal info.</p>
        <button
          className="signin-btn"
          onClick={() => document.getElementById("login-form").scrollIntoView()}
        >
          Sign In
        </button>
      </div>

      <div className="right-section">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
