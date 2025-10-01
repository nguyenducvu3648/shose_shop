# Hướng dẫn Deploy CI/CD với GitHub Actions

Hướng dẫn deploy ứng dụng Shoe Store Management lên Vercel (Frontend) và Railway (Backend) với CI/CD pipeline.

## 🚀 Kiến trúc Deployment

```
GitHub Repository
├── Frontend (React) → Vercel
├── Backend (Node.js) → Railway
└── Database → MongoDB Atlas
```

## 📋 Yêu cầu

- GitHub Repository
- Vercel Account
- Railway Account
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
├── railway.json
├── env.production
├── frontend/
│   ├── vercel.json
│   ├── env.production
│   └── package.json
└── package.json
```

## 🎯 Bước 2: Deploy Backend lên Railway

### 2.1 Tạo Railway Account
1. Truy cập [Railway.app](https://railway.app)
2. Đăng ký/Đăng nhập với GitHub
3. Tạo project mới

### 2.2 Deploy Backend
1. **Connect GitHub Repository:**
   - Click "Deploy from GitHub repo"
   - Chọn repository của bạn
   - Chọn branch `main`

2. **Cấu hình Service:**
   - Railway sẽ tự động detect Node.js
   - Root Directory: `/` (root của repo)
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

4. **Lấy Railway Token:**
   - Vào Settings → Tokens
   - Tạo token mới
   - Copy token để dùng trong GitHub Secrets

## 🌐 Bước 3: Deploy Frontend lên Vercel

### 3.1 Tạo Vercel Account
1. Truy cập [Vercel.com](https://vercel.com)
2. Đăng ký/Đăng nhập với GitHub
3. Import project từ GitHub

### 3.2 Cấu hình Vercel
1. **Import Project:**
   - Chọn repository
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`

2. **Environment Variables:**
   ```env
   REACT_APP_API_URL=https://your-backend-domain.railway.app/api
   ```

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Lấy Vercel Tokens:**
   - Vào Settings → Tokens
   - Tạo token mới
   - Vào Project Settings → General
   - Copy Project ID và Org ID

## 🔐 Bước 4: Cấu hình GitHub Secrets

### 4.1 Vào Repository Settings
1. GitHub Repository → Settings → Secrets and variables → Actions

### 4.2 Thêm Secrets
```env
# Railway
RAILWAY_TOKEN=your_railway_token
RAILWAY_SERVICE_NAME=your_service_name

# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# API URL
REACT_APP_API_URL=https://your-backend-domain.railway.app/api
```

## ⚙️ Bước 5: Cấu hình CI/CD Pipeline

### 5.1 GitHub Actions Workflow
File `.github/workflows/deploy.yml` đã được tạo với:
- **Test Job**: Chạy tests cho cả frontend và backend
- **Lint Job**: Kiểm tra code quality
- **Deploy Backend**: Deploy lên Railway
- **Deploy Frontend**: Deploy lên Vercel

### 5.2 Trigger Events
- **Push to main**: Tự động deploy
- **Pull Request**: Chạy tests và linting

## 🚀 Bước 6: Test Deployment

### 6.1 Trigger Deployment
```bash
# Tạo thay đổi nhỏ
echo "# Test deployment" >> README.md
git add .
git commit -m "Test CI/CD deployment"
git push origin main
```

### 6.2 Kiểm tra
1. **GitHub Actions**: Vào tab Actions để xem progress
2. **Railway**: Kiểm tra backend deployment
3. **Vercel**: Kiểm tra frontend deployment

## 🔍 Bước 7: Kiểm tra kết nối

### 7.1 Test Backend
```bash
curl https://your-backend-domain.railway.app/api/shoes
```

### 7.2 Test Frontend
- Truy cập Vercel domain
- Kiểm tra giao diện
- Test CRUD operations

## 🛠️ Troubleshooting

### Lỗi thường gặp

#### 1. Railway Deployment Failed
```bash
# Kiểm tra logs
railway logs

# Kiểm tra environment variables
railway variables
```

#### 2. Vercel Build Failed
```bash
# Kiểm tra build logs
vercel logs

# Test build locally
cd frontend
npm run build
```

#### 3. CORS Issues
```javascript
// Cập nhật CORS trong app.js
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app'],
  credentials: true
}));
```

#### 4. Environment Variables
- Kiểm tra tên biến môi trường
- Đảm bảo không có khoảng trắng
- Restart services sau khi thay đổi

### Debug Commands
```bash
# Railway
railway status
railway logs --tail

# Vercel
vercel --prod
vercel logs

# Local testing
npm start
cd frontend && npm start
```

## 📊 Monitoring

### 1. Railway Dashboard
- Monitor backend performance
- View logs và metrics
- Scale resources

### 2. Vercel Dashboard
- Monitor frontend performance
- View analytics
- Check build status

### 3. GitHub Actions
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
3. **Rollback**: Use Vercel/Railway rollback

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
- ✅ Backend chạy trên Railway
- ✅ Frontend chạy trên Vercel
- ✅ CI/CD pipeline tự động
- ✅ Database trên MongoDB Atlas
- ✅ Monitoring và logging

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs
2. Xem documentation
3. Tạo issue trên GitHub
4. Liên hệ support

---

**Lưu ý**: Thay thế các placeholder URLs bằng domain thực tế của bạn.
