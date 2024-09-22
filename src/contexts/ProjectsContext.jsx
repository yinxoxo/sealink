import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserProjects } from "../firebase/fetchUserProjects";
import { useAuth } from "./AuthContext";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      if (user) {
        const projectsData = await fetchUserProjects(user);
        setProjects(projectsData);
        setLoading(false);
      }
    };

    loadProjects();
  }, [user]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
