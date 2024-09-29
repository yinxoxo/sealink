import { Link } from "react-router-dom";
import { useProjects } from "../../contexts/ProjectContext/useProjects";
import { Card } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ArtCard from "../../cardTemplate/ArtCard";
import BreadCard from "../../cardTemplate/BreadCard";
import ForestCard from "../../cardTemplate/ForestCard";
import GalaxyCard from "../../cardTemplate/GalaxyCard";
import JiaCard from "../../cardTemplate/JiaCard";
import SimpleCard from "../../cardTemplate/SimpleCard";
import WoodCard from "../../cardTemplate/WoodCard";

const { Meta } = Card;

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
        <button className="w-fit rounded-3xl bg-gray-300 p-2 text-white hover:bg-gray-400">
          Create New SeaLink
        </button>
      </Link>

      <div className="grid grid-cols-1 gap-12 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const CardComponent = cardComponents[project.templateId];

          return (
            <Card
              key={project.id}
              className="mx-auto min-w-[360px] pt-5"
              cover={
                <div className="flex max-h-[360px] justify-center">
                  <div className="mx-auto max-h-[300px] max-w-[280px] overflow-y-scroll rounded-2xl">
                    <CardComponent data={project} />
                  </div>
                </div>
              }
              actions={[
                <SettingOutlined key="setting" />,
                <Link
                  key="edit"
                  to={`/dashboard/card-editor/${project.templateId}/${project.id}`}
                >
                  <EditOutlined />
                </Link>,
              ]}
            >
              <Meta
                title={project.title}
                description={
                  <>
                    <div className="text-gray-500">
                      {`Template: ${project.templateId}`}
                    </div>
                    <div className="mt-2 text-gray-500">
                      {`Created: ${dayjs(project.createdTime?.toDate()).format(
                        "YYYY/MM/DD",
                      )}`}
                    </div>
                  </>
                }
              />
              {project.isPublished ? (
                <a
                  href={project.publishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-3 w-full rounded-md bg-[#5d9ab6] p-2 text-white hover:bg-[#46758a]">
                    Check Out SeaLink
                  </button>
                </a>
              ) : (
                <button
                  className="mt-3 w-full cursor-not-allowed rounded-md bg-gray-300 p-2 text-white"
                  disabled
                >
                  Unpublished
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
