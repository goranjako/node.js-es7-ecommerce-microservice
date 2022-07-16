"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _order = _interopRequireDefault(require("../services/order.service"));

class OrderController {
  // Insert
  async create(req, res) {
    try {
      let data = req.body;
      await _order.default.Create("Order", data);
      await _order.default.Consume("Product", res);
    } catch (error) {
      res.status(422).json(error.message);
    }
  }

}

var _default = new OrderController();

exports.default = _default;