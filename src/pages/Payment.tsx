import React from 'react';
import { useForm, Control } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { savePaymentMethod } from '../slices/cartSlice';
import PaymentMethod from '../components/PaymentMethod';
import { PaymentFormData } from '../types';
import CheckOutButtons from '../components/CheckOutButtons';

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

  const { handleSubmit, control } = useForm<PaymentFormData>({
    defaultValues: {
      paymentMethod,
    },
  });

  const onSubmit = (data?: PaymentFormData) => {
    if (data) {
      dispatch(savePaymentMethod(data.paymentMethod));
    }
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
        <CheckOutButtons
          handleBack={handleBack}
          onSubmit={handleSubmit(onSubmit)}
          text="Continue"
        />
      </form>
    </div>
  );
};

export default PaymentPage;
