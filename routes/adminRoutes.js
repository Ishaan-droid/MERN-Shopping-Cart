const express = require('express');
const protectController = require('../controllers/protectController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post(
  '/addProduct',
  protectController.routeProtect,
  protectController.verifyAdmin,
  adminController.addProduct
);

// UPDATE
router.patch(
  '/updateProduct/:productId',
  protectController.routeProtect,
  protectController.verifyAdmin,
  adminController.updateProduct
);

// DELETE
router.delete(
  '/deleteProduct/:productId',
  protectController.routeProtect,
  protectController.verifyAdmin,
  adminController.deleteProduct
);

module.exports = router;
