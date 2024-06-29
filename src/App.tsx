import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
