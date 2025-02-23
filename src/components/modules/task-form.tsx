import { Button, DatePicker, Input, Modal, Select, SelectProps } from "antd";
import { useAppStore } from "../../store/app-store";
import { useState } from "react";
import UploadInput from "../shared/upload-input";
import dayjs from "dayjs";

type TaskFormType = {
  isOpen: boolean;
  handleClose: () => void;
};

const priority_options: SelectProps["options"] = [
  { label: "High", value: "high" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
];

export default function TaskForm({ isOpen, handleClose }: TaskFormType) {
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [titleCount, setTitleCount] = useState(0);

  const date = dayjs();
  const dateFormat = "MMM DD YYYY";

  const maxDescCount = 130;
  const maxTitleCount = 60;

  const { mode } = useAppStore();
  const isCreate = mode.state === "create";

  return (
    <Modal
      title={<h3 className="text-xl">{isCreate ? "Add Task" : "Edit Task"}</h3>}
      open={isOpen}
      onCancel={() => handleClose()}
      footer={null}
      centered
      width={500}
    >
      <form action="#">
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
              onChange={(e) => setTitleCount(e.target.value.length)}
            />
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
              onChange={(e) => {
                setDescriptionCount(e.target.value.length);
                console.log(e.target.value);
              }}
              placeholder="Write more on the task..."
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
            />
          </label>
          <label className="w-full">
            <p className="font-medium mb-1.5 text-sm">
              Upload cover{" "}
              <span className="opacity-50">&#40;Optional&#41;</span>
            </p>
            <UploadInput
              formats={["JPEG", "PNG", "SVG"]}
              onChange={(file) => console.log(file)}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="w-full">
              <p className="font-medium mb-1.5 text-sm">Deadline</p>
              <DatePicker
                size="large"
                className="w-full"
                placeholder="Aug 26th 2024"
                format={dateFormat}
                minDate={dayjs(date.set("day", 0), dateFormat)}
              />
            </label>
            <label className="w-full">
              <p className="font-medium mb-1.5 text-sm">Time</p>
              <DatePicker.TimePicker
                size="large"
                className="w-full"
                placeholder="2:00 PM"
                showSecond={false}
              />
            </label>
          </div>
        </fieldset>
        <Button type="primary" className="w-full" size="large">
          {isCreate ? "Create Task" : "Update"}
        </Button>
      </form>
    </Modal>
  );
}
