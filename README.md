# Shoe Store Management System

Hệ thống quản lý cửa hàng giày với backend Node.js và frontend React.

## 🚀 Tính năng

### Backend (Node.js + Express + MongoDB)
- ✅ RESTful API cho quản lý giày
- ✅ Kết nối MongoDB Atlas
- ✅ Validation middleware
- ✅ CORS configuration
- ✅ Error handling
- ✅ Seed data script

### Frontend (React)
- ✅ Giao diện responsive
- ✅ CRUD operations
- ✅ Tìm kiếm và lọc
- ✅ Form validation
- ✅ Toast notifications
- ✅ Loading states

## 📁 Cấu trúc dự án

```
├── backend/                 # Backend Node.js
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   └── shoeController.js
│   ├── middleware/
│   │   └── validationMiddleware.js
│   ├── models/
│   │   └── shoeModel.js
│   ├── routes/
│   │   └── shoeRoutes.js
│   ├── scripts/
│   │   └── seedDatabase.js
│   ├── app.js
│   ├── package.json
│   └── DATABASE_SETUP.md
├── frontend/               # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── README.md
└── README.md
```

## 🛠️ Cài đặt và chạy

### 1. Backend Setup

```bash
# Cài đặt dependencies
npm install

# Cấu hình environment
cp env.example .env
# Cập nhật MONGODB_URI trong .env

# Seed database
npm run seed

# Khởi động server
npm start
```

Backend sẽ chạy tại `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Cài đặt dependencies
npm install

# Khởi động development server
npm start
```

Frontend sẽ chạy tại `http://localhost:3000`

## 📊 Database Schema

### Collection: `shoes`

```javascript
{
  _id: ObjectId,
  name: String,           // Tên giày
  model: String,          // Model (unique)
  price: Number,          // Giá (VND)
  imgAddress: String,     // URL hình ảnh
  modelColor: String,     // Màu sắc
  createdAt: Date,        // Ngày tạo
  updatedAt: Date         // Ngày cập nhật
}
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shoes` | Lấy danh sách tất cả giày |
| GET | `/api/shoes/:model` | Lấy giày theo model |
| POST | `/api/shoes` | Thêm giày mới |
| PUT | `/api/shoes/:model` | Cập nhật giày |
| DELETE | `/api/shoes/:model` | Xóa giày |

## 🎨 Giao diện

### Trang chủ - Danh sách giày
- Grid layout responsive
- Tìm kiếm real-time
- Sắp xếp theo nhiều tiêu chí
- Card design với hình ảnh

### Thêm/Chỉnh sửa giày
- Form validation
- Upload hình ảnh URL
- Loading states
- Error handling

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Tạo MongoDB Atlas cluster
2. Cấu hình environment variables
3. Deploy code

### Frontend (Netlify/Vercel)
1. Build project: `npm run build`
2. Deploy thư mục `build/`
3. Cấu hình API URL

## 🛡️ Security

- CORS configuration
- Input validation
- Error handling
- Environment variables

## 📱 Responsive Design

- **Desktop**: Grid 3 cột
- **Tablet**: Grid 2 cột  
- **Mobile**: Grid 1 cột
- **Navigation**: Mobile-friendly

## 🔧 Development

### Scripts

```bash
# Backend
npm start          # Khởi động server
npm run seed       # Seed database

# Frontend
npm start          # Development server
npm run build      # Build production
npm test           # Run tests
```

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb+srv://...
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Backend Issues
- Kiểm tra MongoDB connection
- Kiểm tra CORS settings
- Kiểm tra environment variables

### Frontend Issues
- Kiểm tra API connection
- Kiểm tra console errors
- Kiểm tra network requests

## 📝 License

ISC License

## 👨‍💻 Author

ducvu

---

**Lưu ý**: Đảm bảo MongoDB Atlas cluster đang chạy và có quyền truy cập trước khi khởi động ứng dụng.