import { Outlet } from 'react-router-dom';
import CheckoutSteps from '../components/CheckOutSteps';

export default function CheckOut() {
  return (
    <div className="w-full h-full px-4 pt-8">
      <CheckoutSteps />
      <Outlet />
    </div>
  );
}
