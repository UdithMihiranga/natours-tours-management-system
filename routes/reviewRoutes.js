const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.addReiew
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    //authController.protect,
    //authController.restrictTo('admin', 'lead-guide'),
    reviewController.deleteReview
  )
  .patch(reviewController.updateReview);

module.exports = router;
