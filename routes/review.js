const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapASsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//post review route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapASsync(reviewController.createReview)
);

//delete route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapASsync(reviewController.destroyReview)
);

module.exports = router;
