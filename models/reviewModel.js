const mongoose = require('mongoose');
//const validator = require('validator');
//const User = require('./userModel');
//const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
      maxlength: [500, 'Should not more than 500 charactors'],
    },
    raiting: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    reviewChangedAt: { type: Date },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must have a user'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must have a tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    //here this always points to current quarry.
    path: 'user',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
