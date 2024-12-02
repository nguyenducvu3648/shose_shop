const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const shoeRoutes = require('./routes/shoeRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Cấu hình CORS để cho phép truy cập từ localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000', // Cho phép nguồn này (frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức HTTP cho phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header cho phép
  credentials: true, // Cho phép gửi cookie (nếu cần)
};

// Sử dụng CORS middleware với cấu hình trên
app.use(cors(corsOptions));
app.use(express.json());

// Kết nối đến MongoDB
connectDB();

// Sử dụng các routes
app.use('/api/shoes', shoeRoutes);
app.use('/api/auth', authRoutes);

// Xử lý preflight OPTIONS request
app.options('*', cors(corsOptions)); // Đảm bảo xử lý các yêu cầu OPTIONS từ trình duyệt

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
