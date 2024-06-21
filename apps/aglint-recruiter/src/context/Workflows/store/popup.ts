/* eslint-disable security/detect-object-injection */
import { cloneDeep } from 'lodash';

import { initialForm } from '@/src/components/Workflow/common';
import { Workflow } from '@/src/types/workflow.types';

import { CreateSlice } from '.';

type Inputs = Pick<Workflow, 'title' | 'auto_connect' | 'description'>;

type Form<T extends keyof Inputs = keyof Inputs> = {
  [id in T]: {
    value: Inputs[id];
    error: boolean;
    helperText: string;
    required: boolean;
    // eslint-disable-next-line no-unused-vars
    validation: (value: Inputs[id]) => boolean;
  };
};

type Popup = {
  open: boolean;
  form: Form;
};

export type PopupSlice = {
  popup: Popup;
  // eslint-disable-next-line no-unused-vars
  setPopup: (popup: Partial<Popup>) => void;
  resetPopup: () => void;
  // eslint-disable-next-line no-unused-vars
  closePopup: (inputs?: Inputs) => void;
};

const initialPopup: Popup = {
  open: false,
  form: initialForm,
};

export const createPopupSlice: CreateSlice<PopupSlice> = (set) => ({
  popup: cloneDeep(initialPopup),
  setPopup: (popup) =>
    set((state) => ({
      popup: { ...state.popup, ...popup },
    })),
  resetPopup: () => set({ popup: cloneDeep(initialPopup) }),
  closePopup: (inputs) => {
    set((state) => ({
      popup: { ...state.popup, open: false },
    }));
    setTimeout(
      () =>
        set((state) => ({
          popup: {
            ...state.popup,
            form: inputs ? getForms(inputs) : cloneDeep(initialForm),
          },
        })),
      1000,
    );
  },
});

const getForms = (inputs: Inputs) => {
  return Object.assign(
    {},
    ...Object.entries(inputs).map(([key, value]) => ({
      [key]: { ...cloneDeep(initialForm[key]), value },
    })),
  );
};
