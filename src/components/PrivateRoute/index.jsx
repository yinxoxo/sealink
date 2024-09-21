import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // 在loading完成前，顯示加載狀態
  }

  return user ? (
    element
  ) : (
    <Navigate to="/signup" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
