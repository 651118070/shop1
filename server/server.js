import { config } from "dotenv";
import express from "express";
const app = express();
import { connectDB } from "./utils/connect.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import allowedOrigins from "./utils/allowedOrigins.js";
import auth from "./routes/auth/authRoute.js";
import adminProduct from "./routes/admin/adminProductRoute.js";
import shopProduct from "./routes/shop/shopProductRoute.js";
import { cart } from "./routes/shop/CartRoute.js";
import { address } from "./routes/shop/AddressRoute.js";
import { order } from "./routes/shop/OrderRoute.js";
import { search } from "./routes/shop/SearchRoute.js";
import { orders } from "./routes/admin/orderRoute.js";
import { Feature } from "./routes/common/featureRoute.js";
import { review } from "./routes/shop/ReviewRoute.js";
const corpsOtions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSucessStatus: 200,
  credentials: true,
};
app.use(cors({
  origin: 'https://mboashopsite.onrender.com', 
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", auth);
app.use('/admin/products',adminProduct)
app.use('/admin/orders',orders)
app.use('/shop/products',shopProduct)
app.use('/shop/cart',cart)
app.use('/shop/address',address)
app.use('/shop/order',order)
app.use('/shop/search',search)
app.use('/shop/review',review)
app.use('/common/feature',Feature)
app.use(express.urlencoded({ extended: false }));
config();
const PORT = process.env.PORT || 443;
connectDB(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});


