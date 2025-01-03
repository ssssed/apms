"use server";

import { User } from "@prisma/client";
import { moment } from "~/shared/lib/time";
import { prisma } from "~/shared/lib/prisma";

export const getTaskCompletionByMonth = async (
  userId: User["id"],
  year: number = new Date().getFullYear()
) => {
  // Используем переданный год или текущий
  const startOfYear = new Date(`${year}-01-01`);
  const startOfNextYear = new Date(`${year + 1}-01-01`);

  const tasks = await prisma.task.groupBy({
    by: ["createAt"],
    where: {
      status: "DONE",
      assignId: userId,
      createAt: {
        gte: startOfYear, // Начало указанного года
        lt: startOfNextYear, // До начала следующего года
      },
    },
    _count: {
      id: true, // Считаем количество задач
    },
    orderBy: {
      createAt: "asc",
    },
  });

  // Группируем задачи по месяцам
  const monthlyStats = Array.from({ length: 12 }, (_, monthIndex) => {
    const month = monthIndex + 1; // Месяцы от 1 до 12
    const tasksForMonth = tasks.filter(
      (task) => new Date(task.createAt).getMonth() + 1 === month
    );

    return {
      month: moment()
        .month(month - 1)
        .format("MMMM"),
      completedTasks: tasksForMonth.length,
    };
  });

  return monthlyStats;
};
