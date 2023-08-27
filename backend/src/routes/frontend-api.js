import express from 'express';
import { getProductHomepage, productDetails, searchProducts, addToCart, getCart, updateCart, deleteCart, checkout, getImage } from '../controllers/frontend-controller.js';

const frontendRouter = express.Router();

frontendRouter.get('/frontend/', getProductHomepage);
frontendRouter.get('/frontend/product/', searchProducts);
frontendRouter.get('/frontend/product/detail/:url', productDetails);
frontendRouter.get('/frontend/image/:imageName', getImage);

frontendRouter.post('/frontend/cart', addToCart);
frontendRouter.get('/frontend/cart/', getCart);
frontendRouter.put('/frontend/cart/:id', updateCart);
frontendRouter.delete('/frontend/cart/:id', deleteCart);

frontendRouter.post('/frontend/checkout/', checkout);

export default frontendRouter;
