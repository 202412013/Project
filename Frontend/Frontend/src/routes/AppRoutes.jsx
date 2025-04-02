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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/books" element={<Books />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/bookdetails/:id" element={<BookDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
