import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminManageBooks.css';

const AdminManageBooks = () => {
  const [booksByCategory, setBooksByCategory] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/getbooks');
      setBooksByCategory(res.data); // Assuming response is an object like { "Fiction": [...], "Science": [...] }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const toggleActive = async (bookId, category) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/admin/books/${bookId}/toggle-active`);
      // Update in correct category
      setBooksByCategory((prev) => ({
        ...prev,
        [category]: prev[category].map((book) =>
          book._id === bookId ? { ...book, active: res.data.active } : book
        )
      }));
    } catch (err) {
      console.error("Error toggling active status:", err);
    }
  };

  return (
    <div className="manage-books-container">
      <h2>Manage Books</h2>

      {Object.keys(booksByCategory).map((category) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <table className="manage-books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Active Status</th>
                <th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {booksByCategory[category].map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.active ? 'active' : 'Inactive'}</td>
                  <td>
                    <button
                      className={`toggle-button ${book.active ? 'green' : 'red'}`}
                      onClick={() => toggleActive(book._id, category)}
                    >
                      {book.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminManageBooks;
