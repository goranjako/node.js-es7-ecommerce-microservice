"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _product = _interopRequireDefault(require("../models/product"));

class ProductService {
  static async getAll() {
    try {
      return await _product.default.find();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const product = await _product.default.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(data) {
    try {
      const product = new _product.default(data);
      return await product.save();
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const product = await _product.default.findById({
        _id: id
      }).exec();
      product.set(data);
      const result = await product.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await _product.default.deleteOne(id);
    } catch (error) {
      throw error;
    }
  }

}

var _default = ProductService;
exports.default = _default;