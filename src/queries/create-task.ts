import axios from "axios";
import { API_URL } from "./api";
import { ModeType, TaskType } from "../type";

export type TaskResponse = {
  success: boolean;
  data?: TaskType | null;
  message?: string;
};

export type CreateTaskPayload = {
  title: string;
  description: string;
  cover: string;
  priority: string;
  deadline: string;
  time: string;
  status: string;
};

export async function createOrEditTask(
  payload: CreateTaskPayload,
  mode: ModeType,
  id?: string
): Promise<TaskResponse> {
  try {
    const isEdit = mode === "edit";
    const response = await axios({
      method: isEdit ? "PUT" : "POST",
      url: isEdit ? `${API_URL}/${id}` : API_URL,
      data: payload,
    });

    return {
      data: response.data,
      success: true,
      message: isEdit
        ? "Task updated successfully"
        : "Task created successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: axios.isAxiosError(error)
        ? `Failed to ${mode === "edit" ? "update" : "create"} task: ${
            error.message
          }`
        : `Unknown error occurred while ${
            mode === "edit" ? "updating" : "creating"
          } task`,
    };
  }
}
