import express from 'express'

import * as Address from '../../controllers/shop/AddressController.js'

export const address = express.Router();

address.post("/add",Address.addAddress);
address.get("/get/:userId", Address.fetchAllAddress);
address.delete("/delete/:userId/:addressId", Address.deleteAddress);
address.put("/update/:userId/:addressId", Address.editAddress);


