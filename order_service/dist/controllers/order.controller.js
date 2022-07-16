"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _order = _interopRequireDefault(require("../services/order.service"));

class OrderController {
  // Get all
  async getAll(req, res) {
    try {
      const docs = await _order.default.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  } // Get by id


  async get(req, res) {
    try {
      const obj = await _order.default.getById({
        _id: req.params.id
      });

      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({
          error: "order not found"
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "order not found"
      });
    }
  } // Update by id


  async put(req, res) {
    const data = {
      userId: req.body.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice
    };
    const id = req.params.id;

    try {
      const order = await _order.default.update(id, data);
      return res.status(200).json({
        success: true,
        message: " order is Updated successfully."
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "order does not exist!"
      });
    }
  } // Delete by id


  async delete(req, res) {
    try {
      await _order.default.delete({
        _id: req.params.id
      });
      return res.json({
        success: true,
        message: " order is Deleted successfully."
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "order does not exist!"
      });
    }
  }

}

var _default = new OrderController();

exports.default = _default;