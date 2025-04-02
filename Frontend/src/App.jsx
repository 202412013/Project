import React from "react";
import { BrowserRouter} from 'react-router-dom';

import './styles/App.css';
import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import  Books from './pages/Books';
// import About from './pages/About';
// import Registration from './pages/Registration';

// import Subscription from "./pages/Subscription";
// import Trending from "./pages/Trending";
// import BookDetails from "./pages/BookDetails";
import Footer from "./components/Footer";
// import Wishlist from "./pages/Wishlist";
// import Contact from "./pages/Contact";
// import Profile from "./pages/Profile";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/Registration" element={<Registration/>}/>
          <Route path="/BookDetails/:id" element={<BookDetails/>}/>
          <Route path="/Wishlist" element={<Wishlist/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes> */}

     <AppRoutes />
     <Footer />
    </BrowserRouter>
  );
}

export default App;
