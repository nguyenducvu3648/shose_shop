# Hướng dẫn Deploy Full-Stack App lên Vercel

Hướng dẫn deploy ứng dụng Shoe Store Management lên Vercel với CI/CD pipeline.

## 🚀 Kiến trúc Deployment

```
GitHub Repository
├── Full-Stack App → Vercel
│   ├── Frontend (React)
│   ├── Backend (Node.js API)
│   └── Database → MongoDB Atlas
```

## 📋 Yêu cầu

- GitHub Repository
- Vercel Account
- MongoDB Atlas Cluster

## 🔧 Bước 1: Chuẩn bị Repository

### 1.1 Push code lên GitHub
```bash
git add .
git commit -m "Add CI/CD configuration"
git push origin main
```

### 1.2 Cấu trúc thư mục
```
├── .github/workflows/deploy.yml
├── vercel.json
├── env.production
├── app.js (Backend + Frontend)
├── frontend/
│   ├── vercel.json
│   ├── env.production
│   └── package.json
└── package.json
```

## 🎯 Bước 2: Deploy Full-Stack App lên Vercel

### 2.1 Tạo Vercel Account
1. Truy cập [Vercel.com](https://vercel.com)
2. Đăng ký/Đăng nhập với GitHub
3. Import project từ GitHub

### 2.2 Cấu hình Vercel
1. **Import Project:**
   - Chọn repository
   - Framework Preset: `Other`
   - Root Directory: `/` (root của repo)

2. **Environment Variables:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   NODE_ENV=production
   REACT_APP_API_URL=/api
   ```

3. **Build Settings:**
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `npm install && cd frontend && npm install`

4. **Lấy Vercel Tokens:**
   - Vào Settings → Tokens
   - Tạo token mới
   - Vào Project Settings → General
   - Copy Project ID và Org ID

## 🔐 Bước 3: Cấu hình GitHub Secrets

### 3.1 Vào Repository Settings
1. GitHub Repository → Settings → Secrets and variables → Actions

### 3.2 Thêm Secrets
```env
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## ⚙️ Bước 4: Cấu hình CI/CD Pipeline

### 4.1 GitHub Actions Workflow
File `.github/workflows/deploy.yml` đã được tạo với:
- **Test Job**: Chạy tests cho cả frontend và backend
- **Lint Job**: Kiểm tra code quality
- **Deploy Full-Stack**: Deploy lên Vercel

### 4.2 Trigger Events
- **Push to main**: Tự động deploy
- **Pull Request**: Chạy tests và linting

## 🚀 Bước 5: Test Deployment

### 5.1 Trigger Deployment
```bash
# Tạo thay đổi nhỏ
echo "# Test deployment" >> README.md
git add .
git commit -m "Test CI/CD deployment"
git push origin main
```

### 5.2 Kiểm tra
1. **GitHub Actions**: Vào tab Actions để xem progress
2. **Vercel**: Kiểm tra full-stack deployment

## 🔍 Bước 6: Kiểm tra kết nối

### 6.1 Test API
```bash
curl https://your-domain.vercel.app/api/shoes
```

### 6.2 Test Frontend
- Truy cập Vercel domain
- Kiểm tra giao diện
- Test CRUD operations

## 🛠️ Troubleshooting

### Lỗi thường gặp

#### 1. Vercel Build Failed
```bash
# Kiểm tra build logs
vercel logs

# Test build locally
cd frontend
npm run build
```

#### 2. API Routes Not Working
```bash
# Kiểm tra API endpoint
curl https://your-domain.vercel.app/api/health

# Kiểm tra logs
vercel logs
```

#### 3. CORS Issues
```javascript
// Cập nhật CORS trong app.js
app.use(cors({
  origin: ['https://your-domain.vercel.app'],
  credentials: true
}));
```

#### 4. Environment Variables
- Kiểm tra tên biến môi trường
- Đảm bảo không có khoảng trắng
- Restart deployment sau khi thay đổi

### Debug Commands
```bash
# Vercel
vercel --prod
vercel logs

# Local testing
npm start
cd frontend && npm start
```

## 📊 Monitoring

### 1. Vercel Dashboard
- Monitor full-stack performance
- View analytics
- Check build status
- View logs và metrics

### 2. GitHub Actions
- Monitor CI/CD pipeline
- View build logs
- Check deployment status

## 🔄 Workflow

### Development Flow
1. **Code**: Develop locally
2. **Commit**: Push to feature branch
3. **PR**: Create pull request
4. **Review**: Code review
5. **Merge**: Merge to main
6. **Deploy**: Auto-deploy to production

### Production Updates
1. **Hotfix**: Push directly to main
2. **Feature**: Use feature branches
3. **Rollback**: Use Vercel rollback

## 📝 Best Practices

### 1. Environment Management
- Sử dụng environment variables
- Không commit secrets
- Test trên staging trước

### 2. Code Quality
- Chạy tests trước khi deploy
- Sử dụng linting
- Code review bắt buộc

### 3. Monitoring
- Monitor performance
- Set up alerts
- Regular health checks

## 🎉 Kết quả

Sau khi hoàn thành, bạn sẽ có:
- ✅ Full-stack app chạy trên Vercel
- ✅ CI/CD pipeline tự động
- ✅ Database trên MongoDB Atlas
- ✅ Monitoring và logging
- ✅ Single domain cho cả frontend và backend

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs
2. Xem documentation
3. Tạo issue trên GitHub
4. Liên hệ support

---

**Lưu ý**: Thay thế các placeholder URLs bằng domain thực tế của bạn.

## 🚀 Ưu điểm của Full-Stack Deployment

### So với tách biệt (Railway + Vercel):
- ✅ **Đơn giản hơn**: Chỉ 1 platform để quản lý
- ✅ **Chi phí thấp hơn**: Không cần trả tiền cho 2 services
- ✅ **Dễ debug**: Tất cả logs ở 1 nơi
- ✅ **Performance tốt hơn**: Không có network latency giữa frontend và backend
- ✅ **CORS đơn giản**: Không cần cấu hình CORS phức tạp
- ✅ **Single domain**: Dễ quản lý SSL và domain
