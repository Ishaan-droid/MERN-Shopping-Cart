const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
