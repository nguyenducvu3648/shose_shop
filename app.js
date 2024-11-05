const { app, sequelize, config } = require('./config/config');  // Đảm bảo đường dẫn là chính xác
const tourRoutes = require('./routes/tourRoutes');
const express = require('express');
const path  = require('path');  

const cors = require('cors');

app.use(cors());
app.use('/resource/images', express.static(path.join(__dirname,"resource", 'images')));
// Sử dụng các route
app.use('/api', tourRoutes);

// Đồng bộ với cơ sở dữ liệu và khởi động server
sequelize.sync()
  .then(() => {
    app.listen(config.server.port,'0.0.0.0', () => {
      console.log(` Server đang chạy trên cổng ${config.server.port}`);
    });
  })
  .catch(err => {
    console.error('Lỗi khi đồng bộ với cơ sở dữ liệu:', err);
  });
