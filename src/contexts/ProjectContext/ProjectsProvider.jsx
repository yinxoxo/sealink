import { createContext } from "react";
import { useUserProjects } from "../../firebase/fetchUserProjects";
import { useAuth } from "../AuthContext";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { user } = useAuth();
  const { data: projects, isLoading: loading, isError } = useUserProjects(user);

  if (isError) {
    console.error("Failed to load projects");
  }

  return (
    <ProjectsContext.Provider value={{ projects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};
