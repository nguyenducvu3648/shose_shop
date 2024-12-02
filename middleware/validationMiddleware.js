const { body, validationResult } = require('express-validator');

exports.validateShoe = [
  body('name').notEmpty().withMessage('Name is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('imgAddress').notEmpty().withMessage('Image address is required'),
  body(' modelColor').notEmpty().withMessage('Model color is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];