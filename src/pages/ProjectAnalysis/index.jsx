import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectsContext } from "../../contexts/ProjectContext/ProjectsProvider";
import TimeRangeSelector from "./TimeRangeSelector";
import DonutChart from "./DataFigure/DonutChart";
// import useCreateVirtualData from "../../firebase/useCreateVirtualData";

// const getUserIdFromLocalStorage = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user ? user.uid : null;
// };

const ProjectAnalysis = () => {
  const { projectId } = useParams();
  const {
    projects,
    loading,
    visitorData,
    loadVisitorData,
    loadingVisitorData,
  } = useContext(ProjectsContext);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  console.log("select data", selectedDateRange);

  const projectData = !loading
    ? projects.find((project) => project.id === projectId)
    : null;

  useEffect(() => {
    if (projectData) {
      loadVisitorData(projectId, selectedDateRange);
    }
  }, [projectData, projectId, selectedDateRange, loadVisitorData]);

  if (loading || loadingVisitorData) {
    return <div>Loading...</div>;
  }

  const projectVisitorData = visitorData[projectId];

  return (
    <div className="bg-lightGray h-full min-h-screen w-full p-7">
      <div className="flex w-full justify-between">
        <h1 className="mb-10 text-3xl font-bold">Data Analyze</h1>
        <TimeRangeSelector
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          setSelectedDateRange={setSelectedDateRange}
        />
      </div>
      <div className="mt-10">
        {/* <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleGenerateData}
        >
          Generate Fake Data
        </button> */}
      </div>

      <div className="h-full w-full">
        <DonutChart visitorData={projectVisitorData} />
      </div>
    </div>
  );
};

export default ProjectAnalysis;
