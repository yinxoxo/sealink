import { Link } from "react-router-dom";
import { useProjects } from "../../contexts/ProjectContext/useProjects";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDraw } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import dayjs from "dayjs";
import ArtCard from "../../cardTemplate/ArtCard";
import BreadCard from "../../cardTemplate/BreadCard";
import ForestCard from "../../cardTemplate/ForestCard";
import GalaxyCard from "../../cardTemplate/GalaxyCard";
import JiaCard from "../../cardTemplate/JiaCard";
import SimpleCard from "../../cardTemplate/SimpleCard";
import WoodCard from "../../cardTemplate/WoodCard";

const Dashboard = () => {
  const { projects, loading } = useProjects();

  const cardComponents = {
    ArtCard,
    BreadCard,
    ForestCard,
    GalaxyCard,
    JiaCard,
    SimpleCard,
    WoodCard,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col p-7 pl-[280px]">
      <Link to="/templates" className="self-end">
        <button className="w-fit rounded-lg bg-gray-300 p-2 text-white hover:bg-gray-400">
          Create New SeaLink
        </button>
      </Link>

      <div
        className="grid gap-3 p-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        }}
      >
        {projects.map((project) => {
          const CardComponent = cardComponents[project.templateId];

          return (
            <Card key={project.id} className="mx-auto min-w-[360px] pt-5">
              <div className="flex w-full flex-col items-center">
                <div className="max-h-[300px] w-[280px] overflow-y-scroll rounded-lg">
                  <CardComponent data={project} />
                </div>
                <div className="mt-2 w-[280px] text-left">
                  <CardHeader>
                    <CardTitle className="p-0">{project.title}</CardTitle>
                  </CardHeader>
                  <CardDescription>
                    Template: {project.templateId}
                    <br /> <br />
                    {`Created: ${dayjs(project.createdTime?.toDate()).format(
                      "YYYY/MM/DD",
                    )}`}
                  </CardDescription>
                </div>
                {project.isPublished ? (
                  <a
                    href={project.publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block w-full max-w-[80%] rounded-lg bg-[#5d9ab6] py-2 text-center text-white hover:bg-[#46758a]"
                  >
                    Check Out SeaLink
                  </a>
                ) : (
                  <button
                    className="mt-3 w-full max-w-[80%] cursor-not-allowed rounded-lg bg-gray-300 py-2 text-white"
                    disabled
                  >
                    Unpublished
                  </button>
                )}
              </div>

              <div className="my-4 border-t border-gray-200"></div>

              <div className="mb-4 flex items-center">
                <button className="flex w-1/2 items-center justify-center text-gray-600 hover:text-blue-500">
                  <IoSettingsOutline />
                </button>
                <div className="h-6 border-l border-gray-200"></div>

                <Link
                  to={`/dashboard/card-editor/${project.templateId}/${project.id}`}
                  className="flex w-1/2 items-center justify-center text-gray-600 hover:text-blue-500"
                >
                  <MdOutlineDraw />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
