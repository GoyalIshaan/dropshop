import { Product } from '../types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AdminOrderListItem = ({
  product,
  handleEdit,
  handleDelete,
}: {
  product: Product;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <li
      key={product._id}
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="font-semibold">Product ID: {product._id}</p>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleEdit(product._id)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => handleDelete(product._id)}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaTrashAlt className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default AdminOrderListItem;
