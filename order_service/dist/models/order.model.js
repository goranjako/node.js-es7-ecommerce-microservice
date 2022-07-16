"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const Schema = _mongoose.default.Schema;
const OrderSchema = new Schema({
  user: {
    type: String,
    required: [true, "User  is required"]
  },
  products: {
    type: String,
    required: [true, "Products is required"]
  },
  quantity: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var _default = _mongoose.default.model("Order", OrderSchema);

exports.default = _default;