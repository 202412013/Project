import React, { useState } from "react";
import './styles/Contect.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields!");
      return;
    }

    setStatus("Your message has been sent successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="title">📞 Contact Us</h1>

        {status && (
          <p className={'message ${status.includes("success") ? "success" : "error"}'}>
            {status}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <div>
            <i className="fas fa-envelope"></i>
            <p>Email: unwrittencove@gmail.com</p>
          </div>
          <div>
            <i className="fas fa-phone-alt"></i>
            <p>Phone: +91 XXXXX XXXXX</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Contact;