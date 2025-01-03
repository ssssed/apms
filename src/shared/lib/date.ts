import { moment } from "~/shared/lib/time";

export function getSprintPeriod() {
  const today = moment();

  // Определяем текущий понедельник (начало текущей недели)
  const sprintStart = today.clone().startOf("isoWeek");

  // Определяем окончание двухнедельного спринта (воскресенье следующей недели)
  const sprintEnd = sprintStart.clone().add(2, "weeks").subtract(1, "day");

  return {
    start: new Date(sprintStart.format("YYYY-MM-DD")),
    end: new Date(sprintEnd.format("YYYY-MM-DD")),
  };
}
