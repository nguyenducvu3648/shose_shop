# Hướng dẫn Setup Database MongoDB Atlas

## 1. Tạo Cluster trên MongoDB Atlas

1. Truy cập [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Đăng ký/Đăng nhập tài khoản
3. Tạo cluster mới (chọn Free Tier M0)
4. Chọn region gần nhất (Singapore cho Việt Nam)
5. Đặt tên cluster (ví dụ: `ecommerce-cluster`)

## 2. Cấu hình Database Access

1. Vào **Database Access** trong menu bên trái
2. Click **Add New Database User**
3. Chọn **Password** authentication
4. Tạo username và password mạnh
5. Gán quyền **Read and write to any database**

## 3. Cấu hình Network Access

1. Vào **Network Access** trong menu bên trái
2. Click **Add IP Address**
3. Chọn **Allow Access from Anywhere** (0.0.0.0/0) cho development
4. Hoặc thêm IP cụ thể của bạn

## 4. Lấy Connection String

1. Vào **Database** trong menu bên trái
2. Click **Connect** trên cluster
3. Chọn **Connect your application**
4. Copy connection string
5. Thay `<password>` bằng password đã tạo
6. Thay `<dbname>` bằng `ecommerce`

## 5. Cấu hình Environment Variables

1. Copy file `env.example` thành `.env`
2. Cập nhật `MONGODB_URI` với connection string của bạn

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 6. Chạy Seed Database

```bash
# Tạo thư mục scripts nếu chưa có
mkdir scripts

# Chạy script seed database
node scripts/seedDatabase.js
```

## 7. Cấu trúc Database

### Collection: `shoes`

```javascript
{
  _id: ObjectId,
  name: String,           // Tên giày
  model: String,          // Model (unique)
  price: Number,          // Giá (VND)
  imgAddress: String,     // URL hình ảnh
  modelColor: String,     // Màu sắc
  createdAt: Date,        // Ngày tạo (tự động)
  updatedAt: Date         // Ngày cập nhật (tự động)
}
```

## 8. API Endpoints

- `GET /api/shoes` - Lấy danh sách tất cả giày
- `GET /api/shoes/:model` - Lấy giày theo model
- `POST /api/shoes` - Thêm giày mới
- `PUT /api/shoes/:model` - Cập nhật giày
- `DELETE /api/shoes/:model` - Xóa giày

## 9. Kiểm tra kết nối

```bash
# Khởi động server
npm start

# Test API
curl http://localhost:5000/api/shoes
```

## 10. Troubleshooting

### Lỗi kết nối
- Kiểm tra connection string
- Kiểm tra username/password
- Kiểm tra network access
- Kiểm tra firewall

### Lỗi authentication
- Đảm bảo user có quyền read/write
- Kiểm tra password có ký tự đặc biệt cần encode

### Lỗi timeout
- Kiểm tra kết nối internet
- Thử thay đổi region cluster
- Kiểm tra IP whitelist
