import { Button, DatePicker, Input, Modal, Select, SelectProps } from "antd";
import { useAppStore } from "../../store/app-store";
import { useState } from "react";
import UploadInput from "../shared/upload-input";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { taskFormSchema } from "../../config/schema";
import { ErrorText } from "../shared/error-text";
import { FileData } from "../../type";
import { toast } from "sonner";
import { createOrEditTask, CreateTaskPayload } from "../../queries/create-task";

type TaskFormType = {
  isOpen: boolean;
  handleClose: () => void;
  handleRefresh?: () => void;
};

const priority_options: SelectProps["options"] = [
  { label: "High", value: "high" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
];

export default function TaskForm({
  isOpen,
  handleClose,
  handleRefresh,
}: TaskFormType) {
  const [isCreating, setIsCreating] = useState(false);
  const { createIsOpen, selectedTask } = useAppStore();
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [titleCount, setTitleCount] = useState(0);
  const [fileData, setFileData] = useState<FileData | null>(null);

  const date = dayjs();
  const dateFormat = "MMM DD YYYY";
  const timeFormat = "h:mmA";

  const maxDescCount = 130;
  const maxTitleCount = 60;

  const { mode } = useAppStore();
  const isCreate = mode.state === "create";

  const formik = useFormik({
    initialValues: {
      title: selectedTask?.title ?? "",
      description: selectedTask?.description ?? "",
      cover: selectedTask?.cover ?? "",
      priority: selectedTask?.priority ?? undefined,
      deadline: selectedTask?.deadline ?? undefined,
      time: selectedTask?.time ?? undefined,
    },
    enableReinitialize: true,
    validationSchema: taskFormSchema,
    onSubmit: async (values) => {
      const payload: CreateTaskPayload = {
        ...values,
        priority: values.priority ?? "low",
        deadline: values.deadline ?? "",
        time: values.time ?? "",
        status: createIsOpen.type,
      };
      try {
        setIsCreating(true);
        const response = await createOrEditTask(
          payload,
          mode.state,
          selectedTask?.id
        );
        if (response.success) {
          toast(response.message);
          handleCloseForm();
          handleRefresh?.();
        } else {
          toast.error(response.message);
        }
      } finally {
        setIsCreating(false);
      }
    },
  });

  const { title, description, cover, priority, deadline, time } = formik.values;

  function handleCloseForm() {
    handleClose();
    formik.resetForm();
    setFileData(null);
  }

  return (
    <Modal
      title={<h3 className="text-xl">{isCreate ? "Add Task" : "Edit Task"}</h3>}
      open={isOpen}
      onCancel={handleCloseForm}
      footer={null}
      centered
      width={500}
    >
      <form onSubmit={formik.handleSubmit}>
        <fieldset className="flex flex-col gap-3 mt-4 mb-6">
          <label className="w-full">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium mb-1.5 text-sm">Task Name</p>
              <small className="opacity-50">
                {titleCount}/{maxTitleCount}
              </small>
            </div>
            <Input
              name="title"
              placeholder="Enter task name"
              size="large"
              maxLength={maxTitleCount}
              value={title}
              onChange={(e) => {
                setTitleCount(e.target.value.length);
                return formik.handleChange(e);
              }}
            />
            {formik.touched.title && formik.errors.title && (
              <ErrorText text={formik.errors.title} />
            )}
          </label>
          <label className="w-full">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium mb-1.5 text-sm">
                Description{" "}
                <span className="opacity-50">&#40;Optional&#41;</span>
              </p>
              <small className="opacity-50">
                {descriptionCount}/{maxDescCount}
              </small>
            </div>
            <Input.TextArea
              name="description"
              placeholder="Write more on the task..."
              value={description}
              onChange={(e) => {
                setDescriptionCount(e.target.value.length);
                return formik.handleChange(e);
              }}
              autoSize={{ minRows: 3, maxRows: 3 }}
              maxLength={maxDescCount}
            />
          </label>
          <label className="w-full">
            <p className="font-medium mb-1.5 text-sm">Priority</p>
            <Select
              placeholder="Select priority of the task"
              className="w-full"
              size="large"
              options={priority_options}
              value={priority}
              onChange={(value) => formik.setFieldValue("priority", value)}
            />
            {formik.touched.priority && formik.errors.priority && (
              <ErrorText text={formik.errors.priority} />
            )}
          </label>
          <label className="w-full">
            <p className="font-medium mb-1.5 text-sm">
              Upload cover{" "}
              <span className="opacity-50">&#40;Optional&#41;</span>
            </p>
            <UploadInput
              name="cover"
              formats={["JPEG", "PNG", "GIF"]}
              onUpload={(file) => formik.setFieldValue("cover", file?.url)}
              fileData={fileData}
              setFileData={setFileData}
              url={cover}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="w-full">
              <p className="font-medium mb-1.5 text-sm">Deadline</p>
              <DatePicker
                name="deadline"
                size="large"
                className="w-full"
                placeholder="Aug 26th 2024"
                format={dateFormat}
                value={deadline ? dayjs(deadline) : undefined}
                onChange={(e) =>
                  formik.setFieldValue("deadline", e.format(dateFormat))
                }
                minDate={dayjs(date.set("day", 0), dateFormat)}
              />
              {formik.touched.deadline && formik.errors.deadline && (
                <ErrorText text={formik.errors.deadline} />
              )}
            </label>
            <label className="w-full">
              <p className="font-medium mb-1.5 text-sm">Time</p>
              <DatePicker.TimePicker
                size="large"
                className="w-full"
                placeholder="2:00 PM"
                showSecond={false}
                value={time ? dayjs(time, timeFormat) : undefined}
                format={timeFormat}
                onChange={(_time, timeString) => {
                  formik.setFieldValue("time", timeString);
                }}
              />
              {formik.touched.time && formik.errors.time && (
                <ErrorText text={formik.errors.time} />
              )}
            </label>
          </div>
        </fieldset>
        <Button
          htmlType="submit"
          type="primary"
          className="w-full"
          size="large"
          loading={isCreating}
        >
          {isCreate ? "Create Task" : "Update"}
        </Button>
      </form>
    </Modal>
  );
}
