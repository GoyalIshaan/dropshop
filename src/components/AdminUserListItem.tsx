import React from 'react';
import { IUser } from '../types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

type AdminUserListItemProps = {
  user: IUser;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};
const AdminUserListItem: React.FC<AdminUserListItemProps> = ({
  user,
  handleEdit,
  handleDelete,
}) => {
  return (
    <li
      key={user._id}
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="font-semibold">User ID: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleEdit(user._id)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => handleDelete(user._id)}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaTrashAlt className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default AdminUserListItem;
