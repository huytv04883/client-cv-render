import { create } from 'zustand';

type AppState = {
  isOpenMobileSettings: boolean;
  setOpenMobileSettings: (isOpen: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isOpenMobileSettings: false,
  setOpenMobileSettings: (isOpen: boolean) => {
    set(() => ({ isOpenMobileSettings: isOpen }));
  },
}));
