const {
  body,
  validationResult,
  buildCheckFunction,
} = require("express-validator");

const validateRegistrationBody = () => {
  return [
    body("userName")
      .trim()
      .exists()
      .withMessage("userName field is required")
      .isLength({ min: 3 })
      .withMessage("name must be greater than 3 letters"),
    body("email")
      .exists()
      .withMessage("email field is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .exists()
      .withMessage("password field is required")
      .isLength({ min: 8, max: 12 })
      .withMessage("password must be in between 8 to 12 characters long"),
  ];
};
const validateLoginBody = () => {
  return [
    body("email")
      .trim()
      .exists()
      .withMessage("email field is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .exists()
      .withMessage("password field is required")
      .isLength({ min: 8, max: 12 })
      .withMessage("password must be in between 8 to 12 characters long"),
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
  validateRegistrationBody,
  validateLoginBody,
  validate,
};
