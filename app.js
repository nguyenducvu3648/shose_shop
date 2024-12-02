const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const shoeRoutes = require('./routes/shoeRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB
connectDB();

// Sử dụng routes
app.use('/api/shoes', shoeRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});