import express from 'express';
import { getAllTransaction, getOneTransaction } from '../controllers/transaction-controller.js';

const transactionRouter = express.Router();

transactionRouter.get('/transaction/:id', getOneTransaction);
transactionRouter.get('/transaction', getAllTransaction);
transactionRouter.put('/transaction/:id');

export default transactionRouter;
