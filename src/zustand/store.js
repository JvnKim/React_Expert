import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  month: 1,
  setUser: (user) => set({ user }),
  setMonth: (month) => set({ month }),
}));

export default useStore;
