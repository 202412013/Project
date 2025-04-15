import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Books from '../pages/Books';
import About from '../pages/About';
import Registration from '../pages/Registration';
import Subscription from '../pages/Subscription';
import Trending from '../pages/Trending';
import BookDetails from '../pages/BookDetails';
import Wishlist from '../pages/Wishlist';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import ForgotPassword  from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import UploadBook from '../pages/UploadBook';


// Admin Pages
import AdminManageUsers from '../pages/AdminManageUsers';
import AdminManageBooks from '../pages/AdminManageBooks';
import AdminManageReviews from '../pages/AdminManageReviews';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/books" element={<Books />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path ="/login" element={<Login />}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/upload-book" element={<UploadBook/>} />

       {/* Admin Routes */}
      <Route path="/admin/manage-users" element={<AdminManageUsers />} />
      <Route path="/admin/manage-books" element={<AdminManageBooks />} />
      <Route path="/admin/manage-reviews" element={<AdminManageReviews />} />

    </Routes>
  );
};

export default AppRoutes;
