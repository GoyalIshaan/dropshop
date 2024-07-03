import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import productRouter from '../routes/productRoute.ts';
import userRouter from '../routes/userRoutes';
import orderRouter from '../routes/orderRoutes';
import uploadRouter from '../routes/uploadRoutes';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from '../middleware/errorMiddleware';
import connectDB from '../db';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON data
app.use(express.json());
// Middleware to parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

// Endpoint to get PayPal client ID
app.get('/api/config/paypal', (_req, res) =>
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID }),
);

// Making the uploads folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serving static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html')),
  );
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
