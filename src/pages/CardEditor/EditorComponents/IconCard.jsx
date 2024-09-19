import { Card, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const IconCard = ({ icon: IconComponent, iconName, onEdit, onDelete }) => (
  <Card
    className="flex h-fit w-full items-center justify-between"
    styles={{ body: { padding: "8px" } }}
    actions={[
      <Tooltip title="Edit" key="edit">
        <EditOutlined onClick={onEdit} />
      </Tooltip>,
      <Tooltip title="Delete" key="delete">
        <DeleteOutlined onClick={onDelete} />
      </Tooltip>,
    ]}
  >
    <Card.Meta
      className="flex items-center"
      avatar={<IconComponent size={24} color="#000" />}
      title={<span>{iconName}</span>}
    />
  </Card>
);

IconCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconName: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IconCard;
