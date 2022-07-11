const {
  body,
  validationResult,
  buildCheckFunction,
} = require("express-validator");


const validateProductBody = () => {
  return [
    body("code")
      .trim()
      .exists()
      .withMessage("Code field is required"),
    body("name")
      .exists()
      .withMessage("Name field is required"),
    body("description")
      .exists()
      .withMessage("Description field is required")
      .isLength({ min: 10, max: 50 })
      .withMessage("Description must be in between 10 to 50 characters long"),
    body("price")
      .exists()
      .withMessage("Price field is required"),
    body("quantity")
      .exists()
      .withMessage("Quantity field is required"),
  ];
};

const validateOrderBody = () => {
  return [
    body("owner")
      .trim()
      .exists()
      .withMessage("Owner field is required"),
    body("product")
      .exists()
      .withMessage("Products field is required"),
    body("quantity")
      .exists()
      .withMessage("Quantity field is required"),
    body("totalPrice")
      .exists()
      .withMessage("TotalPrice field is required")
 
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
