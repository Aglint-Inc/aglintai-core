import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FilterModuleState {
  textSearch: string;
  department: string;
}

const initialState: FilterModuleState = {
  textSearch: '',
  department: '',
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
