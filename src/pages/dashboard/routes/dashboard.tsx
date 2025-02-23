import { Board } from "../../../components/board";
import { tasks } from "../../../data/tasks";
import { useAppStore } from "../../../store/app-store";
import TaskForm from "../../../components/modules/task-form";
import TaskAction from "../../../components/modules/task-action";

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

  return (
    <section>
      <div className="grid grid-cols-[repeat(3,_350px)] gap-4 min-w-full">
        {boards.map((board) => (
          <Board
            key={board.id}
            title={board.label}
            count={board.count}
            tasks={tasks.filter((task) => task.status === board.id)}
          />
        ))}
      </div>
      <TaskForm
        isOpen={store.createIsOpen}
        handleClose={() => {
          store.setCreateIsOpen(false);
          store.setMode({ state: "create" });
        }}
      />
      <TaskAction
        isOpen={store.deleteIsOpen}
        handleClose={() => store.setDeleteIsOpen(false)}
      />
    </section>
  );
}
