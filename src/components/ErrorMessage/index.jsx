import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import alertGif from "../../images/alert.gif";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message-container">
      <Link to="/template">
        <img src={alertGif} alt="Error GIF" width="100" />
      </Link>
      <h1>{message}</h1>
    </div>
  );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
