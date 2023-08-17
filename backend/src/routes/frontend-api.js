import express from 'express';
import { getProductHomepage, productDetails, searchProducts, addToCart, getCart, updateCart, deleteCart, checkout } from '../controllers/frontend-controller.js';

const frontendRouter = express.Router();

frontendRouter.get('/frontend/', getProductHomepage);
frontendRouter.get('/frontend/product/', searchProducts);
frontendRouter.get('/frontend/product/detail/:url', productDetails);

frontendRouter.post('/frontend/cart', addToCart);
frontendRouter.get('/frontend/cart/', getCart);
frontendRouter.put('/frontend/cart/:id', updateCart);
frontendRouter.delete('/frontend/cart/:id', deleteCart);

frontendRouter.post('/frontend/checkout/', checkout);

export default frontendRouter;
