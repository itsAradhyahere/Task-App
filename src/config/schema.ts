import * as yup from "yup";

export const taskFormSchema = yup.object().shape({
  title: yup.string().required("Task name is required"),
  description: yup.string(),
  cover: yup.string(),
  priority: yup.string().required("Priority is required"),
  deadline: yup.string().required("Deadline is required"),
  time: yup.string().required("Time is required"),
});
