import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import OrderItem from '../components/OrderItem';
import { CartItem, CartState } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../slices/ordersAPISlice';
import { clearCart } from '../slices/cartSlice';

const PlaceOrderPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const cart: CartState = useSelector((state: RootState) => state.cart);
  const {
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/checkout/shipping');
    } else if (!paymentMethod) {
      navigate('/checkout/payment');
    }
  }, [navigate, shippingAddress, paymentMethod]);

  const placeOrderHandler = async () => {
    try {
      const order = {
        orderItems: items.map(item => ({
          ...item,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const res = await createOrder(order).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error('Failed to place order: ', err);
    }
  };

  const buttonStyling: string =
    'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105';

  const handleBack = () => {
    navigate('/checkout/payment');
  };

  return (
    <div className="w-full h-full px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Place Order
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between mb-8">
        <div className="md:w-1/2 p-4 mr-4 border rounded-lg shadow-sm mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <p>
            {shippingAddress.address}, {shippingAddress.city},{' '}
            {shippingAddress.postalCode}, {shippingAddress.country}
          </p>
        </div>

        <div className="md:w-1/2 p-4 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
          <p>{paymentMethod}</p>
        </div>
      </div>

      <div className="p-4 border rounded-lg shadow-sm mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
        <ul>
          {items.map((item: CartItem) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </ul>
      </div>

      <div className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="mb-2 flex justify-between items-center">
          <div>Items Price</div>
          <div className="font-bold text-lg">${itemsPrice.toFixed(2)}</div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <div>Shipping Price</div>
          <div className="font-bold text-lg">${shippingPrice.toFixed(2)}</div>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <div>Tax Price</div>
          <div className="font-bold text-lg">${taxPrice.toFixed(2)}</div>
        </div>
        <div className="mb-2 flex justify-between items-center font-bold text-xl">
          <div>Total Price</div>
          <div>${totalPrice.toFixed(2)}</div>
        </div>
        {error && (
          <p className="text-red-500">
            {(error as Error).message || 'An error occurred'}
          </p>
        )}
        <div className="flex justify-between pt-4 space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className={`w-1/5 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 ${buttonStyling}`}
          >
            Back
          </button>
          <button
            type="submit"
            onClick={placeOrderHandler}
            disabled={isLoading}
            className={`flex-grow bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 ${buttonStyling}`}
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
