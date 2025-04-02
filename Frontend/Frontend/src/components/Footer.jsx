import React from "react";
import "./styles/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Logo */}
        <div className="footer-section brand">
          <h2>📚 Unwritten Cove</h2>
          <p>Escape into a world of books!</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="Home">Home</a></li>
            <li><a href="Books">Books</a></li>
            <li><a href="Trending">Trending</a></li>
            <li><a href="Subscription">Subscription</a></li>
            <li><a href="About">About Us</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="About">Privacy Policy</a></li>
            <li><a href="About">Terms & Conditions</a></li>
            <li><a href="About">FAQ</a></li>
            <li><a href="About">Support</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-section newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with the latest books & offers!</p>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>

        {/* Contact & Social Media */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>📧 unwrittencove@gmail.com</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>📍 Ahmedabad, India</p>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Unwritten Cove | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
