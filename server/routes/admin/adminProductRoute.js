
import express from 'express';
import * as products from '../../controllers/admin/productsController.js'; 
import { upload } from '../../utils/cloudinary.js';
const adminProduct = express.Router()
adminProduct.post('/upload-image',upload.single('my_file'),products.handleImageUpload)
adminProduct.post("/add", products.addProduct);
adminProduct.put("/edit/:id", products.editProduct);
adminProduct.delete("/delete/:id",products.deleteProduct);
adminProduct.get("/",products.fetchAllProducts);
export default adminProduct

