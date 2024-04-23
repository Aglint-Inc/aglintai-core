import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FilterModuleState {
  textSearch: string;
  department: string;
  created_by: string[];
}

const initialState: FilterModuleState = {
  textSearch: '',
  department: '',
  created_by: [],
};

export const useFilterModuleStore = create<FilterModuleState>()(
  persist(
    () => ({
      ...initialState,
    }),
    {
      name: 'filter-module',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const setTextSearch = (textSearch: string) =>
  useFilterModuleStore.setState({ textSearch });

export const setDepartment = (department: string) =>
  useFilterModuleStore.setState({ department });

export const setCreatedBy = (created_by: string[]) =>
  useFilterModuleStore.setState({ created_by });
