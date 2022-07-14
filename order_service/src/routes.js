import express from 'express';
const {validateRegistrationBody,validateLoginBody,validateProductBody, validateOrderBody, validate} = require('./util/validation');
import orderController from './controllers/order.controller';

export default function setRoutes(app) {

const router = express.Router();
router.get("/orders", orderController.getAll);
//productRoute

app.use('/', router);
}