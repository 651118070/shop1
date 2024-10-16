import express from 'express'

const { searchProducts } = require("../../controllers/shop/search-controller");

export const search = express.Router();

search.get("/:keyword", searchProducts);

