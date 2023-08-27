import express from 'express';
import cors from 'cors';
import { productRouter } from '../routes/product-api.js';
import { categoryRouter } from '../routes/category-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import frontendRouter from '../routes/frontend-api.js';
import transactionRouter from '../routes/transaction-api.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRouter);
app.use(categoryRouter);
app.use(frontendRouter);
app.use(transactionRouter);
app.use(errorMiddleware);

export default app;
