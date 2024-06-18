import { DatabaseEnums } from '@aglint/shared-types';

import { CreateSlice } from '.';

type Section = DatabaseEnums['application_status'];

export type SectionSlice = {
  section: Section;
  // eslint-disable-next-line no-unused-vars
  setSection: (section: Section) => void;
  resetSection: () => void;
};

const initialSection = 'new' as Section;

export const createSectionSlice: CreateSlice<SectionSlice> = (set) => ({
  section: initialSection,
  setSection: (section) => set({ section }),
  resetSection: () => set({ section: initialSection }),
});
