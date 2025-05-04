import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Registration.css";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    userRole: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("userRole", formData.userRole);
    if (profilePic) {
      formDataToSend.append("profilePic", profilePic);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup",  formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        });
      setLoading(false);

      if (response.status === 201) {
        alert("Registration Successful! Click OK to proceed to Login.");
        navigate("/login"); 
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In feature coming soon!");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>New Here?</h2>
        <p className="textdemo">Sign up and start your journey with us</p>
        <button className="switch-btn">
          SIGN IN
        </button>
      </div>

      <div className="auth-right">
        <h2>Create Account</h2>

        <div className="social-icons">
          <FaGoogle className="icon" onClick={handleGoogleSignIn} />
        </div>

        <p className="email-text">or use your email for registration</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="input-fie"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="input-fie"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="input-fie"
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input-fie"
            required
          />

{/*   <div className="profile-upload-container">
          <label htmlFor="profilePic" className="file-label">
            Upload Profile Picture
          </label>
            <input
              id="profilePic"
              name="profilePic"  
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="file-input"
            />
        </div> */}

  
          <div className="role-selection">
            <p>Select User Role:</p>
            <label>
              <input
                type="radio"
                name="userRole"
                value="Student"
                checked={formData.userRole === "Student"}
                onChange={handleChange}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="userRole"
                value="Professor"
                checked={formData.userRole === "Professor"}
                onChange={handleChange}
              />
              Professor
            </label>
            <label>
              <input
                type="radio"
                name="userRole"
                value="Author"
                checked={formData.userRole === "Author"}
                onChange={handleChange}
              />
              Author
            </label>
          </div>


          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
