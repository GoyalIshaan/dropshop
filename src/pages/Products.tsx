import { useGetProductsQuery } from '../slices/productsAPISlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import NotFound from './NotFound';
import { Product } from '../types';

export default function Products() {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6 underline">
        Latest Products
      </h1>
      <div className="flex flex-wrap -mx-2">
        {data?.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
