import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import products from '../products.ts';
import connectDB from '../db.ts';
connectDB();
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
