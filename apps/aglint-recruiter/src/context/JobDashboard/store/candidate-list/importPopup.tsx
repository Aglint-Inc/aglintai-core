import { CreateSlice } from '.';

type ImportPopup = {
  open: boolean;
};

export type ImportPopupSlice = {
  importPopup: ImportPopup;
  // eslint-disable-next-line no-unused-vars
  setImportPopup: (importPopup: Partial<ImportPopup>) => void;
  resetImportPopup: () => void;
};

const initialImportPopup: ImportPopup = {
  open: false,
};

export const createImportPopupSlice: CreateSlice<ImportPopupSlice> = (set) => ({
  importPopup: structuredClone(initialImportPopup),
  setImportPopup: (importPopup) =>
    set((state) => ({
      importPopup: { ...state.importPopup, ...importPopup },
    })),
  resetImportPopup: () =>
    set({ importPopup: structuredClone(initialImportPopup) }),
});
