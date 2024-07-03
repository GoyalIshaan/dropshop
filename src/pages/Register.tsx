import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/userAPISlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { Helmet } from 'react-helmet';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  //Navigate to shipping page if user is already logged in
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';
  useEffect(() => {
    if (redirect !== '/') navigate('/shipping');
  }, [userInfo, navigate, redirect]);

  const onSubmit: SubmitHandler<FieldValues> = async registerData => {
    console.log(registerData);
    const { name, email, password } = registerData;
    try {
      const res = await registerUser({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(error || 'Registration failed');
      } else if (error instanceof Error) {
        toast.error(error.message || 'An unexpected error occurred');
      } else {
        toast.error('Invalid Registration Data');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>Register | DropShop</title>
        <meta
          name="description"
          content="Welcome to the home page of my app."
        />
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Create an Account
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            {...register('name', { required: 'Username is required' })}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-4 py-2 sm:text-sm border-gray-300 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
            placeholder="Enter your username"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-4 py-2 sm:text-sm border-gray-300 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-4 py-2 sm:text-sm border-gray-300 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
            placeholder="********"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
            })}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-4 py-2 sm:text-sm border-gray-300 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
            placeholder="********"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
          disabled={isLoading}
        >
          Register
        </button>
        {isLoading && <Loader />}
        <p className="mt-6 text-center">
          Already have an account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : `/login`}
            className="text-blue-600 hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
