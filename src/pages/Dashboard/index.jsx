import { Link } from "react-router-dom";
import { useProjects } from "../../contexts/ProjectContext/useProjects";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
    <div className="flex h-full w-full flex-col p-7">
      <Link to="/templates" className="self-end">
        <button className="bg-sea hover:bg-sea-hover w-fit rounded-lg p-2 text-white">
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
                    className="bg-sea hover:bg-sea-hover mt-3 block w-full max-w-[80%] rounded-lg py-2 text-center text-white"
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
                <button className="hover:text-sea-hover flex w-1/2 items-center justify-center text-gray-600">
                  <IoSettingsOutline />
                </button>
                <div className="h-6 border-l border-gray-200"></div>

                <Link
                  to={`/dashboard/card-editor/${project.templateId}/${project.id}`}
                  className="hover:text-sea-hover flex w-1/2 items-center justify-center text-gray-600"
                >
                  <LuPenLine />
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
