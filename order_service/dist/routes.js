"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRoutes;

var _express = _interopRequireDefault(require("express"));

var _order = _interopRequireDefault(require("./controllers/order.controller"));

const {
  validateRegistrationBody,
  validateLoginBody,
  validateProductBody,
  validateOrderBody,
  validate
} = require('./util/validation');

function setRoutes(app) {
  const router = _express.default.Router();

  router.get("/orders", _order.default.getAll); //productRoute

  app.use('/', router);
}