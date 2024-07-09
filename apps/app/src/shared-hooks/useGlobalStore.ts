import { create } from "zustand";

interface AppState {
  isLoading: boolean;
}

interface AppActions {
  setLoading: (isLoading: boolean) => void;
}

export const useGlobalStore = create<AppState & AppActions>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
