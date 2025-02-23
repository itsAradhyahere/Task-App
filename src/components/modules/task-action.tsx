import { Button, Modal } from "antd";
import { toast } from "sonner";

type TaskAction = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function TaskAction({ isOpen, handleClose }: TaskAction) {
  function deleteTask() {
    handleClose?.();
    toast("Task Deleted");
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
          <Button onClick={deleteTask} color="danger" variant="solid">
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
