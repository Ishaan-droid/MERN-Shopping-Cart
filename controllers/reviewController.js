const Review = require('../models/reviewModel');
const helpers = require('./helpers/helper');

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate({ path: 'user', select: 'name' });
    helpers.serverResponse(res, 'Success', 200, undefined, reviews);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 400, 'Unable to get all reviews.');
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { user } = req.body;

    // EXTRA AUTHENTICATION
    if (user !== req.user._id.toString()) {
      helpers.serverError('Fail', 400, 'Invalid user. Log in again.');
      return next(err);
    }

    const review = await Review.create(req.body);
    helpers.serverResponse(res, 'Success', 201, undefined, review);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 400, 'You have already reviewed this product.');
    next(err);
  }
};
