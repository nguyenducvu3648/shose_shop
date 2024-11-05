const express = require('express');
const router = express.Router();
const { 
    createTour,
    getAllTours,
    getTourById,
    updateTour,
    deleteTour
} = require('../controllers/tourController');
const { tourValidation } = require('../middleware/validators');

router.post('/', tourValidation, createTour);
router.get('/', getAllTours);
router.get('/:id', getTourById);
router.patch('/:id', tourValidation, updateTour);
router.delete('/:id', deleteTour);

module.exports = router;

