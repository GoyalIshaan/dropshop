import express from 'express';
import dotenv from 'dotenv';
import productRouter from '../routes/productRoute';
import userRouter from '../routes/userRoutes';
import orderRouter from '../routes/orderRoutes';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from '../middleware/errorMiddleware';
import connectDB from '../db';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

//middleware to parse cookies
app.use(cookieParser());

//middleware to parse json data
app.use(express.json());
//middleware to parse url encoded data
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//middleware to get paypal client id
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID }),
);

//Error Hnadling Middleware
app.use(notFound);
app.use(errorHandler);

//starts the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
