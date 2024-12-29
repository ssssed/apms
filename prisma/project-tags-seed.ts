import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projectIds = [1, 2, 3];

// Функция для генерации случайного цвета в формате HEX
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Основная логика создания тегов для проектов
async function createTagsForProjects() {
  try {
    // Для каждого проекта с id из массива projectIds создаем тег
    const tagPromises = projectIds.map((projectId) =>
      prisma.tag.create({
        data: {
          name: `Tag-${projectId}`, // Короткое название тега
          color: getRandomColor(), // Случайный цвет
          projects: {
            connect: { id: projectId }, // Связываем тег с проектом
          },
        },
      })
    );

    // Ждем выполнения всех промисов
    const tags = await Promise.all(tagPromises);

    console.log("Теги успешно созданы:", tags);
  } catch (error) {
    console.error("Ошибка при создании тегов:", error);
  }
}

// Запуск функции
createTagsForProjects();
