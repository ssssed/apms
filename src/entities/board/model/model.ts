"use server";
import {
  Project,
  Tag,
  Task,
  TaskComment,
  TaskStatus,
  User,
} from "@prisma/client";
import { moment } from "~/shared/lib/time";
import { prisma } from "~/shared/lib/prisma";

export type BoardTasksListType = Task & {
  User: User;
  Project: Project & {
    tags: Tag[];
  };
  TaskComment: TaskComment[];
};

export const getTasksWithUsers = async (): Promise<BoardTasksListType[]> => {
  const tasks = await prisma.task.findMany({
    include: {
      User: true,
      Project: {
        include: {
          tags: true,
        },
      },
      TaskComment: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return tasks as BoardTasksListType[];
};

export const updateTaskStatus = async (
  taskId: Task["id"],
  status: TaskStatus
) => {
  const updatedTask = await prisma.task.update({
    data: {
      status,
      updatedAt: moment().toISOString(),
    },
    where: {
      id: taskId,
    },
  });

  return updatedTask;
};
