import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../../contexts/ProjectContext/useProjects";

const ProjectAnalysis = () => {
  const { projectId } = useParams();
  const { projects, loading } = useProjects();

  const projectData = !loading
    ? projects.find((project) => project.id === projectId)
    : null;
  console.log(projectData);
  return (
    <div className="p-7">
      <h1 className="mb-10 text-3xl font-bold">Data Analyze</h1>
    </div>
  );
};

export default ProjectAnalysis;
