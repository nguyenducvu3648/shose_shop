// scripts/seedDatabase.js
const mongoose = require('mongoose');
const ShoeModel = require('../models/shoeModel');
require('dotenv').config();

// Dữ liệu mẫu cho shoes
const sampleShoes = [
  {
    name: "Nike Air Max 270",
    model: "AIR-MAX-270-BLACK",
    price: 3200000,
    imgAddress: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-max-270-shoes-W6lTg7.png",
    modelColor: "Black/White"
  },
  {
    name: "Adidas Ultraboost 22",
    model: "ULTRA-22-WHITE",
    price: 4500000,
    imgAddress: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_White_GZ0127_01_standard.jpg",
    modelColor: "White/Black"
  },
  {
    name: "Jordan 1 Retro High",
    model: "JORDAN-1-BRED",
    price: 5200000,
    imgAddress: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-jordan-1-retro-high-og-shoes-W6lTg7.png",
    modelColor: "Bred (Black/Red)"
  },
  {
    name: "Converse Chuck Taylor All Star",
    model: "CHUCK-70-BLACK",
    price: 1800000,
    imgAddress: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    modelColor: "Black"
  },
  {
    name: "Vans Old Skool",
    model: "OLD-SKOOL-BLACK-WHITE",
    price: 1500000,
    imgAddress: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    modelColor: "Black/White"
  },
  {
    name: "Puma RS-X Reinvention",
    model: "RS-X-BLUE",
    price: 2800000,
    imgAddress: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    modelColor: "Blue/White"
  },
  {
    name: "New Balance 990v5",
    model: "990-V5-GREY",
    price: 4200000,
    imgAddress: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    modelColor: "Grey"
  },
  {
    name: "Reebok Classic Leather",
    model: "CLASSIC-LEATHER-WHITE",
    price: 2200000,
    imgAddress: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    modelColor: "White"
  },
  {
    name: "Asics Gel-Kayano 28",
    model: "KAYANO-28-BLACK",
    price: 3800000,
    imgAddress: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    modelColor: "Black/Silver"
  },
  {
    name: "Under Armour HOVR Phantom 3",
    model: "HOVR-PHANTOM-3-BLACK",
    price: 3500000,
    imgAddress: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    modelColor: "Black/Red"
  }
];

const seedDatabase = async () => {
  try {
    // Kết nối đến MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://vunguyen3648:httd3648@cluster0.uvwbt.mongodb.net/ecommerce?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Đã kết nối đến MongoDB Atlas');

    // Xóa tất cả dữ liệu cũ (tùy chọn)
    await ShoeModel.deleteMany({});
    console.log('Đã xóa dữ liệu cũ');

    // Thêm dữ liệu mẫu
    const insertedShoes = await ShoeModel.insertMany(sampleShoes);
    console.log(`Đã thêm ${insertedShoes.length} sản phẩm giày vào database`);

    // Hiển thị danh sách sản phẩm đã thêm
    console.log('\nDanh sách sản phẩm đã thêm:');
    insertedShoes.forEach((shoe, index) => {
      console.log(`${index + 1}. ${shoe.name} - ${shoe.model} - ${shoe.price.toLocaleString('vi-VN')} VND`);
    });

    console.log('\n✅ Seed database thành công!');
    
  } catch (error) {
    console.error('❌ Lỗi khi seed database:', error);
  } finally {
    // Đóng kết nối
    await mongoose.connection.close();
    console.log('Đã đóng kết nối database');
    process.exit(0);
  }
};

// Chạy seed database
seedDatabase();
