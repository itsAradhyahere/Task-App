import axios from "axios";
import { API_URL } from "./api";
import { TaskType } from "../type";
import { TaskResponse } from "./create-task";
import { handleError } from "../config/error-handler";

type Payload = {
  status: string | null;
};

export async function updateTaskStatus(
  id: string,
  payload: Payload
): Promise<TaskResponse> {
  try {
    const response = await axios.put<TaskType | null>(
      `${API_URL}/${id}`,
      payload
    );

    return {
      data: response.data,
      success: true,
      message: "Task moved successfully",
    };
  } catch (error) {
    return handleError<TaskType | null>(error, "Failed to move task to board");
  }
}
