import { type CreateSlice } from '.';

export type ResumePreviewSlice = {
  preview: boolean;
  // eslint-disable-next-line no-unused-vars
  setPreview: (preview: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  resetPreview: () => void;
};

const initialPreview: boolean = false;

export const createResumePreviewSlice: CreateSlice<ResumePreviewSlice> = (
  set,
) => ({
  preview: initialPreview,
  setPreview: (preview) => set({ preview }),
  resetPreview: () => set({ preview: initialPreview }),
});
