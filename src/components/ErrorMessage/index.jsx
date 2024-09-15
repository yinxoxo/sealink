import alertGif from "../../images/alert.gif";
import { Link } from "react-router-dom";

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
