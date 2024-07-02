import { useEffect } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';

import {
  FilterType,
  setFilterVisible,
  useFilterCandidateStore,
} from '../filter-store';
import FilterCordinator from './FilterCordinator';
import FilterInterviewModule from './FilterInterviewModule';
import FilterJob from './FilterJob';
import FilterScheduleType from './FilterScheduleType';
import FilterSearchField from './FilterSearchField';
import FilterStatus from './FilterStatus';

function AllFilters() {
  const filterVisible = useFilterCandidateStore((state) => state.filterVisible);
  const { reset, isInitialState } = useFilterCandidateStore();

  useEffect(() => {
    const initalAllFilterShow = Object.keys(FilterType);
    setFilterVisible(initalAllFilterShow as FilterType[]);
  }, []);

  return (
    <>
      <FilterSearchField />
      {filterVisible.map((filterType) => {
        switch (filterType) {
          case FilterType.relatedJobs:
            return <FilterJob key={filterType} />;
          case FilterType.status:
            return <FilterStatus key={filterType} />;
          case FilterType.interviewPanels:
            return <FilterInterviewModule key={filterType} />;
          case FilterType.scheduleType:
            return <FilterScheduleType key={filterType} />;
          case FilterType.coordinator:
            return <FilterCordinator key={filterType} />;
          default:
            return null;
        }
      })}
      {isInitialState() && (
        <ButtonGhost
          textButton='Reset All'
          onClickButton={{
            onClick: reset,
          }}
          size={2}
          color={'error'}
          isLeftIcon
          iconName='refresh'
        />
      )}
    </>
  );
}

export default AllFilters;
