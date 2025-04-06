import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate email format before sending request
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
       e.preventDefault();
       setError("");
       setLoading(true);
    
       if (!formData.email || !formData.password) {
          setError("Please fill in all fields.");
           return;
       } 
    
       if (!isValidEmail(formData.email)) {
           setError("Invalid email format!");
           return;
       }
    
    try {
        console.log(formData.email, formData.password); // Correct way to access the values
        const response = await axios.post('http://localhost:5000/api/auth/login',
        { email: formData.email, password: formData.password }, // Use formData here
        { withCredentials: true } // Yeh zaroori hai cookie bhejne ke liye
        );
        
      if (response.status === 200) {
          alert("Login successful");
      // Set context ya redirect
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.error || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="login-container">
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
              className="input-email"
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

    
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/forgot-password" className="forgot-link">Forgot Password</Link>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
