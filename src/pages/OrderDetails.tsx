/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useGetOrderByIDQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersAPISlice';
import {
  FaShippingFast,
  FaMoneyBillWave,
  FaListUl,
  FaTimesCircle,
} from 'react-icons/fa';
import Loader from '../components/Loader';
import { OrderItemsElement, OrderState } from '../types';
import OrderItem from '../components/OrderItem';
import Price from '../components/Price';
import DetailsSection from '../components/DetailsSection';
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
  DISPATCH_ACTION,
} from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Helmet } from 'react-helmet';

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useGetOrderByIDQuery(id ?? '');

  const { data: paypal } = useGetPayPalClientIdQuery();

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const loadPayPalScript = () => {
    if (paypal?.clientId) {
      console.log('Loading PayPal script with client ID:', paypal.clientId);
      paypalDispatch({
        type: DISPATCH_ACTION.RESET_OPTIONS,
        value: {
          clientId: paypal.clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({
        type: DISPATCH_ACTION.LOADING_STATUS,
        value: SCRIPT_LOADING_STATE.PENDING,
      });
    } else {
      console.error('PayPal Client ID is missing');
    }
  };

  useEffect(() => {
    if (order && !order.isPaid) {
      if (!window.paypal) {
        loadPayPalScript();
      }
    }
  }, [order]);

  function createOrder(_data: any, actions: any): Promise<string> {
    console.log('Creating PayPal order with data:', order);
    if (order && actions.order) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order.totalPrice.toFixed(2),
              },
            },
          ],
        })
        .then((orderId: string) => {
          console.log('PayPal order created with ID:', orderId);
          return orderId;
        })
        .catch((error: any) => {
          console.error('Order creation failed:', error);
          throw new Error('Order creation failed');
        });
    }
    return Promise.reject(new Error('Order creation failed'));
  }

  async function onApprove(data: any, actions: any): Promise<void> {
    console.log('PayPal onApprove:', data);
    if (actions.order) {
      try {
        const details = (await actions.order.capture()) as OrderState;
        console.log('Order captured:', details);
        if (id) {
          await payOrder({ orderId: id, details }).unwrap();
          await refetch();
          toast.success('Order paid successfully');
        }
      } catch (error) {
        toast.error('Failed to pay order');
        console.error('Failed to pay order:', error);
      }
    }
  }

  function onError(err: Record<string, unknown>): void {
    console.error('PayPal onError:', err);
    toast.error((err.message as string) || 'An error occurred');
  }

  const deliverOrderHandler = async () => {
    if (id) {
      await deliverOrder(id).unwrap();
      await refetch();
      toast.success('Order delivered successfully');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-red-500 text-6xl mb-4">
          <FaTimesCircle />
        </div>
        <div className="text-xl mb-4">Order not found</div>
        <Link
          to="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  const {
    orderItems,
    user,
    shippingAddress,
    paymentMethod,
    isDelivered,
    isPaid,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = order as OrderState;

  console.log(user);

  return (
    <div className="container mx-auto px-4 pt-12 max-w-4xl">
      <Helmet>
        <title>Order: {id}</title>
        <meta
          name="description"
          content="Welcome to the home page of my app."
        />
      </Helmet>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Order Details
      </h1>
      <div className="space-y-8">
        <DetailsSection
          title="Shipping Details"
          icon={<FaShippingFast className="mr-2" />}
          details={[
            { label: 'Name', value: user.name },
            { label: 'Email', value: user.email },
            {
              label: 'Address',
              value: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`,
            },
          ]}
          status={{ label: 'Status', value: isDelivered }}
        />
        {userInfo && userInfo.isAdmin && isPaid && !isDelivered && (
          <button
            onClick={deliverOrderHandler}
            className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              loadingDeliver ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loadingDeliver}
          >
            {loadingDeliver ? 'Delivering...' : 'Mark as Delivered'}
          </button>
        )}

        <DetailsSection
          title="Payment Details"
          icon={<FaMoneyBillWave className="mr-2" />}
          details={[{ label: 'Method', value: paymentMethod }]}
          status={{ label: 'Status', value: isPaid }}
        />

        {!isPaid && (
          <section className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>
            {loadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 animate-fadeIn">
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        <section className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaListUl className="mr-2" /> Order Items
          </h2>
          <ul>
            {orderItems.map((item: OrderItemsElement) => (
              <OrderItem key={item.name} item={item} />
            ))}
          </ul>
        </section>

        <section className="p-4 border rounded-lg shadow-sm">
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
        </section>
      </div>
    </div>
  );
};

export default OrderDetails;
