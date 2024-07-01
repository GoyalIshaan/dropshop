import { CartItem } from '../types';

const OrderItem = ({ item }: { item: CartItem }) => {
  return (
    <li key={item._id} className="mb-2 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={`../../${item.image}`}
          alt={item.name}
          className="w-20 h-20 rounded mr-4 mb-4"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p>Qty: {item.qty}</p>
        </div>
      </div>
      <div className="font-bold text-lg">
        ${(item.price * item.qty).toFixed(2)}
      </div>
    </li>
  );
};

export default OrderItem;
