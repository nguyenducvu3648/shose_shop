// controllers/tourController.js
const Tour = require('../models/Tour');
const { validationResult } = require('express-validator');
console.log(Tour);  



exports.createTour = async (req, res) => {
    try {
      
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

    
        const tour = await Tour.create(req.body);
        res.status(201).json({
            success: true,
            data: tour
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllTours = async (req, res) => {
    try {
        // Kiểm tra xem Tour có là một mô hình hợp lệ không
        
        const tours = await Tour.find(); // Lấy tất cả các tour
        console.log('tours',tours);
        
        // Kiểm tra nếu không có dữ liệu
        if (tours.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tours found'
            });
        }

        res.status(200).json({
            success: true,
            count: tours.length,
            data: tours
        });
    } catch (error) {
        console.error('Error occurred while fetching tours:', error); // Log chi tiết lỗi
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Lấy tour theo ID
exports.getTourById = async (req, res) => {
    try {
        // Lấy tour theo ID
        const tour = await Tour.findById(req.params.id);
        
        // Nếu không tìm thấy tour
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        // Trả về dữ liệu tour dưới dạng JSON
        res.status(200).json({
            success: true,
            data: tour
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Cập nhật tour
exports.updateTour = async (req, res) => {
    try {
        // Cập nhật tour theo ID
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Nếu không tìm thấy tour
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        // Trả về tour đã được cập nhật
        res.status(200).json({
            success: true,
            data: tour
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Xóa tour
exports.deleteTour = async (req, res) => {
    try {
        // Xóa tour theo ID
        const tour = await Tour.findByIdAndDelete(req.params.id);

        // Nếu không tìm thấy tour
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        // Trả về thông báo xóa thành công
        res.status(204).json({
            success: true,
            message: 'Tour deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
