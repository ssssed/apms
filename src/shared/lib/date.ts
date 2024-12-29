export function getSprintPeriod() {
  const now = new Date();

  // Найдем дату понедельника текущей недели
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Если воскресенье, то разница 6, иначе текущий день минус 1
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday); // Устанавливаем день как понедельник

  // Устанавливаем конец спринта (через 14 дней)
  const sprintEnd = new Date(monday);
  sprintEnd.setDate(monday.getDate() + 14); // Добавляем 14 дней к понедельнику

  return { start: monday, end: sprintEnd };
}
