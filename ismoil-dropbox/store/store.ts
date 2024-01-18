import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fileId: string) => void;

  fileName: string;
  setFileName: (fileName: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set(() => ({ isDeleteModalOpen: open })),

  isEditModalOpen: false,
  setIsEditModalOpen: (open) => set(() => ({ isEditModalOpen: open })),

  fileId: null,
  setFileId: (fileId) => set(() => ({ fileId })),

  fileName: "",
  setFileName: (fileName) => set(() => ({ fileName })),
}));
