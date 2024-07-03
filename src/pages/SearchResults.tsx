import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsAPISlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import NotFound from './NotFound';
import Pagination from '../components/Pagination';
import { Product } from '../types';
import { Helmet } from 'react-helmet';

export default function SearchResults() {
  const { keyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPageNumber = parseInt(queryParams.get('page') || '1', 10);
  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const { data, error, isLoading } = useGetProductsQuery({
    pageNumber,
    keyword: keyword || '',
  });

  useEffect(() => {
    setPageNumber(initialPageNumber);
  }, [initialPageNumber]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
    navigate(`/search/${keyword}?page=${newPage}`);
  };

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Search for '{keyword}'</title>
        <meta
          name="description"
          content="Welcome to the home page of my app."
        />
      </Helmet>
      <h1 className="text-2xl font-bold text-center my-6 underline">
        Search Results for "{keyword}"
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
