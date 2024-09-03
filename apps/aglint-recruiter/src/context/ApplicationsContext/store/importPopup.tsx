import { type CreateSlice } from '.';

export type ImportPopupSlice = {
  importPopup: boolean;
  // eslint-disable-next-line no-unused-vars
  setImportPopup: (importPopup: boolean) => void;
  resetImportPopup: () => void;
};

const initialImportPopup: boolean = false;

export const createImportPopupSlice: CreateSlice<ImportPopupSlice> = (set) => ({
  importPopup: initialImportPopup,
  setImportPopup: (importPopup) =>
    set({
      importPopup,
    }),
  resetImportPopup: () => set({ importPopup: initialImportPopup }),
});
