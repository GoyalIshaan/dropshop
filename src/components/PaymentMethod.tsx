import { Controller, Control } from 'react-hook-form';
import { PaymentFormData } from '../types';

type PaymentMethodProps = {
  method: string;
  control: Control<PaymentFormData>;
};

const PaymentMethod = ({ method, control }: PaymentMethodProps) => {
  return (
    <Controller
      key={method}
      name="paymentMethod"
      control={control}
      render={({ field }) => (
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out 
                      ${field.value === method ? 'bg-indigo-100 border-indigo-500' : 'border-gray-300'}`}
        >
          <input
            {...field}
            type="radio"
            value={method}
            checked={field.value === method}
            onChange={() => field.onChange(method)}
            className="hidden"
          />
          <div className="flex items-center">
            <span
              className={`h-4 w-4 inline-block rounded-full border-2 mr-3
                          ${field.value === method ? 'bg-indigo-600 border-indigo-600' : 'border-gray-400'}`}
            ></span>
            <span className="text-gray-700">{method}</span>
          </div>
        </label>
      )}
    />
  );
};

export default PaymentMethod;
