import React from 'react';
import { FaShippingFast, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Step from './Step';

const CheckoutSteps: React.FC = () => {
  const location = useLocation();
  const getStep = () => {
    switch (location.pathname) {
      case '/checkout/shipping':
        return 1;
      case '/checkout/payment':
        return 2;
      case '/checkout/placeorder':
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = getStep();

  return (
    <div className="flex space-x-2 my-4 max-w-3xl mx-auto">
      <Step
        title="Shipping"
        icon={<FaShippingFast size={30} />}
        active={currentStep === 1}
        completed={currentStep > 1}
      />
      <Step
        title="Payment"
        icon={<FaCreditCard size={30} />}
        active={currentStep === 2}
        completed={currentStep > 2}
      />
      <Step
        title="Place Order"
        icon={<FaCheckCircle size={30} />}
        active={currentStep === 3}
        completed={currentStep > 3}
      />
    </div>
  );
};

export default CheckoutSteps;
