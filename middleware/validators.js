const { check } = require('express-validator');

exports.tourValidation = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tour name is required')
        .isLength({ max: 100 })
        .withMessage('Tour name cannot exceed 100 characters'),
    check('destination')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Destination is required'),
    check('duration')
        .isNumeric()
        .withMessage('Duration must be a number')
        .not()
        .isEmpty()
        .withMessage('Duration is required'),
    check('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .not()
        .isEmpty()
        .withMessage('Price is required'),
    check('maxGroupSize')
        .isNumeric()
        .withMessage('Max group size must be a number')
        .not()
        .isEmpty()
        .withMessage('Max group size is required')
];