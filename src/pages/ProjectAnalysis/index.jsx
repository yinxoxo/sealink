import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectsContext } from "../../contexts/ProjectContext/ProjectsProvider";
import TimeRangeSelector from "./TimeRangeSelector";
import DonutChart from "./DataFigure/DonutChart";
import LifetimeChart from "./DataFigure/LifetimeChart";

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
    <div className="bg-lightGray h-fit min-h-svh w-full p-7">
      <div className="flex w-full justify-between">
        <h1 className="mb-10 text-4xl font-bold">Data Analyze</h1>
        <TimeRangeSelector
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-[150px_auto_1fr] gap-4">
        <div className="col-span-2 row-span-1 max-h-[150px] w-full min-w-[300px] rounded-lg bg-white p-4">
          <LifetimeChart visitorData={projectVisitorData} />
        </div>
        <div className="col-span-1 row-span-2 h-fit max-h-[600px] min-h-[300px] w-full min-w-[300px] rounded-lg bg-white p-4">
          <h1 className="h-fit w-fit p-3 text-2xl font-semibold">Devices</h1>
          <DonutChart visitorData={projectVisitorData} />
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalysis;
