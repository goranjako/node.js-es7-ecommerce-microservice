"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../services/auth.service"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

class Auth {
  //register
  async register(req, res) {
    try {
      if (!req.body.userName || !req.body.password) {
        res.json({
          success: false,
          msg: "Please pass username and password."
        });
      } else {
        const newUser = {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password
        };
        const user = await _auth.default.register(newUser);

        const token = _jsonwebtoken.default.sign(user.toJSON(), process.env.SECRET_TOKEN, {
          expiresIn: "1h"
        }); //Send the jwt in the response


        return res.status(200).send({
          success: true,
          msg: "You are successfully register",
          token: token
        });
      }
    } catch (err) {
      res.status(422).json({
        success: false,
        msg: "User already exists."
      });
    }
  } //login


  login(req, res) {
    _user.default.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = _jsonwebtoken.default.sign(user.toJSON(), process.env.SECRET_TOKEN, {
              expiresIn: "10m"
            }); // return the information including token as JSON


            return res.json({
              success: true,
              msg: "Successful login",
              token: token
            });
          } else {
            return res.status(422).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    });
  }

}

var _default = new Auth();

exports.default = _default;