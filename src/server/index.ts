import express from 'express';
import dotenv from 'dotenv';
import productRouter from '../routes/productRoute.ts';
import { notFound, errorHandler } from '../middleware/errorMiddleware.ts';
import connectDB from '../db.ts';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/products', productRouter);
app.use(notFound);
app.use(errorHandler);

//starts the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
