/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  required: boolean;
  errors: FieldErrors<any>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  register,
  required,
  errors,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, {
          required: required ? `${label} is required` : false,
        })}
        className="block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
      />
      {errors[id] && (
        <p className="text-red-500 text-sm">Encountered an error</p>
      )}
    </div>
  );
};

export default Input;
