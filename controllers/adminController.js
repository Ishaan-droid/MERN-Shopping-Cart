const Product = require('../models/productModel');
const helpers = require('./helpers/helper');

// ADD PRODUCT

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    helpers.serverResponse(res, 'Success', 201, undefined, product);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 400, 'Cannot add product right now.');
    next(err);
  }
};

// UPDATE PRODUCT

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      useFindAndModify: false,
    });
    helpers.serverResponse(res, 'Success', 200, undefined, product);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 404, 'Product not found.');
    next(err);
  }
};

// DELETE PRODUCT

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(200).send('Product Deleted.');
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 404, 'Cannot delete product.');
    next(err);
  }
};
