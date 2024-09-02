import { type DatabaseEnums } from '@aglint/shared-types';

import { type CreateSlice } from '.';

type ActionPopup = DatabaseEnums['application_status'];

export type ActionPopupSlice = {
  actionPopup: ActionPopup;
  // eslint-disable-next-line no-unused-vars
  setActionPopup: (actionPopup: ActionPopup) => void;
  resetActionPopup: () => void;
};

const initialActionPopup: ActionPopup = null;

export const createActionPopupSlice: CreateSlice<ActionPopupSlice> = (set) => ({
  actionPopup: initialActionPopup,
  setActionPopup: (actionPopup) =>
    set({
      actionPopup,
    }),
  resetActionPopup: () => set({ actionPopup: initialActionPopup }),
});
