import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/userAPISlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '../store';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  //Navigate to shipping page if user is already logged in
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';
  useEffect(() => {
    if (redirect !== '/') navigate('/shipping');
  }, [userInfo, navigate, redirect]);

  const onSubmit: SubmitHandler<FieldValues> = async loginData => {
    console.log(loginData);
    try {
      const res = await login(loginData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(error || 'Login failed');
      } else if (error instanceof Error) {
        toast.error(error.message || 'An unexpected error occurred');
      } else {
        toast.error('Invalid Email Or Password');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Login to Your Account
        </h2>
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
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
          disabled={isLoading}
        >
          Sign In
        </button>
        {isLoading && <Loader />}
        <p className="mt-6 text-center">
          Don't have an account?{' '}
          <Link
            to={
              redirect !== '/' ? `/register?redirect=${redirect}` : `/register`
            }
            className="text-blue-600 hover:text-blue-800"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
