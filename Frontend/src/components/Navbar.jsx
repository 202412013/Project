import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faHeart, faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import { useUser } from "../context/Usercontext";
import axios from 'axios';

const Navbar = () => {

  const context = useUser();
  if (!context) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = context;
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = async () => {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
  };

  return (
    <nav className="Navbar">
      {/* Logo */}
      <div className="nav-logo">
        <p>Unwritten Cove</p>
      </div>

      {/* Search Bar (Always Visible) */}
      <div className="search">
        <input type="text" className="search-bar" placeholder="Search..." />
        <button className="Search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* Desktop Navbar Links & Icons */}
      <ul className="nav-menu">
        {user?.userRole === "Admin" ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admin/manage-users">Manage Users</Link></li>
            <li><Link to="/admin/manage-books">Manage Books</Link></li>
            {/* <li><Link to="/admin/manage-reviews">Manage Reviews</Link></li> */}
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/subscription">Subscription Plan</Link></li>
            <li><Link to="/about">About</Link></li>
            {user?.userRole === "Author" && (
              <li><Link to="/upload-book">Upload Book</Link></li>
            )}
          </>
        )}
      </ul>


      <div className="allicon">
        {/* <button className="Bell-icon">
          <FontAwesomeIcon icon={faBell} />
        </button> */}

        <Link to="/Wishlist">
          <button className="fav-icon">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </Link>

        {user ? (
          <>
            {/* ✅ Profile Button */}
            <Link to="/Profile">
              <button className="auth-button">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
            {/* ✅ Logout Button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* ✅ Signup Button */}
            <Link to="/registration">
              <button className="signup-button">Signup</button>
            </Link>
            {/* ✅ Login Button */}
            <Link to="/login">
                <button className="signup-button">Login</button>
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Menu (Appears in Mobile/Tablet View) */}
      <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Mobile Menu */}
      <ul className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        {user?.userRole === "Admin" ? (
          <>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/admin/manage-users" onClick={() => setIsMenuOpen(false)}>Manage Users</Link></li>
            <li><Link to="/admin/manage-books" onClick={() => setIsMenuOpen(false)}>Manage Books</Link></li>
            {/* <li><Link to="/admin/manage-reviews" onClick={() => setIsMenuOpen(false)}>Manage Reviews</Link></li> */}
          </>
        ) : (
          <>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/books" onClick={() => setIsMenuOpen(false)}>Books</Link></li>
            <li><Link to="/subscription" onClick={() => setIsMenuOpen(false)}>Subscription Plan</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/Wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link></li>
            <li><Link to="/notification" onClick={() => setIsMenuOpen(false)}>Notifications</Link></li>
            {user?.userRole === "Author" && (
              <li><Link to="/upload-book" onClick={() => setIsMenuOpen(false)}>Upload Book</Link></li>
            )}
          </>
        )}
        
        {user ? (
          <>
            <li><Link to="/Profile" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
            <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/registration" onClick={() => setIsMenuOpen(false)}>Signup</Link></li>
            <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
