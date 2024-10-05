import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectsContext } from "../../contexts/ProjectContext/ProjectsProvider";
import TimeRangeSelector from "./TimeRangeSelector";
import DonutChart from "./DataFigure/DonutChart";

const ProjectAnalysis = () => {
  const { projectId } = useParams();
  const { loading, visitorData, loadVisitorData, loadingVisitorData } =
    useContext(ProjectsContext);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const [selectedRange, setSelectedRange] = useState("last7days");

  useEffect(() => {
    if (projectId) {
      loadVisitorData(projectId, selectedDateRange);
    }
  }, [projectId, selectedDateRange, loadVisitorData]);

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
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      </div>

      <div className="h-full w-full">
        <DonutChart visitorData={projectVisitorData} />
      </div>
    </div>
  );
};

export default ProjectAnalysis;
