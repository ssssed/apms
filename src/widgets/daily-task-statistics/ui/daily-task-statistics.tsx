import { getServerSession } from "next-auth";
import { authOptions } from "~/shared/lib/auth";
import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";
import { prisma } from "~/shared/lib/prisma";
import { ProjectStatus } from "@prisma/client";
import { DailyTasksStatisticsChart } from "./chart";
import { projectsToChartAdapter } from "../lib";

export const DailyTaskStatistics = async () => {
  const session = await getServerSession(authOptions);
  const userId = +session!.user.id;
  const projects = await prisma.project.findMany({
    where: {
      //   status: ProjectStatus.IN_PROGRESS,
    },
    include: {
      Task: {
        where: {
          assignId: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <Box className="flex flex-col gap-4 w-[365px] max-h-fit">
      <Typography size={"xl"} weight={"bold"}>
        Дневная статистика
      </Typography>
      <DailyTasksStatisticsChart data={projectsToChartAdapter(projects)} />
    </Box>
  );
};
