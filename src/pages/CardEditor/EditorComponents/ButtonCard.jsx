import { Card, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ButtonCard = ({ button, index, onEdit, onDelete }) => (
  <Card
    className="flex h-fit w-full items-center justify-between"
    style={{ body: { padding: "0px" } }}
    actions={[
      <Tooltip title="Edit" key="edit">
        <EditOutlined onClick={onEdit} />
      </Tooltip>,
      <Tooltip title="Delete" key="delete">
        <DeleteOutlined onClick={() => onDelete(index)} />
      </Tooltip>,
    ]}
  >
    <Card.Meta title={<span>{button.text}</span>} />
    <p>{button.url}</p>
  </Card>
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
