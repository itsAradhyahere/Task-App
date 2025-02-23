import { create } from "zustand";
import { BoardType, TaskType } from "../type";

export type ModeType = "create" | "edit" | "delete";

export type ModeParamType = {
  state: ModeType;
  id?: string; // Optional id of task invoking mode action
};

export type CreateParamType = {
  state: boolean;
  type?: BoardType;
};

export type DeleteParamType = {
  state: boolean;
  id?: string;
};

interface State {
  mode: ModeParamType;
  createIsOpen: CreateParamType;
  deleteIsOpen: DeleteParamType;
  selectedTask: TaskType | null;
}

interface Action {
  setMode: (param: ModeParamType) => void;
  setCreateIsOpen: (param: CreateParamType) => void;
  setDeleteIsOpen: (params: DeleteParamType) => void;
  setSelectedTask: (task: State["selectedTask"]) => void;
}

const initialState: State = {
  mode: { state: "create" },
  createIsOpen: { state: false },
  deleteIsOpen: { state: false },
  selectedTask: null,
};

export const useAppStore = create<State & Action>((set) => ({
  ...initialState,
  setMode: ({ state, id }) => set({ mode: { state, id } }),
  setCreateIsOpen: ({ state, type }) => set({ createIsOpen: { state, type } }),
  setDeleteIsOpen: ({ state, id }) => set({ deleteIsOpen: { state, id } }),
  setSelectedTask: (task) => set({ selectedTask: task }),
}));
