import { createContext, useState } from "react";
import { useUserProjects } from "../../firebase/fetchUserProjects";
import { fetchVisitorData } from "../../firebase/fetchVisitorData"; // 新增這個引用
import { useAuth } from "../AuthContext/useAuth";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { user } = useAuth();
  const { data: projects, isLoading: loading, isError } = useUserProjects(user);
  const [visitorData, setVisitorData] = useState({});
  const [loadingVisitorData, setLoadingVisitorData] = useState(false);

  if (isError) {
    console.error("Failed to load projects");
  }

  const loadVisitorData = async (projectId) => {
    setLoadingVisitorData(true);
    try {
      const data = await fetchVisitorData(user, projectId);
      setVisitorData((prev) => ({
        ...prev,
        [projectId]: data,
      }));
    } catch (error) {
      console.error("Failed to load visitor data", error);
    } finally {
      setLoadingVisitorData(false);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        visitorData,
        loadVisitorData,
        loadingVisitorData,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
