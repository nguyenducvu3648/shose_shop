const app = require('./app'); // Giả sử bạn đã chuyển nội dung vào app.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});