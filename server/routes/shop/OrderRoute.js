import express from 'express'

import * as Orders from '../../controllers/shop/OrderController.js'

export const order = express.Router();

order.post("/create", Orders.createOrder);
order.post("/capture", Orders.capturePayment);
order.get("/list/:userId", Orders.getAllOrdersByUser);
order.get("/details/:id", Orders.getOrderDetails);


