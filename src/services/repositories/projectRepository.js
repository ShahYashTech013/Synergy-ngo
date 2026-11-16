import { mockProjects } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const projectRepository = createRepository("projects", mockProjects);
