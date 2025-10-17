import { create } from "zustand";

interface SelectionStore {
  selectedTableA: any[];
  selectedTableB: any[];
  setSelectedTableA: (rows: any[]) => void;
  setSelectedTableB: (rows: any[]) => void;
}

export const useSelectionStore = create<SelectionStore>((set) => ({
  selectedTableA: [],
  selectedTableB: [],
  setSelectedTableA: (rows) => set({ selectedTableA: rows }),
  setSelectedTableB: (rows) => set({ selectedTableB: rows }),
}));
