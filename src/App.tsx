import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ShippingPage from './pages/Shipping';
import PaymentPage from './pages/Payment';
import PrivateRoute from './components/PrivateRoute';
import CheckOut from './pages/CheckOut';
import PlaceOrderPage from './pages/PlaceOrder';
import OrderDetails from './pages/OrderDetails';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Profile from './pages/Profile';
import AdminRoute from './components/AdminRoute';
import OrderList from './pages/AdminOrderList';
import ProductList from './pages/AdminProductsList';
import UserList from './pages/AdminUserList';
import SearchResults from './pages/SearchResults';
import { Helmet } from 'react-helmet';

export default function App() {
  const [paypalClientId, setPaypalClientId] = useState('');

  useEffect(() => {
    const fetchPayPalClientId = async () => {
      const response = await fetch('/api/config/paypal');
      const data = await response.json();
      setPaypalClientId(data.clientId);
    };

    fetchPayPalClientId();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Products />,
          children: [
            {
              path: '/page/:pageNumber',
              element: <Products />,
            },
          ],
        },
        { path: 'products/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: 'checkout',
          element: (
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          ),
          children: [
            { path: 'shipping', element: <ShippingPage /> },
            { path: 'payment', element: <PaymentPage /> },
            { path: 'placeorder', element: <PlaceOrderPage /> },
          ],
        },
        {
          path: 'order',
          children: [
            {
              path: ':id',
              element: (
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: 'profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: 'orderlist',
          element: (
            <AdminRoute>
              <OrderList />
            </AdminRoute>
          ),
        },
        {
          path: 'productlist',
          element: (
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          ),
          children: [{ path: 'page/:pageNumber', element: <ProductList /> }],
        },
        {
          path: 'userlist',
          element: (
            <AdminRoute>
              <UserList />
            </AdminRoute>
          ),
        },
        {
          path: 'search/:keyword',
          element: <SearchResults />,
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <Provider store={store}>
      {paypalClientId && (
        <PayPalScriptProvider options={{ clientId: paypalClientId }}>
          <Helmet />
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      )}
    </Provider>
  );
}
