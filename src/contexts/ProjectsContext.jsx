import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserProjects } from "../firebase/fetchUserProjects";
import { useAuth } from "./AuthContext";
import { useCardEditorContext } from "./CardEditorContext";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const { currentProject, setCurrentProject } = useCardEditorContext();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      if (user) {
        const projectsData = await fetchUserProjects(user);
        setProjects(projectsData);
        setCurrentProject(projectsData);
        setLoading(false);
      }
    };

    loadProjects();
  }, [user, setCurrentProject]);

  useEffect(() => {
    if (projects) {
      console.log("project in context", projects);
    }
  }, [projects]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
