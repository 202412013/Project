import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faHeart, faBell } from "@fortawesome/free-solid-svg-icons";
import "./styles/Navbar.css";
import { Link } from "react-router-dom"; 
import "./styles/Navbar.css"

const Navbar = () => {
  const [isFavActive, setIsFavActive] = useState(false);
  const [isBellActive, setIsBellActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="Navbar">
      <div className="nav-logo">
        <p>Unwritten Cove</p>
      </div>

      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/subscription">Subscription Plan</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="search">
        <input type="text" className="search-bar" placeholder="Search..." />
        <button
          className={`Search-icon ${isSearchActive ? "search-active" : "search-false"}`}
          onClick={() => setIsSearchActive(!isSearchActive)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="icon">
        <button
          className={`Bell-icon ${isBellActive ? "Bell-active" : "Bell-false"}`}
          onClick={() => setIsBellActive(!isBellActive)}
        >
          <FontAwesomeIcon icon={faBell} />
        </button>

        <Link to="/Wishlist">
          <button
            className={`fav-icon ${isFavActive ? "fav-active" : "fav-false"}`}
            onClick={() => setIsFavActive(!isFavActive)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </Link>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <Link to="/Profile">
              <button className="auth-button">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
          ) : (
            <Link to="/Registration">
              <button className="auth-button">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
