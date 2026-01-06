import { create } from 'zustand';

type AppState = {
  isOpenMobileSettings: boolean;
  isExpandedSidebarSettings: boolean;
  setOpenMobileSettings: (isOpen: boolean) => void;
  setExpandedSidebarSettings: (isExpanded: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isOpenMobileSettings: false,
  isExpandedSidebarSettings: true,
  setOpenMobileSettings: (isOpen: boolean) => {
    set(() => ({ isOpenMobileSettings: isOpen }));
  },
  setExpandedSidebarSettings: (isExpanded: boolean) => {
    set(() => ({ isExpandedSidebarSettings: isExpanded }));
  },
}));
