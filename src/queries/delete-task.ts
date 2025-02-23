import axios from "axios";
import { API_URL } from "./api";
import { TaskType } from "../type";
import { TaskResponse } from "./create-task";

// TODO: Merge function with createTask to keep code DRY
export async function deleteTask(id: string): Promise<TaskResponse> {
  try {
    const response = await axios.delete<TaskType | null>(`${API_URL}/${id}`);
    return {
      data: response.data,
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: axios.isAxiosError(error)
        ? error.message
        : "Unknown error occurred while deleting task",
    };
  }
}
