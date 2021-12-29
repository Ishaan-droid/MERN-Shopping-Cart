const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'A name is required'],
    },
    summary: {
      type: String,
      require: [true, 'A summary is required'],
    },
    image: {
      type: String,
      required: [true, 'An image is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    category: {
      type: String,
      enum: ['Vegetarian', 'Non-Vegetarian'],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    addedAt: {
      type: Date,
      default: Date.now(),
    },
    currentPrice: {
      type: Number,
      required: [true, 'Price is required'],
    },
    discount: Number,
    originalPrice: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('reviews', {
  ref: 'review',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
