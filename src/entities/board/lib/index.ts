import { Task, User } from "@prisma/client";

export const injectTasksToBoard = (
  tasks: (Task & { User: User })[],
  initial: BoardColumnType[]
): BoardColumnType[] => {
  const updatedColumns = [...initial];

  tasks.forEach((task) => {
    const column = updatedColumns.find((col) => col.status === task.status);
    if (column) {
      column.tasks.push(task);
    }
  });

  return updatedColumns;
};
