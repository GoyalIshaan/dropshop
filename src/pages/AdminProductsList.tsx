import React, { useState } from 'react';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../slices/productsAPISlice';
import Loader from '../components/Loader';
import { Product } from '../types';
import { toast } from 'react-toastify';
import ProductEdit from './AdminProductEdit';
import AdminOrderListItem from '../components/AdminOrderListItem';

const ProductList: React.FC = () => {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const handleEdit = (id: string) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      await refetch();
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleCreate = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct().unwrap();
        await refetch();
        toast.success('Product created successfully');
      } catch (error) {
        toast.error('Failed to create product');
      }
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    setSelectedProductId(null);
    await refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !products) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-4xl">
          <FaTrashAlt className="inline" />
        </div>
        <div className="ml-2 text-xl">Products not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Product List</h2>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={isCreating}
        >
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>
      <ul className="space-y-4">
        {products.map((product: Product) => (
          <AdminOrderListItem
            key={product._id}
            product={product}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>

      {showModal && selectedProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <ProductEdit
              productId={selectedProductId}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
