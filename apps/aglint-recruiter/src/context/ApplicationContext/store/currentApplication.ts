import { DatabaseTable } from '@aglint/shared-types';

import { CreateSlice } from '.';

type Drawer = {
  open: boolean;
  application_id: DatabaseTable['applications']['id'];
};

export type DrawerSlice = {
  drawer: Drawer;
  // eslint-disable-next-line no-unused-vars
  setDrawer: (drawer: Partial<Drawer>) => void;
  // eslint-disable-next-line no-unused-vars
  handleOpen: (drawer: Pick<Drawer, 'application_id'>) => void;
  handlClose: () => void;
  resetDrawer: () => void;
};

const initialDrawer: Drawer = {
  application_id: null,
  open: false,
};

export const createDrawerSlice: CreateSlice<DrawerSlice> = (set) => ({
  drawer: initialDrawer,
  setDrawer: (drawer) =>
    set((state) => ({ ...state, ...structuredClone(drawer) })),
  resetDrawer: () => set({ drawer: initialDrawer }),
  handleOpen: ({ application_id }) => {
    set({ drawer: { open: true, application_id } });
  },
  handlClose: () => {
    set(({ drawer }) => ({ drawer: { ...drawer, open: false } }));
    setTimeout(
      () =>
        set(({ drawer }) => ({ drawer: { ...drawer, application_id: null } })),
      200,
    );
  },
});
