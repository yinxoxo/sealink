import dayjs from "dayjs";
import { Link } from "react-router-dom";
import sadImage from "../../assets/images/sad.svg";
import Loading from "../../components/Loading/index";
import { useProjects } from "../../contexts/ProjectContext/useProjects";

const Analytics = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-fit min-h-svh w-full bg-lightGray p-7">
      {projects.length === 0 && (
        <div className="0 absolute inset-0 flex flex-col items-center justify-center">
          <img src={sadImage} alt="sad" className="mb-6 h-32 w-32 opacity-50" />
          <h1 className="text-[22px] font-extrabold opacity-50 sm:text-[32px] xl:text-[42px]">
            Oops! You don't have any projects yet
          </h1>
        </div>
      )}
      <h1 className="mb-6 mt-14 text-3xl font-bold sm:mb-10 lg:mt-0">
        Select a Project to <span className="text-sea-hover">Analyze</span>
      </h1>

      <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(200px,200px))] justify-center gap-5 sm:justify-start">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/dashboard/analytics/${project.id}`}
            className="group relative h-[200px] w-[200px] overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="flex h-full flex-col space-y-2 p-4">
              <h6 className="text-lg font-bold">{project.title}</h6>
              <p className="text-sm text-gray-500">
                Template: {project.templateId}
              </p>
              <p className="text-sm text-gray-500">
                {`Created: ${dayjs(project.createdTime?.toDate()).format(
                  "YYYY/MM/DD",
                )}`}
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-sea-hover bg-opacity-70 text-3xl font-bold leading-relaxed text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Analyze
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
