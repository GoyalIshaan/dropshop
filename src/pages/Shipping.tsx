import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAmericas,
  FaMailBulk,
} from 'react-icons/fa';
import { saveShippingAddress } from '../slices/cartSlice';
import { CartState } from '../types';

interface ShippingFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const ShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart: CartState = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    defaultValues: {
      address: shippingAddress?.address || '',
      city: shippingAddress?.city || '',
      postalCode: shippingAddress?.postalCode || '',
      country: shippingAddress?.country || '',
    },
  });

  const onSubmit = (data: ShippingFormData) => {
    dispatch(saveShippingAddress(data));
    navigate('/checkout/payment');
  };

  const handleBack = () => {
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 pb-12 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Shipping Address
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              {...register('address', { required: 'Address is required' })}
              type="text"
              className={`block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md 
                transition-all duration-200 ease-in-out
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                hover:border-indigo-300
                ${errors.address ? 'border-red-300' : ''}`}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaGlobeAmericas className="text-gray-400" />
            </div>
            <input
              {...register('country', { required: 'Country is required' })}
              type="text"
              className={`block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md 
                transition-all duration-200 ease-in-out
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                hover:border-indigo-300
                ${errors.country ? 'border-red-300' : ''}`}
              placeholder="Enter your country"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCity className="text-gray-400" />
            </div>
            <input
              {...register('city', { required: 'City is required' })}
              type="text"
              className={`block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md 
                transition-all duration-200 ease-in-out
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                hover:border-indigo-300
                ${errors.city ? 'border-red-300' : ''}`}
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMailBulk className="text-gray-400" />
            </div>
            <input
              {...register('postalCode', {
                required: 'Postal Code is required',
              })}
              type="text"
              className={`block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md 
                transition-all duration-200 ease-in-out
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                hover:border-indigo-300
                ${errors.postalCode ? 'border-red-300' : ''}`}
              placeholder="Enter your postal code"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-1/5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 
              hover:bg-gray-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              transition-all duration-200 ease-in-out
              transform hover:scale-105"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-grow flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
              hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition-all duration-200 ease-in-out
              transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;
