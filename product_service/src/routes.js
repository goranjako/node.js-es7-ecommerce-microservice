import express from 'express';
const {validateRegistrationBody,validateLoginBody,validateProductBody, validateOrderBody, validate} = require('./util/validation');
import authController from './controllers/auth.controller';
import ProductController from './controllers/product.controller';
import OrderController from './controllers/order.controller';
import authManager from './util/auth';
export default function setRoutes(app) {

const router = express.Router();
//authRoute
router.post("/register", validateRegistrationBody(),validate, authController.register);
router.post("/login", validateLoginBody(), validate,authController.login);
//productRoute
router.route('/product').post(authManager.verifyToken,validateProductBody(),validate,ProductController.create);
router.route('/product').get(authManager.verifyToken,ProductController.getAll);
router.route('/product/:id').get(authManager.verifyToken,ProductController.get);
router.route('/product/:id').put(authManager.verifyToken,validateProductBody(),validate,ProductController.put);
router.route('/product/:id').delete(authManager.verifyToken,ProductController.delete);

//orderRoute
router.route('/order').post(authManager.verifyToken,validateOrderBody(),validate, OrderController.create);
router.route('/order').get(authManager.verifyToken,OrderController.getAll);
router.route('/order/:id').get(authManager.verifyToken,OrderController.get);
router.route('/order/:id').put(authManager.verifyToken,validateOrderBody(),validate,OrderController.put);
router.route('/order/:id').delete(authManager.verifyToken,OrderController.delete);

app.use('/', router);
}