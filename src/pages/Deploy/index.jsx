import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCardEditorContext } from "../../contexts/CardEditorContext";
import SimpleCard from "../../CardTemplate/SimpleCard";
import Loading from "../../components/Loading";

const Deploy = () => {
  const { projectId } = useParams();
  const { setProjectId, currentProject } = useCardEditorContext();

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
    }
  }, [projectId, setProjectId]);

  if (!currentProject) {
    return <Loading />;
  }

  return (
    <div className="w- h-full min-h-screen">
      <SimpleCard />
    </div>
  );
};

export default Deploy;
