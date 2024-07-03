import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return userInfo && userInfo.isAdmin ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
