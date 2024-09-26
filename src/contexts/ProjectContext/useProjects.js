import { useContext } from "react";
import { ProjectsContext } from "./ProjectsProvider";

export const useProjects = () => useContext(ProjectsContext);
