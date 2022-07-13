"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _product = _interopRequireDefault(require("../services/product.sevice"));

class ProductController {
  // Get all
  async getAll(req, res) {
    try {
      const docs = await _product.default.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  } // Insert


  async create(req, res, next) {
    try {
      const product = {
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency,
        quantity: req.body.quantity
      };
      const obj = await _product.default.addProduct(product);
      return res.status(200).json({
        success: true,
        message: " Product is Created successfully."
      });
    } catch (err) {
      res.status(422).json(err.message);
    }
  } // Get by id


  async get(req, res) {
    try {
      const obj = await _product.default.getById({
        _id: req.params.id
      });

      if (obj) {
        return res.status(200).json(obj);
      } else {
        return res.status(400).json({
          error: "Product not found"
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Product not found"
      });
    }
  } // Update by id


  async put(req, res) {
    const data = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      quantity: req.body.quantity
    };
    const id = req.params.id;

    try {
      const product = await _product.default.update(id, data);
      return res.status(200).json({
        success: true,
        message: " Product is Updated successfully."
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Product does not exist!"
      });
    }
  } // Delete by id


  async delete(req, res) {
    try {
      await _product.default.delete({
        _id: req.params.id
      });
      return res.json({
        success: true,
        message: " Product is Deleted successfully."
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Product does not exist!"
      });
    }
  }

}

var _default = new ProductController();

exports.default = _default;