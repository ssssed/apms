import { PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function createTestData() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test2@test.ru",
    },
  });

  const projects = await prisma.$transaction(
    Array.from({ length: 5 }, (_, i) =>
      prisma.project.create({
        data: {
          name: `Project ${String.fromCharCode(65 + i)}`, // A, B, C, D, E
          description: `Description for project ${String.fromCharCode(65 + i)}`,
          User: {
            connect: { id: user!.id }, // связываем проекты с пользователем
          },
          Task: {
            create: generateTasks(user!.id, i),
          },
        },
        include: {
          Task: true,
        },
      })
    )
  );

  console.log("Test data created:", projects);
}

function generateTasks(userId: number, projectIndex: number) {
  const today = new Date();
  return [
    {
      title: `Task 1 for Project ${String.fromCharCode(65 + projectIndex)}`,
      description: "This is a task",
      status: TaskStatus.IN_PROGRESS, // Используем enum TaskStatus
      priority: 1,
      order: 1,
      createAt: today,
      updatedAt: new Date(today.getTime() - projectIndex * 24 * 60 * 60 * 1000), // Уменьшаем дату на N дней
      User: {
        connect: { id: userId },
      },
    },
    {
      title: `Task 2 for Project ${String.fromCharCode(65 + projectIndex)}`,
      description: "This is another task",
      status: TaskStatus.TESTING, // Используем enum TaskStatus
      priority: 2,
      order: 2,
      createAt: today,
      updatedAt: new Date(
        today.getTime() - (projectIndex + 1) * 24 * 60 * 60 * 1000
      ), // Уменьшаем дату на N+1 дней
      User: {
        connect: { id: userId },
      },
    },
  ];
}

createTestData()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
