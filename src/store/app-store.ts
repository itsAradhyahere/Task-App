import { create } from "zustand";
import { BoardType, ModeType, PriorityType, TaskType } from "../type";

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

export type ActiveTaskParam = {
  id?: string;
  boardType: BoardType;
};

interface State {
  mode: ModeParamType;
  createIsOpen: CreateParamType;
  deleteIsOpen: DeleteParamType;
  selectedTask: TaskType | null;
  activeTask: ActiveTaskParam;
  filter: BoardType | null;
  priority: PriorityType | null;
}

interface Action {
  setMode: (param: ModeParamType) => void;
  setCreateIsOpen: (param: CreateParamType) => void;
  setDeleteIsOpen: (params: DeleteParamType) => void;
  setSelectedTask: (task: State["selectedTask"]) => void;
  setActiveTask: (param: State["activeTask"]) => void;
  setFilter: (filter: State["filter"]) => void;
  setPriority: (priority: State["priority"]) => void;
}

const initialState: State = {
  mode: { state: "create" },
  createIsOpen: { state: false },
  deleteIsOpen: { state: false },
  selectedTask: null,
  activeTask: { boardType: "todo" },
  filter: null,
  priority: null,
};

export const useAppStore = create<State & Action>((set) => ({
  ...initialState,
  setMode: ({ state, id }) => set({ mode: { state, id } }),
  setCreateIsOpen: ({ state, type }) => set({ createIsOpen: { state, type } }),
  setDeleteIsOpen: ({ state, id }) => set({ deleteIsOpen: { state, id } }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setActiveTask: (state) =>
    set({ activeTask: { boardType: state.boardType, id: state?.id } }),
  setFilter: (filter) => set({ filter }),
  setPriority: (priority) => set({ priority }),
}));
