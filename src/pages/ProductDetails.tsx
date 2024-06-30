import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { AiFillTag } from 'react-icons/ai';
import { MdCategory } from 'react-icons/md';
import Loader from '../components/Loader';
import NotFound from './NotFound';
import { useGetProductsDetailsQuery } from '../slices/productsAPISlice';
import { Product } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductsDetailsQuery(id) as {
    data: Product | undefined;
    error: Error | null;
    isLoading: boolean;
  };

  if (isLoading) return <Loader />;
  if (error || !product) return <NotFound />;

  // Function to render star ratings
  const renderRating = (rating: number) => {
    const totalStars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        totalStars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        totalStars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        totalStars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return totalStars;
  };

  return (
    <div className="container mt-8 mx-auto p-4 flex flex-col md:flex-row gap-8">
      <img
        src={`../../${product.image}`}
        alt={product.name}
        className="md:w-1/2 rounded-lg shadow-lg"
      />

      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="flex items-center text-lg">{product.description}</p>
        <p className="flex items-center text-lg">
          <AiFillTag className="mr-2" />
          Brand: {product.brand}
        </p>
        <p className="flex items-center text-lg">
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
        <div className="flex items-center text-lg">
          {renderRating(product.rating)}
          <span className="ml-2">({product.numReviews} reviews)</span>
        </div>
        {product.countInStock > 0 && (
          <button className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center">
            <FiShoppingCart className="mr-2" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
