import React from 'react';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../slices/ordersAPISlice';
import Loader from '../components/Loader';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { FinalOrderState } from '../types';

const OrderList: React.FC = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !orders) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-4xl">
          <FaTimesCircle className="inline" />
        </div>
        <div className="ml-2 text-xl">Orders not found</div>
      </div>
    );
  }

  console.log(orders);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order List</h2>
      <ul className="space-y-4">
        {orders.map((order: FinalOrderState) => (
          <li key={order._id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-semibold">
                  <Link
                    to={`/order/${order._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Order ID: {order._id}
                  </Link>
                </p>
                <p>User: {order?.user?.name || 'user deleted'}</p>
                <p>Email: {order?.user?.email || 'user deleted'}</p>
                <p>
                  Address: {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-24">
                  <p className="font-semibold">Paid:</p>
                  {order.isPaid ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2 w-32">
                  <p className="font-semibold">Delivered:</p>
                  {order.isDelivered ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )}
                </div>
              </div>
              <div className="font-bold text-lg w-32 text-right">
                <div>Price</div>${order.totalPrice.toFixed(2)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
