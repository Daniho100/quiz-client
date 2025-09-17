import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/Auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;