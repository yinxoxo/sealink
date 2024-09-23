import { Card, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const TextCard = ({ textItem, index, onEdit, onDelete }) => (
  <Card
    className="flex h-fit w-full max-w-[410px] items-center justify-between"
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
    <Card.Meta
      title={
        <span className="max-w-[350px] overflow-hidden text-ellipsis whitespace-normal break-words">
          {textItem.text}
        </span>
      }
    />
  </Card>
);

TextCard.propTypes = {
  textItem: PropTypes.shape({
    text: PropTypes.string.isRequired,
    style: PropTypes.shape({
      fontSize: PropTypes.string,
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
