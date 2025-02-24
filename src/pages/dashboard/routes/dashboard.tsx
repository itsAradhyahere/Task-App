import { Board } from "../../../components/board";
import { useAppStore } from "../../../store/app-store";
import TaskForm from "../../../components/modules/task-form";
import TaskAction from "../../../components/modules/task-action";
import { BoardType } from "../../../type";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../../queries/get-tasks";

const boards = [
  {
    id: "todo",
    label: "To Do",
    count: 5,
  },
  {
    id: "in progress",
    label: "In Progress",
    count: 0,
  },
  {
    id: "completed",
    label: "Completed",
    count: 3,
  },
];

export default function Dashboard() {
  const store = useAppStore();

  function handleAddNewCard(type: BoardType) {
    store.setSelectedTask(null);
    store.setCreateIsOpen({ state: true, type: type });
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: async () => await getTasks(),
  });

  const tasks = data?.data ?? [];

  return (
    <section>
      <div className="inline-grid grid-cols-[repeat(3,_350px)] gap-4 lg:pr-0 pr-6">
        {boards.map((board) => (
          <Board
            key={board.id}
            title={board.label}
            count={board.count}
            tasks={tasks.filter((task) => task.status === board.id)}
            onAddNewCard={() => handleAddNewCard(board.id as BoardType)}
            loading={isLoading}
            handleRefresh={refetch}
          />
        ))}
      </div>
      <TaskForm
        isOpen={store.createIsOpen.state}
        handleClose={() => {
          store.setCreateIsOpen({ state: false });
          store.setMode({ state: "create" });
        }}
        handleRefresh={refetch}
      />
      <TaskAction
        isOpen={store.deleteIsOpen.state}
        handleClose={() => store.setDeleteIsOpen({ state: false })}
        handleRefresh={refetch}
      />
    </section>
  );
}
