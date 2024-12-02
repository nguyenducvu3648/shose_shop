const ShoeModel = require('../models/shoeModel');

// Thêm mới
exports.addShoe = async (req, res) => {
  try {
    const newShoe = new ShoeModel(req.body);
    await newShoe.save();
    res.status(201).json(newShoe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách
exports.getShoes = async (req, res) => {
    try {
      const shoes = await ShoeModel.find();  // Truy vấn tất cả các giày từ collection 'shoes'
      console.log('Danh sách giày:', shoes);  // Log kết quả trả về từ database
  
      if (!shoes || shoes.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy giày.' });
      }
  
      res.json(shoes);  // Trả về danh sách giày dưới dạng JSON
    } catch (error) {
      console.error('Lỗi khi truy xuất dữ liệu giày:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu giày: ' + error.message });
    }
  };

// Cập nhật
exports.updateShoe = async (req, res) => {
  try {
    const { model } = req.params;
    const updatedShoe = await ShoeModel.findOneAndUpdate({ model }, req.body, { new: true });
    if (!updatedShoe) return res.status(404).send('Shoe not found');
    res.json(updatedShoe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa
exports.deleteShoe = async (req, res) => {
  try {
    const { model } = req.params;
    const deletedShoe = await ShoeModel.findOneAndDelete({ model });
    if (!deletedShoe) return res.status(404).send('Shoe not found');
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};