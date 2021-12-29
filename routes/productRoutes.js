const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// HOT SELLING PRODUCTS
router.get('/hot-selling-products', productController.hotSellingProducts);

// DISCOUNT PRODUCTS
router.get('/discountProducts', productController.discountProducts);

// PRODUCTS
router.get('/:productId', productController.getProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
