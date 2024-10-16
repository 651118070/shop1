import express from 'express'
import * as Orders from '../../controllers/admin/orderController.js'

export const orders= express.Router();

orders.get("/get", Orders.getAllOrdersOfAllUsers);
orders.get("/details/:id", Orders.getOrderDetailsForAdmin);
orders.put("/update/:id", Orders.updateOrderStatus);


