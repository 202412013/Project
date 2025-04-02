import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/Bookdetails.css';

const BookDetails = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  if (!book) {
    return <h1>Book Not Found</h1>;
  }

  const handleReadBook = () => {
    if (!book.inSubscription) {
      alert('This book is not available under the subscription.');
      return;
    }

    if (!user?.hasSubscription) {
      navigate('/subscription');
    } else {
      navigate(`/read/${book.id}`);
    }
  };

  return (
    <div className="book-detail-page">
      <div className="left-section">
        <img src={book.coverImage} alt={`${book.title} cover`} className="book-cover" />
        <p><strong>Published:</strong> {book.publishedYear}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Downloads:</strong> {book.downloads}</p>
        <div className="share-icons">
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook"></i>
          <i className="fas fa-envelope"></i>
        </div>
      </div>

      <div className="right-section">
        <h1 className="book-title">{book.title}</h1>
        <h2 className="book-author">By <span className="author-name">{book.author}</span></h2>
        <div className="ratings">⭐⭐⭐⭐⭐ (8 Reviews)</div>

        <div className="buttons">
        
          <button  onClick={handleReadBook}>Read Online</button>
        </div>

        <p className="book-info">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
