const express = require('express');
const reviewController = require('../controllers/reviewController');
const protectController = require('../controllers/protectController');

const router = express.Router();

// ALL REVIEWS
router.get('/', reviewController.getAllReviews);

// CREATE REVIEW
router.post('/createReview', protectController.routeProtect, reviewController.createReview);

module.exports = router;
