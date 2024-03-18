import React from 'react';

import DateRangeFilterComp from './DateRangeFilter';
import FilterInterviewModule from './FilterInterviewModule';
import FilterJob from './FilterJob';
import FilterScheduleType from './FilterScheduleType';
import FilterSearchField from './FilterSearchField';
import FilterStatus from './FilterStatus';
import { FilterType, useInterviewSchedulingStore } from '../store';

function AllFilters() {
  const filterVisible = useInterviewSchedulingStore(
    (state) => state.filterVisible,
  );
  return (
    <>
      <FilterSearchField />
      {filterVisible.map((filterType) => {
        switch (filterType) {
          case FilterType.relatedJobs:
            return <FilterJob key={filterType} />;
          case FilterType.interviewPanels:
            return <FilterInterviewModule key={filterType} />;
          case FilterType.dateRange:
            return <DateRangeFilterComp key={filterType} />;
          case FilterType.scheduleType:
            return <FilterScheduleType key={filterType} />;
          case FilterType.status:
            return <FilterStatus key={filterType} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export default AllFilters;
