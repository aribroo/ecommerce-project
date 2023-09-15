import express from 'express';
import { get, logout } from '../controllers/user-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import { addToCart, getCart, updateCart, deleteCart, checkout } from '../controllers/frontend-controller.js';
import { getOneTransaction, getAllTransaction } from '../controllers/transaction-controller.js';
const userRouter = express.Router();

// auth middleware
userRouter.use(authMiddleware);

// user handler
userRouter.get('/api/user/profile', get);
userRouter.delete('/api/user/logout', logout);

// frontend handler
userRouter.post('/frontend/cart', addToCart);
userRouter.get('/frontend/cart', getCart);
userRouter.put('/frontend/cart/:id', updateCart);
userRouter.delete('/frontend/cart/:id', deleteCart);

userRouter.post('/frontend/checkout', checkout);

// transaction handler
userRouter.get('/transaction/:id', getOneTransaction);
userRouter.get('/transactions', getAllTransaction);
// userRouter.put('/transaction/:id');

export default userRouter;
