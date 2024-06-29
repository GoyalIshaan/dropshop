import { useEffect, useState } from 'react';
import Product from '../components/ProductCard';

type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export default function HomePage() {
  // Use the interface to type your state
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      const json = JSON.parse(data);
      setProducts(json);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6 underline">
        Latest Products
      </h1>
      <div className="flex flex-wrap -mx-2">
        {products.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
