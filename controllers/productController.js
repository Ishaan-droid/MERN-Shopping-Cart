const Product = require('../models/productModel');
const helpers = require('./helpers/helper');

// HOT SELLING PRODUCTS
exports.hotSellingProducts = async (req, res) => {
  const products = await Product.find({ stock: { $lte: 5 } });
  helpers.serverResponse(res, 'Success', 200, undefined, products);
};

// DISCOUNT PRODUCTS
exports.discountProducts = async (req, res) => {
  const products = await Product.find({ discount: { $lte: 100 } });
  helpers.serverResponse(res, 'Success', 200, undefined, products);
};

// ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {
  try {
    const { sort, category } = req.query;
    let products;
    if (sort && !category) {
      products = await Product.find().sort(sort);
    } else if (category && !sort) {
      products = await Product.find({ category });
    } else if (sort && category) {
      products = await Product.find({ category }).sort(sort);
    } else {
      products = await Product.find();
    }

    helpers.serverResponse(res, 'Success', 200, undefined, products);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 400, 'Please try again.');
    next(err);
  }
};

// SINGLE PRODUCT
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).populate('reviews');
    const { reviews } = product;

    if (reviews.length > 0) {
      product.ratings = (
        reviews.reduce((acc, cur) => (acc += cur.rating), 0) / reviews.length
      ).toFixed(1);
      await product.save();
    }

    helpers.serverResponse(res, 'Success', 200, undefined, product);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 404, 'Product not found.');
    next(err);
  }
};
