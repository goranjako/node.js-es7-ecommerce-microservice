"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user"));

class AuthService {
  //reister service
  static async register(data) {
    try {
      const user = new _user.default(data);
      const obj = await user.save();
      return obj;
    } catch (error) {
      throw error;
    }
  }

}

var _default = AuthService;
exports.default = _default;