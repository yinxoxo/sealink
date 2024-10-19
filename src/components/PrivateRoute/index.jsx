import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading/index";
import { useAuth } from "../../contexts/AuthContext/useAuth";

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

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PrivateRoute;
