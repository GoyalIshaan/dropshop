import { useNavigate } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsAPISlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '../types';

const TopProductsCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="w-full mb-8">
      <Slider {...settings}>
        {products?.map((product: Product) => (
          <div key={product._id} className="p-4">
            <div
              className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="w-full lg:w-1/2">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopProductsCarousel;
