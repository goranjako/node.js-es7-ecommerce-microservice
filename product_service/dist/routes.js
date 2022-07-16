"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRoutes;

var _express = _interopRequireDefault(require("express"));

var _product = _interopRequireDefault(require("./controllers/product.controller"));

var _order = _interopRequireDefault(require("./controllers/order.controller"));

var _auth = _interopRequireDefault(require("./util/auth"));

const {
  validateProductBody,
  validateOrderBody,
  validate
} = require('./util/validation');

function setRoutes(app) {
  const router = _express.default.Router(); //productRoute


  router.route('/product').post(_auth.default.verifyToken, validateProductBody(), validate, _product.default.create);
  router.route('/product').get(_auth.default.verifyToken, _product.default.getAll);
  router.route('/product/:id').get(_auth.default.verifyToken, _product.default.get);
  router.route('/product/:id').put(_auth.default.verifyToken, validateProductBody(), validate, _product.default.put);
  router.route('/product/:id').delete(_auth.default.verifyToken, _product.default.delete);
  router.route('/order').post(validateOrderBody(), validate, _order.default.create);
  app.use('/', router);
}