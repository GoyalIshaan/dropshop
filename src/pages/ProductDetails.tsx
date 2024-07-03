import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillTag } from 'react-icons/ai';
import { MdCategory } from 'react-icons/md';
import Loader from '../components/Loader';
import NotFound from './NotFound';
import { useGetProductsDetailsQuery } from '../slices/productsAPISlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import Quantity from '../components/Quantity';
import Rating from '../components/Rating';
import ReviewSection from '../components/Review';
import { Helmet } from 'react-helmet';

const ProductDetails: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductsDetailsQuery(id);
  const commonStyle: string = 'flex items-center text-lg';

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: quantity }));
  };

  if (isLoading) return <Loader />;
  if (error || !product) return <NotFound />;

  return (
    <div className="container mt-8 mx-auto p-4 flex flex-col gap-8">
      <Helmet>
        <title>{product.name}</title>
        <meta
          name="description"
          content="Welcome to the home page of my app."
        />
      </Helmet>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`../../${product.image}`}
          alt={product.name}
          className="md:w-1/2 rounded-lg shadow-lg"
        />

        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className={commonStyle}>{product.description}</p>
          <p className={commonStyle}>
            <AiFillTag className="mr-2" />
            Brand: {product.brand}
          </p>
          <p className={commonStyle}>
            <MdCategory className="mr-2" />
            Category: {product.category}
          </p>
          <p className="text-2xl font-semibold">Price: ${product.price}</p>
          <p>
            Stock:{' '}
            {product.countInStock > 0 ? (
              `${product.countInStock} in stock`
            ) : (
              <span className="text-red-500 font-bold">Out of Stock</span>
            )}
          </p>
          <div className={commonStyle}>
            <Rating rating={product.rating} />
            <span className="ml-2">({product.numReviews} reviews)</span>
          </div>
          {product.countInStock > 0 && (
            <div className="flex items-center">
              <div className="mr-4">
                <Quantity
                  product={product}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
              <button
                className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                onClick={addToCartHandler}
              >
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <ReviewSection productId={id ?? ''} />
    </div>
  );
};

export default ProductDetails;
