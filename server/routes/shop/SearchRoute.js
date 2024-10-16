import express from 'express'
import { searchProducts } from '../../controllers/shop/SearchController.js';


export const search = express.Router();

search.get("/:keyword", searchProducts);

