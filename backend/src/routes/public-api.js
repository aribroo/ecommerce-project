import { login, register } from '../controllers/user-controller.js';
import { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory } from '../controllers/category-controller.js';
import { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } from '../controllers/product-controller.js';
import { getProductHomepage, searchProducts, productDetails, getImage } from '../controllers/frontend-controller.js';
import express from 'express';
import upload from '../middleware/upload-middleware.js';

import { refreshToken } from '../controllers/refresh-token.js';
const publicRouter = express.Router();

// category handler
publicRouter.post('/api/category', createCategory);
publicRouter.get('/api/categories', getAllCategory);
publicRouter.get('/api/category/:id', getOneCategory);
publicRouter.put('/api/category/:id', updateCategory);
publicRouter.delete('/api/category/:id', deleteCategory);

// product handler
publicRouter.post('/api/product', upload.single('image'), createProduct);
publicRouter.get('/api/products/', getAllProducts);
publicRouter.get('/api/product/:id', getOneProduct);
publicRouter.put('/api/product/:id', upload.single('image'), updateProduct);
publicRouter.delete('/api/product/:id', deleteProduct);

// user handler
publicRouter.post('/api/user/register', register);
publicRouter.post('/api/user/login', login);
publicRouter.get('/api/token', refreshToken);

// frontend handler
publicRouter.get('/frontend', getProductHomepage);
publicRouter.get('/frontend/products/', searchProducts);
publicRouter.get('/frontend/product/:url', productDetails);
publicRouter.get('/frontend/image/:imageName', getImage);

export default publicRouter;
