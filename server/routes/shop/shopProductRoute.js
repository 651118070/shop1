import express from 'express'

import * as products from '../../controllers/shop/ProductController.js'
const shopProduct = express.Router();

shopProduct.get("/", products.getFilteredProducts);
shopProduct.get("/:id", products.getProductDetails);

export default shopProduct
