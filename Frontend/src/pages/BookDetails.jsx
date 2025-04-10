import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Bookdetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [showPdf, setShowPdf] = useState(false); // for toggling PDF

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/book/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error('Failed to fetch book details:', err);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <h1>Book Not Found</h1>;

  const handleReadBook = () => {
    if (!book.inSubscription) {
      if (book.bookFile) {
        setShowPdf(true);
      } else {
        alert('PDF not available for this book.');
      }
      return;
    }

    navigate('/subscription');
  };

  const handleClosePdf = () => {
    setShowPdf(false);
  };

  return (
    <div className="book-detail-page">
      <div className="left-section">
        <img src={book.coverImage} alt={`${book.title} cover`} className="book-cover" />
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Published:</strong> {new Date(book.publishedDate).toDateString()}</p>

        <div className="share-icons">
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook"></i>
          <i className="fas fa-envelope"></i>
        </div>
      </div>

      {!showPdf ? (
        <div className="right-section">
          <h1 className="book-title">{book.title}</h1>
          <h2 className="book-author">By <span className="author-name">{book.author}</span></h2>
          <div className="ratings">⭐⭐⭐⭐⭐ (8 Reviews)</div>

          <div className="buttons">
            <button onClick={handleReadBook}>Read Online</button>
          </div>

          <p className="book-info">{book.description}</p>
        </div>
      ) : (
        <div className="pdf-viewer">
    <button className="close-pdf-btn" onClick={handleClosePdf}>❌ Close PDF</button>

    <iframe
      src={`https://docs.google.com/gview?url=${book.bookFile}&embedded=true`}
      title="PDF Viewer"
      width="100%"
      height="600px"
      frameBorder="0"
      style={{ border: 'none', marginTop: '1rem' }}
    ></iframe>
  </div>
      )}
    </div>
  );
};

export default BookDetails;
