import { PrismaClient, TaskStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createTestData() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test2@test.ru",
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const sprintStart = new Date("2024-12-30T00:00:00.000Z");
  const sprintEnd = new Date("2025-01-12T00:00:00.000Z");

  const projects = await prisma.$transaction(
    Array.from({ length: 5 }, () =>
      prisma.project.create({
        data: {
          name: faker.commerce.productName(), // Случайное имя проекта
          description: faker.commerce.productDescription(), // Случайное описание проекта
          User: {
            connect: { id: user.id }, // Связываем проект с пользователем
          },
          Task: {
            create: generateTasks(user.id, sprintStart, sprintEnd),
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

function generateTasks(userId: number, sprintStart: Date, sprintEnd: Date) {
  const numTasks = faker.number.int({ min: 1, max: 5 }); // Случайное количество задач
  const today = new Date();

  return Array.from({ length: numTasks }, (_, index) => {
    // Генерация случайных дат начала и окончания задачи в пределах спринта
    const createAt = faker.date.between({ from: sprintStart, to: sprintEnd }); // Создание задачи в пределах спринта
    const endAt = faker.date.between({ from: createAt, to: sprintEnd }); // Задача заканчивается после ее создания, но до конца спринта

    return {
      title: faker.hacker.phrase(), // Случайное название задачи
      description: faker.lorem.sentence(), // Случайное описание задачи
      status: faker.helpers.arrayElement([
        // Случайный статус задачи
        TaskStatus.TODO,
        TaskStatus.REVIEW,
        TaskStatus.BACKLOG,
        TaskStatus.SELECT_TO_DEVELOPMENT,
        TaskStatus.IN_PROGRESS,
        TaskStatus.TESTING,
        TaskStatus.DONE,
      ]),
      priority: faker.number.int({ min: 0, max: 2 }), // Случайный приоритет
      order: index + 1, // Порядок в пределах проекта
      createAt, // Дата создания задачи
      updatedAt: new Date(
        createAt.getTime() -
          faker.number.int({ min: 0, max: 10 }) * 24 * 60 * 60 * 1000
      ), // Случайная дата обновления, которая не выходит за рамки даты создания
      endAt, // Дата окончания задачи
      User: {
        connect: { id: userId },
      },
    };
  });
}

createTestData()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
