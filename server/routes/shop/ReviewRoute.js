import express from 'express'
import * as Reviews from '../../controllers/shop/ProductReview.js' 

export const review = express.Router();

review.post("/add", Reviews.addProductReview);
review.get("/:productId", Reviews.getProductReviews);

