import { Button, Dropdown, MenuProps, Tooltip } from "antd";
import { PriorityType, TaskType } from "../type";
import { Tag } from "./shared/tag";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { HiFlag } from "react-icons/hi";
import dayjs from "dayjs";
import clsx from "clsx";
import { isOverdue } from "../utils/overdue";
import { ModeType, useAppStore } from "../store/app-store";

type CardType = {
  task: TaskType;
};

const items: MenuProps["items"] = [
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete", danger: true },
];

export function Card({ task }: CardType) {
  const { setCreateIsOpen, setDeleteIsOpen, setMode } = useAppStore();

  const date = dayjs(task.deadline).format("MMM DD YYYY");
  const time = dayjs(`${task.deadline} ${task.time}`).format("h:mmA");

  const isCompleted = task.status === "completed";
  const isTaskOverdue = isOverdue(date, time);

  function handleDropdownAction(key: string) {
    // Keys represent the different dropdown modes: "edit" | "delete"
    const state = key as ModeType;
    setMode({ state, id: task.id });

    // Open create/edit modal if dropdown selection is edit
    if (state !== "delete") {
      setCreateIsOpen(true);
      return;
    }

    // Open delete modal if dropdown selection is delete
    setDeleteIsOpen(true);
  }

  return (
    <article className="dark:bg-zinc-900 bg-white p-4 rounded-md shadow">
      <div className="mb-3">
        <Tag type={task.priority as PriorityType} />
      </div>
      <header className="flex items-center justify-between gap-2 mb-3">
        <Tooltip title={task.title}>
          <h2 className="text-base font-semibold line-clamp-2 overflow-ellipsis">
            {task.title}
          </h2>
        </Tooltip>
        <Dropdown
          placement="bottomRight"
          menu={{
            items,
            onClick: (value) => handleDropdownAction(value.key),
          }}
          trigger={["click"]}
        >
          <Button
            size="small"
            icon={<HiEllipsisHorizontal />}
            className="flex-shrink-0"
          />
        </Dropdown>
      </header>
      {task.cover && (
        <img
          src={task.cover}
          alt={task.title}
          className="block w-full h-32 rounded-sm aspect-video mb-2 bg-zinc-100 object-cover"
        />
      )}
      {task.description && (
        <p className="text-[15px] leading-5 mb-4 opacity-75">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between gap-4 text-xs dark:text-zinc-500 text-zinc-600">
        <div className="flex items-end gap-2">
          <HiFlag
            className={clsx(
              "size-4",
              isCompleted && "text-success",
              isTaskOverdue && "text-danger",
              !isCompleted && !isTaskOverdue && "text-stale"
            )}
          />
          <time dateTime={date}>{date}</time>
        </div>
        <time dateTime={time}>{time}</time>
      </div>
    </article>
  );
}
