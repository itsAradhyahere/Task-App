import { create } from "zustand";

export type ModeType = "create" | "edit" | "delete";

export type ModeParamType = {
  state: ModeType;
  id?: string; // Optional id of task invoking mode action
};

interface State {
  mode: ModeParamType;
  createIsOpen: boolean;
  deleteIsOpen: boolean;
}

interface Action {
  setMode: (param: ModeParamType) => void;
  setCreateIsOpen: (open: boolean) => void;
  setDeleteIsOpen: (open: boolean) => void;
}

const initialState: State = {
  mode: { state: "create" },
  createIsOpen: false,
  deleteIsOpen: false,
};

export const useAppStore = create<State & Action>((set) => ({
  ...initialState,
  setMode: ({ state, id }) => set({ mode: { state, id } }),
  setCreateIsOpen: (open) => set({ createIsOpen: open }),
  setDeleteIsOpen: (open) => set({ deleteIsOpen: open }),
}));
