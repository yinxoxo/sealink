import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../../contexts/ProjectContext/useProjects";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineQrCode, HiOutlinePencilSquare } from "react-icons/hi2";
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
import NinaWishCard from "../../cardTemplate/NinaWishCard";
import QrcodeModal from "./QrcodeModal";
import ProjectSetting from "./ProjectSetting";
import Loading from "../../components/Loading/index";

const Dashboard = () => {
  const { projects, loading } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrcodeModalOpen, setIsQrcodeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const cardComponents = {
    ArtCard,
    BreadCard,
    ForestCard,
    GalaxyCard,
    JiaCard,
    SimpleCard,
    WoodCard,
    NinaWishCard,
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const openQrcodeModal = (project) => {
    setSelectedProject(project);
    setIsQrcodeModalOpen(true);
  };

  const closeQrcodeModal = () => {
    setIsQrcodeModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-full w-full flex-col p-7">
      <Link to="/templates" className="self-end">
        <button className="w-fit rounded-lg bg-sea p-2 text-white hover:bg-sea-hover">
          Create New SeaLink
        </button>
      </Link>

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(360px,360px))] gap-5 p-4">
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
                    className="mt-3 block w-full max-w-[80%] rounded-lg bg-sea py-2 text-center text-white hover:bg-sea-hover"
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

              <div className="my-4 border-t border-gray-200" />

              <div className="mb-4 flex items-center">
                <button
                  className="flex w-1/2 items-center justify-center text-gray-600 hover:text-sea-hover"
                  onClick={() => openModal(project)}
                >
                  <IoSettingsOutline />
                </button>
                <div className="h-6 border-l border-gray-200" />
                <button
                  className="flex w-1/2 items-center justify-center text-gray-600 hover:text-sea-hover"
                  onClick={() => openQrcodeModal(project)}
                >
                  <HiOutlineQrCode />
                </button>
                <div className="h-6 border-l border-gray-200" />

                <Link
                  to={`/dashboard/card-editor/${project.templateId}/${project.id}`}
                  className="flex w-1/2 items-center justify-center text-gray-600 hover:text-sea-hover"
                >
                  <HiOutlinePencilSquare />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
      {selectedProject && (
        <ProjectSetting
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      {selectedProject && (
        <QrcodeModal
          project={selectedProject}
          isOpen={isQrcodeModalOpen}
          onClose={closeQrcodeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
