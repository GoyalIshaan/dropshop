import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../slices/userAPISlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { FaTimesCircle } from 'react-icons/fa';
import Input from '../components/AdminUserEditInput';

interface UserEditProps {
  userId: string;
  onClose: () => void;
}

interface UserFormData {
  name: string;
  email: string;
  isAdmin: boolean;
}

const UserEdit: React.FC<UserEditProps> = ({ userId, onClose }) => {
  const { data: user, isLoading, isError, error } = useGetUserByIdQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      name: '',
      email: '',
      isAdmin: false,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      await updateUser({ id: userId, data }).unwrap();
      toast.success('User updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-4xl">
          <FaTimesCircle className="inline" />
        </div>
        <div className="ml-2 text-xl">
          {error?.data?.message || 'User not found'}
        </div>
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User</h2>
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
            id="email"
            label="Email"
            type="email"
            register={register}
            required={true}
            errors={errors}
          />
          <div className="space-y-2">
            <label
              htmlFor="isAdmin"
              className="block text-sm font-medium text-gray-700"
            >
              Admin
            </label>
            <input
              id="isAdmin"
              type="checkbox"
              {...register('isAdmin')}
              className="block p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdating ? 'Updating' : 'Update User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
