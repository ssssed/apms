import { TaskStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { HIGH_PRIORITY } from "~/shared/constants";
import { authOptions } from "~/shared/lib/auth";
import { getSprintPeriod } from "~/shared/lib/date";
import { prisma } from "~/shared/lib/prisma"
import { Box } from "~/shared/ui/box";
import { Typography } from "~/shared/ui/typography";

export const TaskStatistics = async () => {
    const session = await getServerSession(authOptions);
    const sprint = getSprintPeriod();
    const tasks = await prisma.task.findMany({
        where: {
            status: {
                notIn: [TaskStatus.BACKLOG]
            },
            assignId: +session!.user.id,
            createAt: {
                lt: sprint.start
            },
            endAt: {
                lte: sprint.end
            },
        }
    });

    const highPriorityTasks = tasks.filter(task => task.priority === HIGH_PRIORITY);

    const inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
    const testingTasks = tasks.filter(task => task.status === TaskStatus.TESTING)
    const doneTasks = tasks.filter(task => task.status === TaskStatus.DONE)
    
    return (
        <Box className="grid grid-cols-4 gap-8 p-4">
            <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#f2f7ec] justify-end">
                <Typography view={'blured'} size={'sm'}>Задачи с высоким приоритетом</Typography>
                <Typography view={'primary'} weight={'bold'} size={'2xl'}>{highPriorityTasks.length}/{tasks.length}</Typography>
            </div>
            <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#e6f7ff] justify-end">
                <Typography view={'blured'} size={'sm'}>Текущие задачи в работе</Typography>
                <Typography view={'primary'} weight={'bold'} size={'2xl'}>{inProgressTasks.length}/{tasks.length}</Typography>
            </div>
            <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#e4e6ff] justify-end">
                <Typography view={'blured'} size={'sm'}>Задачи в тестирование</Typography>
                <Typography view={'primary'} weight={'bold'} size={'2xl'}>{testingTasks.length}/{tasks.length}</Typography>
            </div>
            <div className="flex flex-col gap-3.5 p-4 rounded-lg bg-[#ffdccd] justify-end">
                <Typography view={'blured'} size={'sm'}>Выполненные задачи</Typography>
                <Typography view={'primary'} weight={'bold'} size={'2xl'}>{doneTasks.length}/{tasks.length}</Typography>
            </div>
        </Box>
    )
}