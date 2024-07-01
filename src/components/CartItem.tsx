import { Link } from 'react-router-dom';
import { CartItem as CartItemProps } from '../types';
import Quantity from './Quantity';
import { useState } from 'react';
import { editQuantity, removeFromCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import { FiTrash, FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item }: { item: CartItemProps }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.qty);
  const [isHovering, setIsHovering] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity !== quantity) {
      setQuantity(newQuantity);
      dispatch(editQuantity({ ...item, qty: newQuantity }));
    }
  };

  const handleRemoveClick = () => {
    dispatch(removeFromCart({ ...item }));
  };

  return (
    <li className="flex justify-between items-center border-b-2 py-2">
      <div className="flex flex-1">
        <h5 className="text-xl">{item.name}</h5>
        <p className="text-lg ml-4">Price: ${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Quantity
          quantity={quantity}
          setQuantity={handleQuantityChange}
          cartItem={item}
        />
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleRemoveClick}
          className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition duration-300 ease-in-out"
        >
          {isHovering ? <FiTrash2 size={24} /> : <FiTrash size={24} />}
        </button>
        <Link to={`/product/${item._id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-sm ml-4"
          />
        </Link>
      </div>
    </li>
  );
};

export default CartItem;
