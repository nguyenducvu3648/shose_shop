# Shoe Store Management - Frontend

Giao diện web cho hệ thống quản lý cửa hàng giày được xây dựng bằng React.

## Tính năng

- 📱 **Responsive Design**: Giao diện thân thiện với mọi thiết bị
- 🔍 **Tìm kiếm & Lọc**: Tìm kiếm và sắp xếp sản phẩm
- ➕ **Thêm sản phẩm**: Thêm giày mới với đầy đủ thông tin
- ✏️ **Chỉnh sửa**: Cập nhật thông tin sản phẩm
- 🗑️ **Xóa sản phẩm**: Xóa sản phẩm với xác nhận
- 🎨 **Giao diện đẹp**: Thiết kế hiện đại với gradient và animations
- 📊 **Hiển thị giá**: Format tiền tệ Việt Nam
- 🖼️ **Hình ảnh**: Hiển thị hình ảnh sản phẩm với fallback

## Cài đặt

1. **Cài đặt dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Khởi động development server:**
   ```bash
   npm start
   ```

3. **Truy cập ứng dụng:**
   - Mở trình duyệt và truy cập `http://localhost:3000`

## Cấu trúc thư mục

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js          # Header với navigation
│   │   ├── ShoeList.js        # Danh sách giày
│   │   ├── ShoeCard.js        # Card hiển thị giày
│   │   ├── AddShoe.js         # Form thêm giày
│   │   └── EditShoe.js        # Form chỉnh sửa giày
│   ├── services/
│   │   └── api.js             # API service
│   ├── App.js                 # Component chính
│   ├── App.css                # Styles cho App
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── package.json
└── README.md
```

## Công nghệ sử dụng

- **React 18**: Framework JavaScript
- **React Router**: Điều hướng
- **Axios**: HTTP client
- **React Toastify**: Thông báo
- **Lucide React**: Icons
- **CSS3**: Styling với Flexbox và Grid

## API Integration

Frontend kết nối với backend API thông qua:
- Base URL: `http://localhost:5000/api`
- Endpoints:
  - `GET /shoes` - Lấy danh sách giày
  - `GET /shoes/:model` - Lấy giày theo model
  - `POST /shoes` - Thêm giày mới
  - `PUT /shoes/:model` - Cập nhật giày
  - `DELETE /shoes/:model` - Xóa giày

## Responsive Design

- **Desktop**: Grid 3 cột
- **Tablet**: Grid 2 cột
- **Mobile**: Grid 1 cột
- **Navigation**: Collapse trên mobile

## Tính năng nâng cao

### Tìm kiếm
- Tìm theo tên, model, màu sắc
- Real-time search
- Highlight kết quả

### Sắp xếp
- Sắp xếp theo tên, model, giá, màu
- Tăng dần/giảm dần
- Kết hợp với tìm kiếm

### Validation
- Form validation
- Error handling
- Loading states
- Success/Error notifications

## Build cho Production

```bash
npm run build
```

Files build sẽ được tạo trong thư mục `build/`.

## Environment Variables

Tạo file `.env` trong thư mục frontend:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Lỗi kết nối API
- Kiểm tra backend server đang chạy
- Kiểm tra CORS configuration
- Kiểm tra API URL

### Lỗi build
- Xóa `node_modules` và `package-lock.json`
- Chạy `npm install` lại
- Kiểm tra version Node.js (>= 14)

### Lỗi hiển thị
- Kiểm tra console browser
- Kiểm tra network tab
- Kiểm tra API response
