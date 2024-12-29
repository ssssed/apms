import { Project, Task } from "@prisma/client";

export const projectsToChartAdapter = (
  projects: (Project & { Task: Pick<Task, "id">[] })[]
) => {
  return projects.map((project) => ({
    projectName: project.name,
    taskCount: project.Task.length,
  }));
};
