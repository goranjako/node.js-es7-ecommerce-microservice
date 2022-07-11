"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRoutes;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./controllers/auth.controller"));

const {
  validateRegistrationBody,
  validateLoginBody,
  validate
} = require("./util/validation");

function setRoutes(app) {
  const router = _express.default.Router(); //authRoute


  router.post("/register", validateRegistrationBody(), validate, _auth.default.register);
  router.post("/login", validateLoginBody(), validate, _auth.default.login);
  app.use("/", router);
}