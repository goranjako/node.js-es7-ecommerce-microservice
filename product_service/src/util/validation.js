import { check, validationResult } from "express-validator";

const validateProductBody = () => {
  return [
    check("code")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("Code field is required"),
    check("name").notEmpty().withMessage("Name field is required"),
    check("description")
      .notEmpty()
      .withMessage("Description field is required")
      .isLength({ min: 10, max: 50 })
      .withMessage("Description must be in between 10 to 50 characters long"),
    check("price")
      .notEmpty()
      .isNumeric()
      .withMessage("Price field is required"),
    check("quantity")
      .notEmpty()
      .isNumeric()
      .withMessage("Quantity field is required"),
  ];
};

const validateOrderBody = () => {
  return [
    [
      check("user", "User field is required").notEmpty(),
      check("products", "Prosduct field is required").notEmpty(),
      check("totalPrice", "Please enter a Totalprice").notEmpty(),
      check("quantity", "Quantity field is required").notEmpty(),
    ],
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateProductBody,
  validateOrderBody,
  validate,
};
