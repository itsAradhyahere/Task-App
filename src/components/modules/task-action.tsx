import { Button, Modal } from "antd";
import { toast } from "sonner";
import { useAppStore } from "../../store/app-store";
import { useState } from "react";
import { deleteTask } from "../../queries/delete-task";
import { useQueryClient } from "@tanstack/react-query";

type TaskAction = {
  isOpen: boolean;
  handleClose: () => void;
  handleRefresh?: () => void;
};

export default function TaskAction({
  isOpen,
  handleClose,
  handleRefresh,
}: TaskAction) {
  const [isDeleting, setIsDeleting] = useState(false);
  const id = useAppStore((state) => state.deleteIsOpen.id);
  const queryClient = useQueryClient();

  async function handleDeleteTask() {
    try {
      setIsDeleting(true);
      const response = await queryClient.fetchQuery({
        queryKey: ["delete-task"],
        queryFn: () => deleteTask(id ?? ""),
      });

      if (response.success) {
        handleRefresh?.();
        handleClose();
      }
      toast(response.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      title="Delete Task"
      open={isOpen}
      onClose={() => handleClose()}
      footer={null}
      closable={false}
      centered
    >
      <div>
        <p className="mb-4">
          Are you sure you want to delete this task? This action is irreversible
        </p>
        <div className="flex items-center gap-3">
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button
            loading={isDeleting}
            onClick={handleDeleteTask}
            color="danger"
            variant="solid"
          >
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
