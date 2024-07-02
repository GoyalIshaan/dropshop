import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ShippingFormData } from '../types';

type ShippingInputFieldProps = {
  name: keyof ShippingFormData;
  control: Control<ShippingFormData>;
  label: string;
  placeholder: string;
  icon: JSX.Element;
  requiredMessage: string;
};

const ShippingInputField: React.FC<ShippingInputFieldProps> = ({
  name,
  control,
  label,
  placeholder,
  icon,
  requiredMessage,
}) => {
  const inputStyling: string =
    'block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300';

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Controller
          name={name}
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                type="text"
                className={`${inputStyling} ${error ? 'border-red-300' : ''}`}
                placeholder={placeholder}
              />
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default ShippingInputField;
