import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Trending from './Trending';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [filteredBooks, setFilteredBooks] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const scrollRefs = useRef({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/getbooks');
        const booksByCategory = res.data;
        setBooksByCategory(booksByCategory);
        setFilteredBooks(booksByCategory);
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


  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter the books by title or author based on the search query
    const filtered = Object.keys(booksByCategory).reduce((acc, category) => {
      const filteredCategory = booksByCategory[category].filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredCategory.length > 0) {
        acc[category] = filteredCategory;
      }
      return acc;
    }, {});
    setFilteredBooks(filtered);
  };



  if (loading) return <p>Loading homepage...</p>;

  return (
    <div className="home-container">

       {/* Search Bar */}
       <div className="search-bar-container">
        <div className="search-wrapper">
          <input
            type="text"
            className="home-search-input"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="home-search-icon" onClick={() => handleSearch(searchQuery)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>



      {/* 🔥 Trending Books Section */}
      <Trending searchQuery={searchQuery} />

      {/* 📚 Category-wise Books Section */}
      {Object.keys(booksByCategory).map((category) => (
        <section key={category} className="category-sec">
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
            {booksByCategory[category]?.filter(book => book.active &&
            (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()))).map((book) => (
              <div
                key={book._id}
                className="book-card"
                onClick={() => handleBookClick(book._id)}
              >
                <img src={book.coverImage} alt={book.title} />
                <h5>{book.title}</h5>
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