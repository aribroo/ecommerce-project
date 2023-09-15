import errorMiddleware from '../middleware/error-middleware.js';
import publicRouter from '../routes/public-api.js';
import userRouter from '../routes/api.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);

export default app;
