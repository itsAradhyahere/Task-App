import axios from "axios";
import { API_URL } from "./api";
import { TaskType } from "../type";

type TaskResponse = {
  success: boolean;
  data: TaskType[];
  message?: string;
};

type ParamType = {
  // status: string | null; // Filter by status
  priority: string | null;
};

export async function getTasks(params: ParamType): Promise<TaskResponse> {
  try {
    const response = await axios.get<TaskType[]>(API_URL, { params });
    return {
      data: response.data,
      success: true,
      message: "Task list retrieved successfully",
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: axios.isAxiosError(error)
        ? error.message
        : "Unknown error occurred while fetching tasks",
    };
  }
}
