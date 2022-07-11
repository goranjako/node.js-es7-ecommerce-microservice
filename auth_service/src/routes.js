import express from "express";
import authController from "./controllers/auth.controller";
const {
  validateRegistrationBody,
  validateLoginBody,
  validate
} = require("./util/validation");
export default function setRoutes(app) {
  const router = express.Router();
  //authRoute
  router.post("/register",validateRegistrationBody(), validate,authController.register);
  router.post("/login", validateLoginBody(), validate, authController.login);
  app.use("/", router);
}
