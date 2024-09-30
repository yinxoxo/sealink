import { LuPenLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const TextCard = ({ textItem, index, onEdit, onDelete }) => (
  <div className="] flex w-full items-center justify-between rounded-lg border border-gray-200 p-3">
    <div>
      <h3 className="overflow-hidden text-ellipsis whitespace-normal break-words text-lg">
        {textItem.text}
      </h3>
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

TextCard.propTypes = {
  textItem: PropTypes.shape({
    text: PropTypes.string.isRequired,
    style: PropTypes.shape({
      fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      color: PropTypes.string,
      fontFamily: PropTypes.string,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TextCard;
