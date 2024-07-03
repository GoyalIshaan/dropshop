import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../slices/userAPISlice';
import Loader from '../components/Loader';
import { IUser } from '../types';
import { toast } from 'react-toastify';
import UserEdit from './AdminUserEdit';
import AdminUserListItem from '../components/AdminUserListItem';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  if (isError || !users) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-4xl">
          <FaTrashAlt className="inline" />
        </div>
        <div className="ml-2 text-xl">Users not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
      <ul className="space-y-4">
        {users.map((user: IUser) => (
          <AdminUserListItem
            key={user._id}
            user={user}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>

      {showModal && selectedUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <UserEdit userId={selectedUserId} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
