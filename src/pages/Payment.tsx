import React from 'react';
import { useForm, Control } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { savePaymentMethod } from '../slices/cartSlice';
import PaymentMethod from '../components/PaymentMethod';
import { PaymentFormData } from '../types';

const PaymentPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentMethod } = useSelector((state: RootState) => state.cart);

  const paymentOptions: string[] = [
    'PayPal',
    'Stripe',
    'CreditCard',
    'DebitCard',
  ];
  const buttonStlying: string =
    'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105';

  const { handleSubmit, control } = useForm<PaymentFormData>({
    defaultValues: {
      paymentMethod,
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    dispatch(savePaymentMethod(data.paymentMethod));
    navigate('/checkout/placeorder');
  };

  const handleBack = () => {
    navigate('/checkout/shipping');
  };

  return (
    <div className="container mx-auto px-4 pb-12 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Payment Method
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <div className="space-y-4">
            {paymentOptions.map(method => (
              <PaymentMethod
                key={method}
                method={method}
                control={control as Control<PaymentFormData>}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between pt-4 space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className={
              `w-1/5  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 ` +
              buttonStlying
            }
          >
            Back
          </button>
          <button
            type="submit"
            className={
              `flex-grow bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500` +
              buttonStlying
            }
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
