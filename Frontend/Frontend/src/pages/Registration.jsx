import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import "./styles/Registration.css";

const Registration = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    category: "student",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setSuccess("");
    setFormData({ username: "", age: "", category: "student", email: "", password: "" });
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    if (isSignUp && !formData.age) {
      setError("Please enter your age!");
      return;
    }

    setSuccess(isSignUp ? "Registration Successful!" : "Login Successful!");
    setFormData({ username: "", age: "", category: "student", email: "", password: "" });
  };

 
  const handleGoogleSignIn = () => {
    alert("Google Sign-In feature coming soon!");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>{isSignUp ? "Welcome Back!" : "New Here?"}</h2>
        <p>{isSignUp ? "Login to continue" : "Sign up and start your journey with us"}</p>
        <button onClick={toggleMode} className="switch-btn">
          {isSignUp ? "SIGN IN" : "SIGN UP"}
        </button>
      </div>

      <div className="auth-right">
        <h2>{isSignUp ? "Create Account" : "Sign In"}</h2>

        <div className="social-icons">
          <FaFacebookF className="icon" />
          <FaGoogle className="icon" onClick={handleGoogleSignIn} />
          <FaLinkedinIn className="icon" />
        </div>

        <p className="email-text">or use your email for {isSignUp ? "registration" : "login"}</p>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              required
            />
          )}

          {isSignUp && (
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="input-field"
            />
          )}

          {isSignUp && (
            <select name="category" value={formData.category} onChange={handleChange} className="input-field">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="author">Author</option>
            </select>
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />

          <button type="submit" className="submit-btn">{isSignUp ? "SIGN UP" : "SIGN IN"}</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
