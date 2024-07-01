import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FilterModuleState {
  textSearch: string;
  departments: string[];
  created_by: string[];
  reset?: () => void;
}

const initialState: FilterModuleState = {
  textSearch: '',
  departments: [],
  created_by: [],
};

export const useFilterModuleStore = create<FilterModuleState>()(
  persist(
    (set) => ({
      ...initialState,
      reset: () => set(initialState),
    }),
    {
      name: 'filter-module',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const setTextSearch = (textSearch: string) =>
  useFilterModuleStore.setState({ textSearch });

export const setDepartments = (departments: string[]) =>
  useFilterModuleStore.setState({ departments });

export const setCreatedBy = (created_by: string[]) =>
  useFilterModuleStore.setState({ created_by });
