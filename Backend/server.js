const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');

dotenv.config();
connectDB();


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // ⬅️ Your React App URL
    credentials: true                 // ⬅️ Allow cookies
  }));
  
  // cookie-parser bhi use karo agar nahi kiya
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());

  app.use(express.json());

app.use('/api/auth',authRoutes);
console.log("Auth routes mounted!");



const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});

// small true 