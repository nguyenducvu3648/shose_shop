const express = require('express');
const connectDB = require('./config/db');
const shoeRoutes = require('./routes/shoeRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Kết nối đến MongoDB
connectDB();

// Sử dụng các routes
app.use('/api/shoes', shoeRoutes);


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});