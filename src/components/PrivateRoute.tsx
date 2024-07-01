import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return userInfo ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
