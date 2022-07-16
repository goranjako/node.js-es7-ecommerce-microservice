import express from 'express';
const {validateProductBody, validateOrderBody, validate} = require('./util/validation');
import ProductController from './controllers/product.controller';
import OrderController from './controllers/order.controller';
import authManager from './util/auth';
export default function setRoutes(app) {

const router = express.Router();

//productRoute

router.route('/product').post(authManager.verifyToken,validateProductBody(),validate,ProductController.create);
router.route('/product').get(authManager.verifyToken,ProductController.getAll);
router.route('/product/:id').get(authManager.verifyToken,ProductController.get);
router.route('/product/:id').put(authManager.verifyToken,validateProductBody(),validate,ProductController.put);
router.route('/product/:id').delete(authManager.verifyToken,ProductController.delete);
router.route('/orders').post( authManager.verifyToken,validateOrderBody(),validate,OrderController.create);
app.use('/', router);
}