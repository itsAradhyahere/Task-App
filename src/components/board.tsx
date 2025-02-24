import { Badge } from "antd";
import { BiPlus } from "react-icons/bi";
import { TaskType } from "../type";
import { Card } from "./card";
import { LoadingSpinner } from "./shared/spinner";

type BoardProps = {
  title: string;
  tasks: TaskType[];
  onAddNewCard: () => void;
  loading?: boolean;
  handleRefresh?: () => void;
};

export function Board(props: BoardProps) {
  const { title, tasks, loading, onAddNewCard, handleRefresh } = props;

  return (
    <div className="dark:bg-zinc-800 bg-[#F5F7F9] px-3 pt-2 pb-4 rounded-lg h-fit min-h-32">
      <header className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <Badge
            showZero
            count={tasks.length}
            className="badge"
            status="warning"
          />
        </div>
        <button
          onClick={onAddNewCard}
          className="p-1 cursor-pointer opacity-70 dark:hover:bg-zinc-700 hover:bg-[#ebebeb] transition rounded-sm"
        >
          <BiPlus className="size-4" />
          <span className="sr-only">Add Card</span>
        </button>
      </header>
      {loading && <LoadingSpinner />}
      {!loading && tasks.length === 0 && (
        <div
          onClick={onAddNewCard}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dotted dark:border-zinc-700 border-zinc-200 hover:dark:border-zinc-600 hover:border-zinc-300 min-h-24 p-4 cursor-pointer rounded-lg group duration-200"
        >
          <span className="invisible opacity-0 group-hover:visible group-hover:opacity-60 duration-200">
            Add new card
          </span>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {!loading &&
          tasks.length > 0 &&
          tasks.map((task) => (
            <Card key={task.id} task={task} handleRefresh={handleRefresh} />
          ))}
      </div>
    </div>
  );
}
