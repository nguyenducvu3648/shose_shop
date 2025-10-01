// controllers/shoeController.js
const ShoeModel = require('../models/shoeModel');

// Thêm mới
exports.addShoe = async (req, res) => {
  try {
    // Kiểm tra model đã tồn tại chưa
    const existingShoe = await ShoeModel.findOne({ model: req.body.model });
    if (existingShoe) {
      return res.status(400).json({ 
        message: `Model "${req.body.model}" đã tồn tại. Vui lòng chọn model khác.` 
      });
    }

    const newShoe = new ShoeModel(req.body);  // Tạo đối tượng giày mới từ dữ liệu request body
    await newShoe.save();  // Lưu giày vào database
    res.status(201).json(newShoe);  // Trả về giày đã được tạo với mã status 201
  } catch (error) {
    console.error('Lỗi khi thêm giày:', error);
    
    // Xử lý lỗi duplicate key
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: `Model "${req.body.model}" đã tồn tại. Vui lòng chọn model khác.` 
      });
    }
    
    res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm giày: ' + error.message });
  }
};

// Lấy danh sách giày
exports.getShoes = async (req, res) => {
  try {
    const shoes = await ShoeModel.find();  // Truy vấn tất cả giày từ database
    console.log('Danh sách giày:', shoes);
    
    if (!shoes || shoes.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy giày.' });
    }
    
    res.json(shoes);  // Trả về danh sách giày
  } catch (error) {
    console.error('Lỗi khi truy xuất dữ liệu giày:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu giày: ' + error.message });
  }
};

// Lấy giày theo model
exports.getShoeByModel = async (req, res) => {
  try {
    const { model } = req.params;  // Lấy model từ URL params
    const shoe = await ShoeModel.findOne({ model });  // Tìm giày theo model

    if (!shoe) {
      return res.status(404).json({ message: 'Giày không tồn tại với model: ' + model });
    }

    res.json(shoe);  // Trả về giày theo model
  } catch (error) {
    console.error('Lỗi khi lấy giày theo model:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy giày theo model: ' + error.message });
  }
};

// Cập nhật giày
exports.updateShoe = async (req, res) => {
  try {
    const { model } = req.params;  // Lấy model từ URL params
    
    // Nếu model bị thay đổi, kiểm tra model mới có tồn tại không
    if (req.body.model && req.body.model !== model) {
      const existingShoe = await ShoeModel.findOne({ model: req.body.model });
      if (existingShoe) {
        return res.status(400).json({ 
          message: `Model "${req.body.model}" đã tồn tại. Vui lòng chọn model khác.` 
        });
      }
    }
    
    const updatedShoe = await ShoeModel.findOneAndUpdate({ model }, req.body, { new: true });  // Cập nhật giày theo model

    if (!updatedShoe) {
      return res.status(404).json({ message: 'Giày không tồn tại với model: ' + model });  // Trả về lỗi nếu không tìm thấy giày
    }

    res.json(updatedShoe);  // Trả về giày đã cập nhật
  } catch (error) {
    console.error('Lỗi khi cập nhật giày:', error);
    
    // Xử lý lỗi duplicate key
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: `Model "${req.body.model}" đã tồn tại. Vui lòng chọn model khác.` 
      });
    }
    
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật giày: ' + error.message });
  }
};

// Xóa giày
exports.deleteShoe = async (req, res) => {
  try {
    const { model } = req.params;  // Lấy model từ URL params
    const deletedShoe = await ShoeModel.findOneAndDelete({ model });  // Tìm và xóa giày theo model
    
    if (!deletedShoe) {
      return res.status(404).json({ message: 'Giày không tồn tại với model: ' + model });  // Trả về lỗi nếu không tìm thấy giày để xóa
    }

    res.status(200).json({ message: 'Xóa giày thành công', deletedShoe });  // Trả về thông báo thành công
  } catch (error) {
    console.error('Lỗi khi xóa giày:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa giày: ' + error.message });
  }
};
