"use strict";

const Joi = require("joi");

class Customer {
  createValidation = Joi.object({
    owner: Joi.string().email().required(),
    product: Joi.string().required().min(3),
    quantity: Joi.string(),
    totalPrice: Joi.string()
  });
  loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3)
  });
}

module.exports = new Customer();