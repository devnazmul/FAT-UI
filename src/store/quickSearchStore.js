import { create } from "zustand";

const quickSearchStore = create((set) => {
  return {
    isQuickSearchOpen: false,
    setIsQuickSearchOpen: (value) => {
      set({ isQuickSearchOpen: value });
    }
  };
});

export default quickSearchStore;
