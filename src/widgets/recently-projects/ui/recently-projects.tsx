import { ProjectStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "~/shared/lib/auth";
import { getContrastColor } from "~/shared/lib/contrast";
import { prisma } from "~/shared/lib/prisma";
import { ROUTER } from "~/shared/lib/router";
import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";

export const RecentlyProjects = async () => {
  const session = await getServerSession(authOptions);
  const userId = +session!.user.id;
  const projects = await prisma.project.findMany({
    where: {
      status: {
        not: "REJECTED",
      },
      Task: {
        some: {
          User: {
            id: userId,
          },
        },
      },
    },
    include: {
      Task: {
        where: {
          User: {
            id: userId,
          },
        },
        select: {
          updatedAt: true,
        },
      },
      tags: true,
    },
  });

  // Сортируем проекты по дате последнего обновления задачи
  const sortedProjects = projects
    .map((project) => {
      const lastUpdatedAt = project.Task.reduce(
        (latest, task) => {
          const taskUpdatedAt = new Date(task.updatedAt).getTime();
          const latestUpdatedAt = new Date(latest).getTime();
          return taskUpdatedAt > latestUpdatedAt ? task.updatedAt : latest;
        },
        new Date(0) // Начальная дата: 1 января 1970
      );

      return {
        ...project,
        lastUpdatedAt,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.lastUpdatedAt).getTime() -
        new Date(a.lastUpdatedAt).getTime()
    ) // Сортировка по метке времени
    .slice(0, 3); // Берем только 3 первых проекта

  return (
    <Box className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Typography size={"xl"} weight={"bold"}>
          Последние проекты
        </Typography>
        <Link href={ROUTER.pages.PROJECTS}>
          <Typography view={"blured"} weight={"bold"}>
            Смотреть все
          </Typography>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-2 py-2 px-3 bg-white rounded-[15px] border border-[#eeeeee]"
          >
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="p-2 text-xs font-medium leading-none rounded"
                  style={{
                    backgroundColor: tag.color,
                    color: getContrastColor(tag.color),
                  }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <Typography weight={"bold"} className="leading-[23px]">
              {project.name}
            </Typography>
            <Typography view={"blured"} size={"xs"}>
              {project.description}
            </Typography>
          </div>
        ))}
      </div>
    </Box>
  );
};
