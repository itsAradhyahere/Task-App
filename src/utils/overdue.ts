import dayjs from "dayjs";

export function isOverdue(taskDate: string, taskTime: string): boolean {
  const now = dayjs();
  // Parse date and time into date string
  const deadline = dayjs(`${taskDate} ${taskTime}`, "MMM D YYYY h:mmA");
  // Check if current dateTime has passed the deadline
  return now.isAfter(deadline);
}
