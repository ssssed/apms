import { TaskStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { HIGH_PRIORITY } from "~/shared/constants";
import { authOptions } from "~/shared/lib/auth";
import { getSprintPeriod } from "~/shared/lib/date";
import { prisma } from "~/shared/lib/prisma";
import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";

export const TaskStatistics = async () => {
  const session = await getServerSession(authOptions);
  const sprint = getSprintPeriod();
  console.log("Sprint start:", sprint.start);
  console.log("Sprint end:", sprint.end);

  const tasks = await prisma.task.findMany({
    where: {
      status: {
        notIn: [TaskStatus.BACKLOG],
      },
      assignId: +session!.user.id,
      AND: [
        {
          OR: [
            {
              createAt: {
                gte: sprint.start, // Задача должна быть создана после начала спринта
              },
              endAt: {
                lte: sprint.end, // И закончиться до конца спринта
              },
            },
            {
              createAt: {
                lte: sprint.start, // Или задача может начинаться до начала спринта
              },
              endAt: {
                gte: sprint.end, // И заканчиваться после его окончания
              },
            },
          ],
        },
      ],
    },
  });

  console.log(
    await prisma.task.findMany({
      where: {
        assignId: +session!.user.id,
      },
    })
  );

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === HIGH_PRIORITY
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS
  );
  const testingTasks = tasks.filter(
    (task) => task.status === TaskStatus.TESTING
  );
  const doneTasks = tasks.filter((task) => task.status === TaskStatus.DONE);

  return (
    <Box className="grid grid-cols-4 gap-8 p-4">
      <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#f2f7ec] justify-end">
        <Typography view={"blured"} size={"sm"}>
          Задачи с высоким приоритетом
        </Typography>
        <Typography view={"primary"} weight={"bold"} size={"2xl"}>
          {highPriorityTasks.length}/{tasks.length}
        </Typography>
      </div>
      <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#e6f7ff] justify-end">
        <Typography view={"blured"} size={"sm"}>
          Текущие задачи в работе
        </Typography>
        <Typography view={"primary"} weight={"bold"} size={"2xl"}>
          {inProgressTasks.length}/{tasks.length}
        </Typography>
      </div>
      <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#e4e6ff] justify-end">
        <Typography view={"blured"} size={"sm"}>
          Задачи в тестирование
        </Typography>
        <Typography view={"primary"} weight={"bold"} size={"2xl"}>
          {testingTasks.length}/{tasks.length}
        </Typography>
      </div>
      <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#ffdccd] justify-end">
        <Typography view={"blured"} size={"sm"}>
          Выполненные задачи
        </Typography>
        <Typography view={"primary"} weight={"bold"} size={"2xl"}>
          {doneTasks.length}/{tasks.length}
        </Typography>
      </div>
    </Box>
  );
};
