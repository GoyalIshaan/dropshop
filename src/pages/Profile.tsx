import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersAPISlice';
import { useProfileMutation } from '../slices/userAPISlice';
import { RootState } from '../store';
import { IUser, OrderState } from '../types';
import { Helmet } from 'react-helmet';

const InputField: React.FC<{ name: string; label: string; type?: string }> = ({
  name,
  label,
  type = 'text',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        {...register(name, { required: `${label} is required` })}
        type={type}
        className="block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">An error occurred</p>
      )}
    </div>
  );
};

const ProfileUpdate: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const methods = useForm<Partial<IUser>>({
    defaultValues: {
      name: userInfo?.name || '',
      email: userInfo?.email || '',
    },
  });

  const [updateProfile, { isLoading }] = useProfileMutation();
  const { data: orders, isLoading: isLoadingOrders } = useGetMyOrdersQuery();

  const dispatch = useDispatch();

  const onSubmit = async (data: Partial<IUser>) => {
    try {
      await updateProfile(data).unwrap();
      dispatch(setCredentials(data as IUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile page of the user." />
      </Helmet>
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Update Profile
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <InputField name="name" label="Name" />
            <InputField name="email" label="Email" type="email" />
            <button
              type="submit"
              className="w-full h-12 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
              disabled={isLoading}
            >
              Update Profile
            </button>
          </form>
        </FormProvider>
      </div>
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Order History
        </h2>
        <div className="space-y-4">
          {isLoadingOrders ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {orders?.map((order: OrderState) => (
                <div key={order._id} className="bg-gray-100 p-4 rounded-lg">
                  <Link to={`/order/${order._id}`}>
                    <h3 className="text-lg font-semibold">
                      Order ID: {order._id}
                    </h3>
                    <p className="text-sm">Total: ${order.totalPrice}</p>
                    <p className="text-sm">
                      Paid: {order.isPaid ? 'Yes' : 'No'}
                    </p>
                    <p className="text-sm">
                      Delivered: {order.isDelivered ? 'Yes' : 'No'}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
