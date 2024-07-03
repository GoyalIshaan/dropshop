import React from 'react';
import { CartItem, Product } from '../types';

interface QuantityProps {
  product?: Product;
  quantity: number;
  setQuantity:
    | React.Dispatch<React.SetStateAction<number>>
    | ((newQuantity: number) => void);
  cartItem?: CartItem;
}

const Quantity: React.FC<QuantityProps> = ({
  product,
  quantity,
  setQuantity,
  cartItem,
}) => {
  const maxStock = cartItem
    ? cartItem.countInStock
    : product
      ? product.countInStock
      : 0;

  return (
    <select
      id="quantity"
      value={quantity}
      onChange={e => setQuantity(Number(e.target.value))}
      className="border rounded p-2 ml-2"
    >
      {Array.from({ length: maxStock }, (_, i) => i + 1).map(x => (
        <option key={x} value={x}>
          {x}
        </option>
      ))}
    </select>
  );
};

export default Quantity;
