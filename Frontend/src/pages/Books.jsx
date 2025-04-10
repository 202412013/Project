import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Books.css';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/getbooks');
        setBooksByCategory(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch books:', err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="books-container">
      {Object.keys(booksByCategory).map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="book-grid">
            {booksByCategory[category].map((book) => (
                <div key={book._id} className="book-card" onClick={() => handleBookClick(book._id)}>
                    <img src={book.coverImage} alt={book.title} className="book-image" />
                    <div className="book-info">
                          <h4>{book.title}</h4>
                          <p>{book.author}</p>
                    </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
