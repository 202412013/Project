import React from "react";
import { BrowserRouter} from 'react-router-dom';
import { UserProvider } from "./context/Usercontext";

import './styles/App.css';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";


import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
       <UserProvider>    
        <Navbar />
        <AppRoutes />
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
