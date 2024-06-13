import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  month: 1,
  setUser: (user) => set({ user }),
  setMonth: (newMonth) => set({ month: newMonth }),
  setExpenses: (newExpenses) => set({ expenses: newExpenses }),
}));

export default useStore;
