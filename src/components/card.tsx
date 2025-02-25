import clsx from "clsx";
import { Button, Dropdown, Popover } from "antd";
import { BoardType, ModeType, PriorityType, TaskType } from "../type";
import { Tag } from "./shared/tag";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { HiFlag } from "react-icons/hi";
import { isOverdue } from "../utils/overdue";
import { useAppStore } from "../store/app-store";
import { task_action_options } from "../data/constants";
import { TaskTransfer } from "./modules/task-transfer";
import { useState } from "react";
import { formatDateTime } from "../utils/format-time";

export type CardType = {
  task: TaskType;
  handleRefresh?: () => void;
};

export function Card({ task, handleRefresh }: CardType) {
  const store = useAppStore((state) => state);
  const [boardTypeDialogIsOpen, setBoardTypeDialogIsOpen] = useState(false);

  const { date, time } = formatDateTime(task.deadline, task.time);

  const isCompleted = task.status === "completed";
  const isTaskOverdue = isOverdue(date, time);

  function handleDropdownAction(key: string) {
    // Key represent the different dropdown modes: "edit" | "delete" | "move"
    const state = key as ModeType;
    store.setMode({ state, id: task.id });
    const boardType = task.status as BoardType;

    // Populate and open create/edit form if action is "edit"
    if (state === "edit") {
      store.setSelectedTask(task);
      store.setCreateIsOpen({ state: true });
      return;
    }

    // Open "delete" modal if action is "delete"
    if (state === "delete") {
      store.setDeleteIsOpen({ state: true, id: task.id });
      return;
    }

    // Else, display move popup and store the task id to be moved
    setBoardTypeDialogIsOpen(true);
    store.setActiveTask({ boardType, id: task.id });
  }

  function closeMoveDialog() {
    setBoardTypeDialogIsOpen(false);
  }

  return (
    <article className="dark:bg-zinc-900 bg-white p-4 rounded-md shadow">
      <div className="mb-2">
        <Tag type={task.priority as PriorityType} />
      </div>
      <header className="flex items-start justify-between gap-2 mb-3">
        <h2 className="text-base font-semibold line-clamp-2 overflow-ellipsis">
          {task.title}
        </h2>
        <div className="flex flex-col">
          <Dropdown
            placement="bottomRight"
            menu={{
              items: task_action_options,
              onClick: (value) => handleDropdownAction(value.key),
            }}
            trigger={["click"]}
          >
            <Button
              size="small"
              icon={<HiEllipsisHorizontal className="size-4" />}
              className="flex-shrink-0"
            />
          </Dropdown>
          <Popover
            open={boardTypeDialogIsOpen}
            onOpenChange={closeMoveDialog}
            content={
              <TaskTransfer
                handleClose={closeMoveDialog}
                handleRefresh={handleRefresh}
              />
            }
            trigger="click"
            placement="bottomRight"
            arrow={false}
            destroyTooltipOnHide={true}
          />
        </div>
      </header>
      {task.cover && (
        <img
          src={task.cover}
          alt={task.title}
          className="block w-full h-32 rounded-sm aspect-video mb-2 dark:bg-zinc-800 bg-zinc-100 object-cover"
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
