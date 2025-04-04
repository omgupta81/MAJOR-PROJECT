const express = require("express");
const router = express.Router();
const wrapASsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const review = require("../models/review.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index and create together using router.route

router
  .route("/")
  .get(wrapASsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapASsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show and update and delete
router
  .route("/:id")
  .get(wrapASsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapASsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapASsync(listingController.destroyListing));

//Show Route
// router
//   .get("/:id", wrapASsync(listingController.showListing))
//   .put(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapASsync(listingController.updateListing)
//   );

//Create Route
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapASsync(listingController.createListing)
// );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapASsync(listingController.renderEditForm)
);

//Index Route
//router.get("/", wrapASsync(listingController.index));

//Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapASsync(listingController.updateListing)
// );

//Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapASsync(listingController.destroyListing)
// );

module.exports = router;
