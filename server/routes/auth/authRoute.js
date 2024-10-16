import express from 'express'
import * as authenticate from '../../controllers/auth/authController.js'
import { authMiddleware } from '../../controllers/auth/authController.js';
const auth = express.Router();
auth.post('/signup',authenticate.registerUser)
auth.post('/signin',authenticate.loginUser)
auth.post('/signout',authenticate.logoutUser)

auth.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user
  });
});
export default auth

