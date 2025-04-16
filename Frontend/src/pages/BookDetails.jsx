import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Bookdetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [showPdf, setShowPdf] = useState(false); // for toggling PDF
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [id]);


    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/book/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error('Failed to fetch book details:', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/reviews/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };


  if (!book) return <h1>Book Not Found</h1>;

  const handleReadBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/subscription-status`, {
        withCredentials: true
      });
  
      if (!book.inSubscription) {
        if (book.bookFile) {
          setShowPdf(true);
        } else {
          alert("PDF not available for this book.");
        }
        return;
      }
  
      if (res.data.isSubscribed) {
        if (book.bookFile) {
          setShowPdf(true);
        } else {
          alert("PDF not available for this book.");
        }
      } else {
        alert(" Your subscription has expired or is inactive. Redirecting to subscription page.");
        navigate("/subscription");
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      alert("Something went wrong while checking subscription.");
    }
  };


  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/addComment",
        { bookId: id, rating: newRating, review: newReview },
        { withCredentials: true }
      );
      setReviews([...reviews, res.data]);
      setNewReview('');
      setNewRating(5);
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("You must be logged in to leave a review.");
    }
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

          <div className="buttons">
            <button onClick={handleReadBook}>Read Online</button>
          </div>

          <p className="book-info">{book.description}</p>

          <div className="reviews-section">
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              <ul className="review-list">
                {reviews.map((rev) => (
                  <li key={rev._id} className="review-card">
                  <div className="review-header">
                    <strong>{rev.user.fullName}</strong>
                    <span className="stars">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </span>
                  </div>
                  <p className="review-text">{rev.review}</p>
                  <small className="review-date">{new Date(rev.createdAt).toLocaleDateString()}</small>
                </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
            <form onSubmit={handleSubmitReview} className="review-form">
            <span className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${star <= newRating ? 'filled' : ''}`}
                          onClick={() => setNewRating(star)}
                        >
                          ★
                        </span>
                      ))}
              </span>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here..."
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
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
