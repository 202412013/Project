import React, { useState } from 'react';
import axios from 'axios';
import './styles/UploadBook.css';
import { useUser } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';

const UploadBook = () => {
  const context = useUser();
  if (!context) return null;

  const { user } = context;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    inSubscription: 'false',
    publishedDate: ''
  });

  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!user || user.userRole !== "Author") {
    return <p>Unauthorized access</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!bookFile || !coverImage) {
      setError('Please select both a book file and a cover image.');
      return;
    }

    console.log(coverImage);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('author', user.fullName || user.email || user._id);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('inSubscription', formData.inSubscription);
    form.append('bookFile', bookFile);
    form.append('coverImage', coverImage);
    form.append('publishedDate', formData.publishedDate || new Date().toISOString().split('T')[0]);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/uploadbook',
        form,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      setMessage(response.data.message || 'Book uploaded successfully!');
      setTimeout(() => navigate('/books'), 2000);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a New Book</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            <option value="Literature">Literature</option>
            <option value="Poems">Poems</option>
            <option value="Novel">Novel</option>
            <option value="Subject">Subject</option>
          </select>
        </label>

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>

        <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange} />

        <label>
          Part of Subscription?
          <select name="inSubscription" value={formData.inSubscription} onChange={handleChange} className="subscribe">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>

        <label>
          Upload Book (.pdf):
          <input type="file" accept=".pdf" onChange={e => setBookFile(e.target.files[0])} required />
        </label>

        <label>
          First Page Image:
          <input type="file" accept="image/*" onChange={e => setCoverImage(e.target.files[0])} required />
        </label>

        <button type="submit">Upload Book</button>
      </form>
    </div>
  );
};

export default UploadBook;
