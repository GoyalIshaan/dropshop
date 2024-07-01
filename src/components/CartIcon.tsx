import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri';

const CartIcon = ({ qty }: { qty: number }) => {
  return (
    <Link to="/cart" className="flex items-center text-2xl ml-4">
      {qty > 0 && (
        <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm mr-2">
          {qty}
        </span>
      )}
      <RiShoppingCartLine />
    </Link>
  );
};

export default CartIcon;
