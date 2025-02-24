import axios from "axios";

type ErrorType<T = unknown> = {
  data?: T;
  success: boolean;
  message: string;
};

export function handleError<T>(
  error: unknown,
  genericMessage: string
): ErrorType<T> {
  const isAxiosError = axios.isAxiosError(error);

  return {
    data: null as T,
    success: false,
    message: isAxiosError ? error.message : genericMessage,
  };
}
