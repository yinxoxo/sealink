import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectsContext } from "../../contexts/ProjectContext/ProjectsProvider";
import DonutChart from "./DataFigure/DonutChart";

const ProjectAnalysis = () => {
  const { projectId } = useParams();
  const {
    projects,
    loading,
    visitorData,
    loadVisitorData,
    loadingVisitorData,
  } = useContext(ProjectsContext);

  const projectData = useCallback(() => {
    return !loading
      ? projects.find((project) => project.id === projectId)
      : null;
  }, [loading, projects, projectId]);

  useEffect(() => {
    if (projectId && projectData() && !visitorData[projectId]) {
      loadVisitorData(projectId);
      console.log("fetch visitData");
    }
  }, [projectId, projectData, visitorData, loadVisitorData]);

  if (loading || loadingVisitorData) {
    return <div>Loading...</div>;
  }

  const projectVisitorData = visitorData[projectId];

  console.log(projectVisitorData);

  return (
    <div className="bg-lightGray h-full min-h-screen w-full p-7">
      <h1 className="mb-10 text-3xl font-bold">Data Analyze</h1>
      <div className="h-full w-full">
        <DonutChart visitorData={projectVisitorData} />
      </div>
    </div>
  );
};

export default ProjectAnalysis;
