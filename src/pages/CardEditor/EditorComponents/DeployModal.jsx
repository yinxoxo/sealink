import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

const DeployModal = ({ isOpen, onClose, projectUrl }) => {
  const navigate = useNavigate();

  const handleOkay = () => {
    onClose();
    navigate("/dashboard");
  };

  const handleViewSite = () => {
    window.open(projectUrl, "_blank");
    navigate("/dashboard");
  };

  return (
    <Modal
      title="Done!"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={handleOkay}>
          Okay
        </Button>,
        <Button key="view" type="primary" onClick={handleViewSite}>
          View Site
        </Button>,
      ]}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
        mask: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
        },
      }}
      style={{
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <p>
        Site successfully published to{" "}
        <a href={projectUrl} target="_blank" rel="noopener noreferrer">
          {projectUrl}
        </a>
      </p>
    </Modal>
  );
};

export default DeployModal;
