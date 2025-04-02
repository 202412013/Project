import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./styles/Home.css";


const Home = () => {
  const scrollRefs = useRef({});
  const navigate = useNavigate();
  const initialWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const [wishlist, setWishlist] = useState(initialWishlist);

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
  const books = [
    { id: 1, title: "Book 1", author: "Author 1", category: "Trending", imageUrl: "/image/1.jpg", coverImage: "/image/1.jpg", description: "Description of Book 1", inSubscription: true },
    { id: 2, title: "Book 2", author: "Author 2", category: "Trending", imageUrl: "/image/2.jpg", coverImage: "/image/2.jpg", description: "Description of Book 2", inSubscription: false },
    { id: 3, title: "Book 3", author: "Author 3", category: "Novel", imageUrl: "/image/3.jpeg", coverImage: "/image/3.jpeg", description: "Description of Book 3", inSubscription: true }, 
    { id: 4,title: "Book 4", author: "Author 4", category: "Trending", imageUrl: "/image/1.jpg" ,coverImage: "/image/1.jpg", description: "Description of Book 4", inSubscription: true},
    { id: 5,title: "Book 5", author: "Author 5", category: "Subject", imageUrl: "/image/2.jpg" ,coverImage: "/image/1.jpg", description: "Description of Book 5", inSubscription: false},
    { id: 6,title: "Book 6", author: "Author 6", category: "Poems", imageUrl: "/image/3.jpeg" ,coverImage: "/image/3.jpeg", description: "Description of Book 6", inSubscription: true},
    { id: 7,title: "Book 7", author: "Author 7", category: "Trending", imageUrl: "/image/4.jpg", coverImage: "/image/4.jpg", description: "Description of Book 7", inSubscription: false},
    { id: 8,title: "Book 8", author: "Author 8", category: "Novel", imageUrl: "/image/5.jpeg" ,coverImage: "/image/5.jpeg", description: "Description of Book 8", inSubscription: true},
    {id: 9, title: "Book 9", author: "Author 9", category: "Trending", imageUrl: "/image/6.JPEG" ,coverImage: "/image/6.JPEG", description: "Description of Book 9", inSubscription: true},
    { id: 10,title: "Book 10", author: "Author 10", category: "Trending", imageUrl: "/image/7.jpg" ,coverImage: "/image/7.jpg", description: "Description of Book 10", inSubscription: false},
    { id: 11,title: "Book 11", author: "Author 11", category: "Subject", imageUrl: "/image/1.jpg", coverImage: "/image/2.jpg", description: "Description of Book 11", inSubscription: true},
    { id: 12,title: "Book 12", author: "Author 12", category: "Subject", imageUrl: "/image/3.jpeg", coverImage: "/image/3.jpeg", description: "Description of Book 12", inSubscription: false},
    { id: 13,title: "Book 13", author: "Author 13", category: "Subject", imageUrl: "/image/7.jpg" ,coverImage: "/image/7.jpg", description: "Description of Book 13", inSubscription: true},
    { id: 14,title: "Book 14", author: "Author 14", category: "Novel", imageUrl: "/image/6.JPEG" ,coverImage: "/image/1.jpg", description: "Description of Book 14", inSubscription: true},
    { id: 15,title: "Book 15", author: "Author 15", category: "Literature", imageUrl: "/image/5.jpeg", coverImage: "/image/5.jpeg", description: "Description of Book 15", inSubscription: true},
    { id: 16,title: "Book 16", author: "Author 16", category: "Poems", imageUrl: "/image/2.jpg" ,coverImage: "/image/1.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 17,title: "Book 17", author: "Author 17", category: "Novel", imageUrl: "/image/2.jpg" ,coverImage: "/image/7.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 18,title: "Book 18", author: "Author 18", category: "Subject", imageUrl: "/image/3.jpeg" ,coverImage: "/image/7.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 19,title: "Book 19", author: "Author 19", category: "Novel", imageUrl: "/image/1.jpg" ,coverImage: "/image/7.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 20,title: "Book 20", author: "Author 20", category: "Poems", imageUrl: "/image/7.jpg" ,coverImage: "/image/7.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 21,title: "Book 21", author: "Author 21", category: "Poems", imageUrl: "/image/6.JPEG" ,coverImage: "/image/7.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 22,title: "Book 22", author: "Author 22", category: "Nowel", imageUrl: "/image/5.jpeg" ,coverImage: "/image/7.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 23,title: "Book 23", author: "Author 23", category: "Poems", imageUrl: "/image/2.jpg" ,coverImage: "/image/7.jpg", description: "Description of Book 16", inSubscription: false}, 
    { id: 24,title: "Book 24", author: "Author 24", category: "Literature", imageUrl: "/image/1.jpg", coverImage: "/image/5.jpeg", description: "Description of Book 15", inSubscription: true},
    { id: 25,title: "Book 25", author: "Author 25", category: "Literature", imageUrl: "/image/2.jpg", coverImage: "/image/5.jpeg", description: "Description of Book 15", inSubscription: true},
    { id: 26,title: "Book 26", author: "Author 26", category: "Literature", imageUrl: "/image/3.jpeg", coverImage: "/image/5.jpeg", description: "Description of Book 15", inSubscription: true},
    { id: 27,title: "Book 27", author: "Author 27", category: "Literature", imageUrl: "/image/6.JPEG", coverImage: "/image/5.jpeg", description: "Description of Book 15", inSubscription: true},
    { id: 28,title: "Book 28", author: "Author 28", category: "Literature", imageUrl: "/image/7.jpg", coverImage: "/image/5.jpeg", description: "Description of Book 15", inSubscription: true},

  ];

  const scroll = (direction, category) => {
    if (scrollRefs.current[category]) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRefs.current[category].scrollLeft -= scrollAmount;
      } else {
        scrollRefs.current[category].scrollLeft += scrollAmount;
      }
    }
  };

  const handleBookClick = (book) => {
    navigate(`/BookDetails/${book.id}`, { state: { book } });
  };

  const categories = ["Trending", "Novel", "Subject", "Literature", "Poems"];

  return (
    <div className="Home">
      {categories.map((category) => {
        const filteredBooks = books.filter((book) => book.category === category);

        return (
          <div key={category} className="category-section">
            <div className="title">
              <h1>{category}</h1>
              <div className="scr-btn">
                <button className="scroll-btn left" onClick={() => scroll("left", category)}>❮</button>
                <button className="scroll-btn right" onClick={() => scroll("right", category)}>❯</button>
              </div>
            </div>

            <div className="scroll-container">
              <div className="card-container" ref={(el) => (scrollRefs.current[category] = el)}>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
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
                        </button>
                       </div>
                    
                    </div>
                  ))
                ) : (
                  <p>No books found in this category.</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
