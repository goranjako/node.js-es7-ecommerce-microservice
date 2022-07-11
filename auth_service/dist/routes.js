"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRoutes;

var _express = _interopRequireDefault(require("express"));

const {
  validateRegistrationBody,
  validateLoginBody,
  validate
} = require("./util/validation");

function setRoutes(app) {
  const router = _express.default.Router(); //authRoute


  router.post("/register", validateRegistrationBody(), validate, authController.register);
  router.post("/login", validateLoginBody(), validate, authController.login);
  app.use("/", router);
}