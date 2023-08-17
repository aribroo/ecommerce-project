import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from '../controllers/product-controller.js';
import upload from '../middleware/upload-middleware.js';

const productRouter = express.Router();

productRouter.post('/api/products', upload.single('image'), createProduct);
productRouter.get('/api/products/', getAllProducts);
productRouter.get('/api/products/:id', getOneProduct);
productRouter.put('/api/products/:id', upload.single('image'), updateProduct);
productRouter.delete('/api/products/:id', deleteProduct);

export { productRouter };
