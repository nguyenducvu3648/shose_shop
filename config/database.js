const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vunguyen3648:httd3648@cluster0.uvwbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Kết nối đến MongoDB thành công!'))
    .catch((err) => {
        console.error('Kết nối đến MongoDB thất bại!', err);
    });
