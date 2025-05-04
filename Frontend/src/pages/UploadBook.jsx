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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!user || !(user.userRole === "Author" || user.userRole === "Admin")) {
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
    setUploading(false);
    setProgress(0);

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedImageTypes.includes(coverImage.type)) {
          setError('Invalid cover image format. Please upload JPEG, PNG, GIF, or WebP.');
          return;
  }
  
    const maxSizeInBytes = 100 * 1024 * 1024; // 100 MB
  
    if (!bookFile || !coverImage) {
      setError('Please select both a book file and a cover image.');
      return;
    }
  
    if (bookFile.size > maxSizeInBytes) {
      setError('Book file size exceeds 100MB limit. Please upload a smaller file.');
      return;
    }

    if (coverImage.size > 5 * 1024 * 1024) {
      setError('Cover image size exceeds 5MB limit. Please upload a smaller image.');
      return;
    }
    
  
    const form = new FormData();
    form.append('title', formData.title);
    form.append('author', user.fullName || user.email || user._id);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('inSubscription', formData.inSubscription);
    form.append('bookFile', bookFile);
    form.append('coverImage', coverImage);
    form.append('publishedDate', formData.publishedDate || new Date().toISOString().split('T')[0]);
  
    setUploading(true);
  
    try {
      console.log(bookFile, coverImage)
      const response = await axios.post(
        'http://localhost:5000/api/auth/uploadbook',
        form,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
          // timeout: 2 * 60 * 1000, // 10 minutes
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        }
      );
  
      setMessage(response.data.message || 'Book uploaded successfully!');
      setTimeout(() => navigate('/books'), 2000);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="upload-container">
      <h2>Upload a New Book</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      {uploading && (
        <div className="progress-container">
          <p className="uploading-text">Uploading... {progress}%</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

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

        <button type="submit" disabled={uploading}>
          {uploading ? `Uploading... ${progress}%` : 'Upload Book'}
        </button>

      </form>
    </div>
  );
};

export default UploadBook;
