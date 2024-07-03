import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type: string;
  register: UseFormRegister<T>;
  required: boolean;
  errors: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  id,
  label,
  type,
  register,
  required,
  errors,
}: InputProps<T>) => {
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
      {errors[id] && <p className="text-red-500 text-sm">An Error Occured</p>}
    </div>
  );
};

export default Input;
