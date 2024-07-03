import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from '../slices/productsAPISlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { FaTimesCircle } from 'react-icons/fa';
import Input from '../components/AdminProductEditInput';
import { Product } from '../types';

interface ProductEditProps {
  productId: string;
  onClose: () => void;
}

const ProductEdit: React.FC<ProductEditProps> = ({ productId, onClose }) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductsDetailsQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      image: '',
      brand: '',
      category: '',
      countInStock: 0,
      description: '',
    },
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data: Partial<Product>) => {
    try {
      const res = await updateProduct({ id: productId, ...data }).unwrap();
      console.log(res);
      setValue('image', res.imagePath);
      toast.success('Product updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await uploadImage(formData).unwrap();
        setValue('image', response.imagePath); // Update the form state with the image path
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload image');
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-4xl">
          <FaTimesCircle className="inline" />
        </div>
        <div className="ml-2 text-xl">Product not found</div>
      </div>
    );
  }

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="name"
            label="Name"
            type="text"
            register={register}
            required={true}
            errors={errors}
          />
          <Input
            id="price"
            label="Price"
            type="number"
            register={register}
            required={true}
            errors={errors}
          />
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              id="image"
              type="text"
              {...register('image', { required: 'Image is required' })}
              className="block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              readOnly
            />
            <input
              type="file"
              onChange={handleImageUpload}
              className="block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          <Input
            id="brand"
            label="Brand"
            type="text"
            register={register}
            required={true}
            errors={errors}
          />
          <Input
            id="category"
            label="Category"
            type="text"
            register={register}
            required={true}
            errors={errors}
          />
          <Input
            id="countInStock"
            label="Count In Stock"
            type="number"
            register={register}
            required={true}
            errors={errors}
          />
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register('description', {
                required: 'Description is required',
              })}
              className="block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdating ? 'Updating' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
