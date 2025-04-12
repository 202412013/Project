import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Trending from './Trending';

const Home = () => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const scrollRefs = useRef({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/getbooks');
        const booksByCategory = res.data;
        setBooksByCategory(booksByCategory);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch books:', err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const scroll = (direction, category) => {
    if (scrollRefs.current[category]) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollRefs.current[category].scrollLeft -= scrollAmount;
      } else {
        scrollRefs.current[category].scrollLeft += scrollAmount;
      }
    }
  };

  if (loading) return <p>Loading homepage...</p>;

  return (
    <div className="home-container">
      {/* 🔥 Trending Books Section */}
      <Trending />

      {/* 📚 Category-wise Books Section */}
      {Object.keys(booksByCategory).map((category) => (
        <section key={category} className="category-section">
          <div className="category-header">
            <h2>{category}</h2>
            <div className="carousel-navigation-header">
              <button
                onClick={() => scroll('left', category)}
                className="scroll-btn gradient-btn left-header-btn"
              >
                &lt;
              </button>
              <button
                onClick={() => scroll('right', category)}
                className="scroll-btn gradient-btn right-header-btn"
              >
                &gt;
              </button>
              {/* <button className="view-all-btn" onClick={() => navigate('/books')}>
                View All
              </button> */}
            </div>
          </div>

          <div className="book-carousel-grid" ref={(el) => (scrollRefs.current[category] = el)}>
            {booksByCategory[category]?.map((book) => (
              <div
                key={book._id}
                className="book-card"
                onClick={() => handleBookClick(book._id)}
              >
                <img src={book.coverImage} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;