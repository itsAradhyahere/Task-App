import dayjs from "dayjs";

export const formatDateTime = (deadline: string, time: string) => {
  const dateFormat = "MMM DD YYYY";
  const timeFormat = "h:mmA";

  const formattedDate = dayjs(deadline).format(dateFormat);
  const formattedTime = dayjs(
    `${deadline} ${time}`,
    `${dateFormat} ${timeFormat}`
  ).format(timeFormat);

  return { date: formattedDate, time: formattedTime };
};
