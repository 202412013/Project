
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./styles/wishlist.css"
const Wishlist = () => {
  // Load wishlist from localStorage
  const navigate = useNavigate();
  const likedBooks = JSON.parse(localStorage.getItem("wishlist")) || [];
    const [wishlist, setWishlist] = useState(likedBooks);
  
    // ✅ Toggle Wishlist and Save to LocalStorage
    const toggleWishlist = (book) => {
      let updatedWishlist;
      if (wishlist.some((b) => b.id === book.id)) {
        updatedWishlist = wishlist.filter((b) => b.id !== book.id);
      } else {
        updatedWishlist = [...wishlist, book];
      }
  
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // 🔹 Save to localStorage
    };

    const handleBookClick = (book) => {
        navigate(`/BookDetails/${book.id}`, { state: { book } });
      };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      {likedBooks.length > 0 ? (
        <div className="wishlist-container">
          {likedBooks.map((book) => (
            <div className="card" key={book.id}>
              <img src={book.imageUrl} alt={book.title} onClick={() => handleBookClick(book)} />
                      <h3 onClick={() => handleBookClick(book)}>{book.title}</h3>
                      <p onClick={() => handleBookClick(book)}>{book.author}</p>
                      
<div className="wishlist">
               <button
                  className={`wishlist-icon ${wishlist.some((b) => b.id === book.id) ? "active" : ""}`}
                      onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(book);
                      }}
                >
                <FontAwesomeIcon icon={faHeart} />
                </button></div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books in your wishlist yet.</p>
      )}
    </div>
  );
};

export default Wishlist;
