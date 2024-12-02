const express = require('express');
const connectDB = require('./config/db');
const shoeRoutes = require('./routes/shoeRoutes');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Kết nối đến MongoDB
connectDB();

// Cấu hình header CORS thủ công
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Cho phép frontend từ localhost:3000
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Sử dụng các routes
app.use('/api/shoes', shoeRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
