"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const Schema = _mongoose.default.Schema;
const ProductSchema = new Schema({
  code: {
    type: Number,
    required: [true, 'Code is required']
  },
  name: {
    type: String,
    required: [true, "Product name is required"]
  },
  description: {
    type: String,
    required: [true, "Product description is required"]
  },
  price: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    required: true //enum: ["$", "€"],
    // default: "$",

  },
  quantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var _default = _mongoose.default.model("Product", ProductSchema);

exports.default = _default;