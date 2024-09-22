import { Link } from "react-router-dom";
import { useProjects } from "../../contexts/ProjectsContext";
import { Card, Avatar } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Dashboard = () => {
  const { projects, loading } = useProjects();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-full w-full flex-col p-5 pl-[300px]">
      <Link to="/templates" className="self-end">
        <button className="w-fit rounded-3xl bg-gray-300 p-2 text-white hover:bg-gray-400">
          Create New SeaLink
        </button>
      </Link>

      <div className="project-list grid w-5/6 grid-cols-1 gap-12 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="mx-auto w-full max-w-xs"
            cover={
              <img
                alt="example"
                src="https://placekitten.com/300/200"
                className="w-full object-cover"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
            ]}
          >
            <Meta
              title={project.title}
              description={`Template: ${project.templateId}`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
