const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoeController');
const { validateShoe } = require('../middleware/validationMiddleware');

// Thêm mới
router.post('/', validateShoe, shoeController.addShoe);

// Lấy danh sách
router.get('/', shoeController.getShoes);

// Cập nhật
router.put('/:model', validateShoe, shoeController.updateShoe);

// Xóa
router.delete('/:model', shoeController.deleteShoe);

module.exports = router;