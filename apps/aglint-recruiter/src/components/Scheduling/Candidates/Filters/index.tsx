import { useEffect } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';

import {
  FilterType,
  setFilterVisible,
  useFilterCandidateStore,
} from '../filter-store';
import FilterCordinator from './FilterCordinator';
import FilterDepartment from './FilterDepartment';
import FilterJob from './FilterJob';
import FilterSearchField from './FilterSearchField';

function AllFilters() {
  const filterVisible = useFilterCandidateStore((state) => state.filterVisible);
  const { reset, isInitialState } = useFilterCandidateStore();

  useEffect(() => {
    const initalAllFilterShow = Object.keys(FilterType);
    setFilterVisible(initalAllFilterShow as FilterType[]);
  }, []);

  const isResetVisiable = isInitialState();
  return (
    <>
      <FilterSearchField />
      {filterVisible.map((filterType) => {
        switch (filterType) {
          case FilterType.jobs:
            return <FilterJob key={filterType} />;
          case FilterType.departments:
            return <FilterDepartment key={filterType} />;
          case FilterType.coordinator:
            return <FilterCordinator key={filterType} />;
          default:
            return null;
        }
      })}
      {isResetVisiable && (
        <ButtonGhost
          textButton='Reset All'
          onClickButton={{
            onClick: reset,
          }}
          size={1}
          color={'neutral'}
          isLeftIcon
          iconName='refresh'
        />
      )}
    </>
  );
}

export default AllFilters;
