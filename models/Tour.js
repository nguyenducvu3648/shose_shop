// models/Tour.js
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour name is required'],
        trim: true,
        maxlength: [100, 'Tour name cannot exceed 100 characters']
    },
    destination: {
        type: String,
        required: [true, 'Destination is required']
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Max group size is required']
    },
    description: {
        type: String,
        trim: true
    },
    startDates: [{
        type: Date,
        default: Date.now
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export đúng mô hình Tour
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
