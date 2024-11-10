const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/laptrinhdidong', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Kết nối đến MongoDB thành công!'))
    .catch((err) => {
        console.error('Kết nối đến MongoDB thất bại!', err);
    });
