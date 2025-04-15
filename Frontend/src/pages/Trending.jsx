import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/Trending.css';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/getbooks');
        const booksByCategory = res.data;
        const allBooks = Object.values(booksByCategory).flat();

        const sorted = allBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const trending = sorted.slice(0, 5);

        setTrendingBooks(trending);
      } catch (err) {
        console.error('Failed to fetch trending books:', err);
      }
    };

    fetchTrending();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section className="trending-section">
      <div className="trending-header">
        <h2>🔥 Trending Books</h2>
        <div className="carousel-navigation-header">
          <button onClick={() => scroll('left')} className="scroll-btn gradient-btn left-header-btn">
            &lt;
          </button>
          <button onClick={() => scroll('right')} className="scroll-btn gradient-btn right-header-btn">
            &gt;
          </button>
        </div>
      </div>
      <div className="book-carousel-grid" ref={scrollRef}>
        {trendingBooks.filter(book => book.active).map((book) => (
          <div key={book._id} className="book-card" onClick={() => navigate(`/book/${book._id}`)}>
            <div className="image">
              <img src={book.coverImage} alt={book.title} />
            </div>
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;