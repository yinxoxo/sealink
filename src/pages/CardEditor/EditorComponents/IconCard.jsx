import { LuPenLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const IconCard = ({
  icon: IconComponent,
  iconName,
  iconHref,
  onEdit,
  onDelete,
}) => (
  <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-3">
    <div className="flex flex-col">
      <div className="flex items-center space-x-3">
        <IconComponent size={24} className="text-icon" />
        <span>{iconName}</span>
      </div>
      <p className="text-sm text-gray-400">{iconHref}</p>
    </div>

    <div className="flex items-center space-x-3">
      <button onClick={onEdit} aria-label="Edit">
        <LuPenLine className="text-icon hover:text-icon-hover" />
      </button>

      <button onClick={onDelete} aria-label="Delete">
        <MdDelete className="text-icon hover:text-icon-hover" />
      </button>
    </div>
  </div>
);

IconCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconName: PropTypes.string.isRequired,
  iconHref: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IconCard;
