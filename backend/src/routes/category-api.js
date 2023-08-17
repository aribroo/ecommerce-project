import express from 'express';
import { createCategory, deleteCategory, getAllCategory, getOneCategory, updateCategory } from '../controllers/category-controller.js';

const categoryRouter = express.Router();

categoryRouter.post('/api/category', createCategory);
categoryRouter.get('/api/category', getAllCategory);
categoryRouter.get('/api/category/:id', getOneCategory);
categoryRouter.put('/api/category/:id', updateCategory);
categoryRouter.delete('/api/category/:id', deleteCategory);

export { categoryRouter };
