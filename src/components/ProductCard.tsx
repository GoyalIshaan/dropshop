import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';

type ProductProps = {
  product: {
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
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className={`p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8 ${product.countInStock <= 0 ? 'opacity-50' : ''}`}
    >
      <div className="bg-gray-100 rounded shadow-lg p-4 h-full cursor-pointer transition duration-300 hover:shadow-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[250px] object-cover rounded-t"
        />
        <div className="p-2 flex flex-col justify-between h-[300px]">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 overflow-hidden text-ellipsis block max-h-[40px] mb-2">
            {product.description}
          </p>
          <p className="text-sm mb-1">Brand: {product.brand}</p>
          <p className="text-sm mb-1">Category: {product.category}</p>
          <p className="font-bold mb-1">${product.price}</p>
          <p
            className={`text-sm mb-1 ${product.countInStock <= 0 ? 'text-red-500' : ''}`}
          >
            {product.countInStock > 0
              ? `In stock: ${product.countInStock}`
              : 'Out of Stock'}
          </p>
          <div className="flex justify-start items-center mb-1">
            <Rating rating={product.rating} />
            <span className="ml-2 text-sm">({product.numReviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
