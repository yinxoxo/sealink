import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import Loading from "../../components/Loading/index";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  return user ? (
    element
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
