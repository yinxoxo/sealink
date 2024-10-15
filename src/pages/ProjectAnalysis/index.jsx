import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectsContext } from "../../contexts/ProjectContext/ProjectsProvider";
import Loading from "../../components/Loading/index";
import TimeRangeSelector from "./TimeRangeSelector";
import DonutChart from "./DataFigure/DonutChart";
import LifetimeChart from "./DataFigure/LifetimeChart";
import Heatmap from "./DataFigure/Heatmap";
import LinkChart from "./DataFigure/LinkChart";

const ProjectAnalysis = () => {
  const { projectId } = useParams();
  const { loading, visitorData, loadVisitorData, loadingVisitorData } =
    useContext(ProjectsContext);

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

  const projectVisitorData = visitorData[projectId];

  if (loading || loadingVisitorData || !projectVisitorData) {
    return <Loading />;
  }

  return (
    <div className="h-fit min-h-svh w-full bg-lightGray p-7">
      <div className="mb-6 flex w-full flex-col justify-between sm:mb-0 sm:flex-row">
        <h1 className="mb-6 mt-10 text-4xl font-bold sm:mt-0">Data Analyze</h1>
        <TimeRangeSelector
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      </div>
      {projectVisitorData.length === 0 && (
        <h1 className="my-3 text-2xl font-bold text-sea-hover sm:mb-10 sm:text-3xl">
          No visitor data available for analysis.
        </h1>
      )}
      <div className="grid w-full grid-cols-2 grid-rows-[150px_auto_1fr] gap-4">
        <div className="col-span-2 row-span-1 max-h-[150px] w-full min-w-[300px] rounded-lg bg-white p-4">
          <LifetimeChart
            loading={loadingVisitorData}
            visitorData={projectVisitorData}
          />
        </div>
        <div className="row-span- col-span-2 h-fit w-full min-w-[300px] rounded-lg bg-white p-4">
          <h1 className="h-fit w-fit p-3 text-2xl font-semibold">
            Visitor Activity Heatmap
          </h1>
          <Heatmap
            loading={loadingVisitorData}
            visitorData={projectVisitorData}
          />
        </div>
        <div className="col-span-2 row-span-2 h-fit max-h-[600px] min-h-[300px] w-full min-w-[300px] rounded-lg bg-white p-4">
          <h1 className="h-fit w-fit p-3 text-2xl font-semibold">Content</h1>
          <LinkChart
            loading={loadingVisitorData}
            visitorData={projectVisitorData}
          />
        </div>
        <div className="col-span-1 row-span-2 h-fit max-h-[600px] min-h-[300px] w-full min-w-[300px] rounded-lg bg-white p-4">
          <h1 className="h-fit w-fit p-3 text-2xl font-semibold">Devices</h1>
          <DonutChart
            loading={loadingVisitorData}
            visitorData={projectVisitorData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalysis;
