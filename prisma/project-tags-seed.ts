import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Функция для генерации случайного цвета в формате HEX
function getRandomColor() {
  return faker.color.rgb(); // Генерирует случайный RGB-цвет в формате HEX
}

// Основная логика создания тегов для всех проектов
async function createTagsForProjects() {
  try {
    // Получаем все проекты из базы данных
    const projects = await prisma.project.findMany();

    if (projects.length === 0) {
      console.log("Нет проектов для добавления тегов.");
      return;
    }

    const tagPromises = projects.flatMap((project) => {
      // Для каждого проекта генерируем от 0 до 2 случайных тегов
      const numTags = faker.number.int({ min: 0, max: 2 });

      return Array.from({ length: numTags }, () =>
        prisma.tag.create({
          data: {
            name: faker.word.adjective(), // Случайное название тега
            color: getRandomColor(), // Случайный цвет
            projects: {
              connect: { id: project.id }, // Связываем тег с проектом
            },
          },
        })
      );
    });

    // Ждем выполнения всех промисов
    const tags = await Promise.all(tagPromises);

    console.log("Теги успешно созданы:", tags);
  } catch (error) {
    console.error("Ошибка при создании тегов:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск функции
createTagsForProjects();
