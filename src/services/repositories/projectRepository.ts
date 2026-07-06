import { platformProjects } from "../../data/projects";
import type { ProjectTask } from "../../types/platform";

export interface ProjectRepository {
  getProjects(): Promise<ProjectTask[]>;
}

export const mockProjectRepository: ProjectRepository = {
  async getProjects() {
    return platformProjects;
  },
};
