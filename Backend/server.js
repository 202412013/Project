const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);

const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});

