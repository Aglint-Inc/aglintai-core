import { type CreateSlice } from '.';

export type PublishButtonSlice = {
  publishing: number;
  // eslint-disable-next-line no-unused-vars
  setPublishing: (publishing: number) => void;
  resetPublishing: () => void;
};

export const createPublishButtonSlice: CreateSlice<PublishButtonSlice> = (
  set,
) => ({
  publishing: 0,
  setPublishing: (publishing) => set({ publishing }),
  resetPublishing: () => set({ publishing: 0 }),
});
