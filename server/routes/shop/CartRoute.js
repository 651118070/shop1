import express from 'express'

import * as carts from '../../controllers/shop/CartController.js'

export const cart = express.Router();

cart.post("/add", carts.addToCart);
cart.get("/get/:userId", carts.fetchCartItems);
cart.put("/update-cart",carts.updateCartItemQty);
cart.delete("/:userId/:productId", carts.deleteCartItem);


