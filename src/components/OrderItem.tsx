import React from 'react';
import { CartItem, OrderItemsElement } from '../types';

type OrderItemProps = {
  item: CartItem | OrderItemsElement;
};

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const imagePath = 'image' in item ? item.image : ''; // Adjust the image path if needed

  return (
    <li key={item.name} className="mb-2 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={`../../${imagePath}`}
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
