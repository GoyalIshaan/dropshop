import React from 'react';
import { useForm, Control } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { saveShippingAddress } from '../slices/cartSlice';
import { CartState, ShippingFormData } from '../types';
import ShippingInputField from '../components/ShippingInputField';
import {
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAmericas,
  FaMailBulk,
} from 'react-icons/fa';

const ShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart: CartState = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;

  const { control, handleSubmit } = useForm<ShippingFormData>({
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

  const buttonStyling: string =
    'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105';

  return (
    <div className="container mx-auto px-4 pb-12 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Shipping Address
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ShippingInputField
          name="address"
          control={control as Control<ShippingFormData>}
          label="Address"
          placeholder="Enter your address"
          icon={<FaMapMarkerAlt className="text-gray-400" />}
          requiredMessage="Address is required"
        />
        <ShippingInputField
          name="country"
          control={control as Control<ShippingFormData>}
          label="Country"
          placeholder="Enter your country"
          icon={<FaGlobeAmericas className="text-gray-400" />}
          requiredMessage="Country is required"
        />
        <ShippingInputField
          name="city"
          control={control as Control<ShippingFormData>}
          label="City"
          placeholder="Enter your city"
          icon={<FaCity className="text-gray-400" />}
          requiredMessage="City is required"
        />
        <ShippingInputField
          name="postalCode"
          control={control as Control<ShippingFormData>}
          label="Postal Code"
          placeholder="Enter your postal code"
          icon={<FaMailBulk className="text-gray-400" />}
          requiredMessage="Postal Code is required"
        />
        <div className="flex justify-between pt-4 space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className={`w-1/5 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 ${buttonStyling}`}
          >
            Back
          </button>
          <button
            type="submit"
            className={`flex-grow bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 ${buttonStyling}`}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;
