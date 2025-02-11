import { useGetProductsQuery } from '../slices/productsAPISlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import NotFound from './NotFound';
import Pagination from '../components/Pagination';
import { Product } from '../types';
import { useParams, useNavigate } from 'react-router-dom';
import TopProducts from '../components/TopProducts';
import { Helmet } from 'react-helmet';

export default function Products() {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductsQuery({
    pageNumber: pageNumber || '1',
  });

  const handlePageChange = (page: number) => {
    navigate(`/page/${page}`);
  };

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Welcome to the home page of my app."
        />
      </Helmet>
      <h1 className="text-2xl text-slate-950  font-bold mt-6 mx-5 underline">
        Featured Product
      </h1>
      <TopProducts />
      <h1 className="text-2xl text-slate-950 font-bold text-left my-6 underline">
        Latest Products
      </h1>
      <div className="flex flex-wrap -mx-2">
        {data.products?.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination
        pages={data.pages}
        page={data.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
