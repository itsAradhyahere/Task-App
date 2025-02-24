import { Button, Select } from "antd";
import { board_options } from "../../data/constants";
import { useAppStore } from "../../store/app-store";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BoardType } from "../../type";
import { updateTaskStatus } from "../../queries/update-task-status";
import { toast } from "sonner";

type TaskTransferProp = {
  handleClose?: () => void;
  handleRefresh?: () => void;
};

export function TaskTransfer({ handleClose, handleRefresh }: TaskTransferProp) {
  const queryClient = useQueryClient();
  const [isMoving, setIsMoving] = useState(false);
  const [activeBoardType, setActiveBoardType] = useState<BoardType | null>(
    null
  );

  // Remove current board of task from move options
  const { activeTask } = useAppStore();
  const filtered_board_options = board_options.filter(
    (option) => option.value !== activeTask.boardType
  );

  function handleSelectType(type: BoardType) {
    setActiveBoardType(type);
  }

  async function handleSwitchTask() {
    setIsMoving(true);
    try {
      const response = await queryClient.fetchQuery({
        queryKey: [`move-task-${activeTask.id}`],
        queryFn: async () =>
          await updateTaskStatus(activeTask.id ?? "", {
            status: activeBoardType,
          }),
      });

      if (response.success) {
        handleRefresh?.();
        toast.success(`Successfully moved task to "${activeBoardType}"`);
      } else {
        toast.error(response.message);
      }
      return response;
    } finally {
      setIsMoving(false);
      handleClose?.();
    }
  }

  return (
    <div className="flex flex-col">
      <h3 className="font-medium text-base mb-1">Move Task</h3>
      <p className="text-sm max-w-[220px] mb-3 opacity-70">
        Choose a position on the board to move this task
      </p>
      <div className="flex flex-col gap-2.5">
        <Select
          placeholder="Select Position"
          onChange={handleSelectType}
          options={filtered_board_options}
          className="w-full"
          disabled={isMoving}
        />
        <Button
          loading={isMoving}
          onClick={handleSwitchTask}
          disabled={!activeBoardType}
          type="primary"
        >
          Move Task
        </Button>
      </div>
    </div>
  );
}
