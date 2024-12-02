const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Kết nối đến database 'ecommerce'
    const conn = await mongoose.connect('mongodb+srv://vunguyen3648:httd3648@cluster0.uvwbt.mongodb.net/ecommerce?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Kết nối đến MongoDB thành công: ${conn.connection.host}`);
  } catch (err) {
    console.error('Kết nối đến MongoDB thất bại!', err);
    process.exit(1); // Dừng ứng dụng nếu kết nối thất bại
  }
};

module.exports = connectDB;
