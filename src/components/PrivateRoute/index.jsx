import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    element
  ) : (
    <Navigate to="/signup" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
