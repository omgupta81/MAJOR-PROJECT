const joi = require("joi");

module.exports.listingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required().allow(""),
      image: joi.string().uri().allow("", null),
      price: joi.number().required().min(0),
      location: joi.string().allow(""),
      country: joi.string().allow("").required(),
    })
    .required(),
});

module.exports.reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required().min(1).max(5),
      comment: joi.string().required(),
    })
    .required(),
});
