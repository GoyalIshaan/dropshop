import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import OrderItem from '../components/OrderItem';
import { CartItem, CartState } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../slices/ordersAPISlice';
import { clearCart } from '../slices/cartSlice';
import CheckOutButtons from '../components/CheckOutButtons';
import Price from '../components/Price';

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
      const calculatedTotalPrice = itemsPrice + shippingPrice + taxPrice;

      const order = {
        // Converting each item from the type CartItem to OrderItemsElement
        orderItems: items.map(item => ({
          ...item,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice: totalPrice ?? calculatedTotalPrice,
      };

      const res = await createOrder(order).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error('Failed to place order: ', err);
    }
  };

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
        <Price tag="Items Price" price={itemsPrice.toFixed(2)} />
        <Price tag="Shipping Price" price={shippingPrice.toFixed(2)} />
        <Price tag="Tax Price" price={taxPrice.toFixed(2)} />
        <div className="font-bold text-xl">
          <Price
            tag="Total Price"
            price={(
              totalPrice ?? itemsPrice + shippingPrice + taxPrice
            ).toFixed(2)}
          />
        </div>
        {error && (
          <p className="text-red-500">
            {(error as Error).message || 'An error occurred'}
          </p>
        )}
        <CheckOutButtons
          handleBack={handleBack}
          onSubmit={placeOrderHandler}
          isLoading={isLoading}
          text="Place Order"
        />
      </div>
    </div>
  );
};

export default PlaceOrderPage;
