import { LuPenLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const ButtonCard = ({ button, index, onEdit, onDelete }) => (
  <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3">
    <div>
      <h3 className="text-lg">{button.text}</h3>
      <p className="text-sm text-gray-400">{button.url}</p>
    </div>

    <div className="flex items-center space-x-3">
      <button onClick={onEdit} aria-label="Edit">
        <LuPenLine className="text-icon hover:text-icon-hover" />
      </button>

      <button onClick={() => onDelete(index)} aria-label="Delete">
        <MdDelete className="text-icon hover:text-icon-hover" />
      </button>
    </div>
  </div>
);

ButtonCard.propTypes = {
  button: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ButtonCard;
