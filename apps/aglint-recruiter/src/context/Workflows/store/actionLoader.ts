import { type CreateSlice } from '.';

export type ActionsLoadSlice = {
  actionsLoad: boolean;
  // eslint-disable-next-line no-unused-vars
  setActionsLoad: (actionsLoad: boolean) => void;
  resetActionsLoad: () => void;
};

const initialActionsLoad: ActionsLoadSlice['actionsLoad'] = false;

export const createActionsLoadSlice: CreateSlice<ActionsLoadSlice> = (set) => ({
  actionsLoad: initialActionsLoad,
  setActionsLoad: (actionsLoad) =>
    set({
      actionsLoad,
    }),
  resetActionsLoad: () => set({ actionsLoad: initialActionsLoad }),
});
