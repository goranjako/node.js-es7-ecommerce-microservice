"use strict";

var _expressValidator = require("express-validator");

const validateProductBody = () => {
  return [(0, _expressValidator.check)("code").trim().notEmpty().isNumeric().withMessage("Code field is required"), (0, _expressValidator.check)("name").notEmpty().withMessage("Name field is required"), (0, _expressValidator.check)("description").notEmpty().withMessage("Description field is required").isLength({
    min: 10,
    max: 50
  }).withMessage("Description must be in between 10 to 50 characters long"), (0, _expressValidator.check)("price").notEmpty().isNumeric().withMessage("Price field is required"), (0, _expressValidator.check)("quantity").notEmpty().isNumeric().withMessage("Quantity field is required")];
};

const validateOrderBody = () => {
  return [[(0, _expressValidator.check)("user", "User field is required").notEmpty(), (0, _expressValidator.check)("products", "Prosduct field is required").notEmpty(), (0, _expressValidator.check)("totalPrice", "Please enter a Totalprice").notEmpty().isNumeric(), (0, _expressValidator.check)("quantity", "Quantity field is required").notEmpty().isNumeric()]];
};

const validate = (req, res, next) => {
  const errors = (0, _expressValidator.validationResult)(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }));
  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  validateProductBody,
  validateOrderBody,
  validate
};