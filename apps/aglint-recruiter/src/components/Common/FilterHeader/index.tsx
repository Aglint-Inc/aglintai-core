import { Stack } from '@mui/material';
import React from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

import SearchField from '../SearchField/SearchField';
import DateRangeSelector from './DateRangeSelector';
import { FiltersComponent, FilterTypes } from './FilterComponents';
import SortComponent, { sortComponentType } from './SortComponent';

export default function FilterHeader({
  search,
  handelResetFilter,
  filters,
  sort,
  dateRangeSelector,
  showFiltersByDefault,
  setShowFilters = (x) => {
    x;
  },
}: FilterHeaderType) {
  const { filter } = useTasksContext();
  function areValuesEmpty() {
    for (const key in filter) {
      if (
        // eslint-disable-next-line security/detect-object-injection
        Array.isArray(filter[key].values) &&
        // eslint-disable-next-line security/detect-object-injection
        filter[key].values.length !== 0
      ) {
        return true;
      }
    }
    return false;
  }

  return (
    <Stack direction={'row'} gap={2}>
      {Boolean(search) && (
        <SearchField
          value={search.value}
          onChange={(e) => search.setValue(e.target.value)}
          onClear={() => search.setValue('')}
          placeholder={search.placeholder}
        />
      )}
      <Stack direction={'row'} justifyContent={'space-between'} flexGrow={1}>
        <Stack direction={'row'} gap={2}>
          <FiltersComponent
            filters={filters}
            showFilters={showFiltersByDefault}
            setShowFilters={setShowFilters}
          />
          {Boolean(dateRangeSelector) && (
            <DateRangeSelector {...dateRangeSelector} />
          )}
        </Stack>
      </Stack>
      {Boolean(sort) && <SortComponent {...sort} />}
      {areValuesEmpty() && (
        <ButtonGhost
          textButton='Reset All'
          size={2}
          iconName='refresh'
          isLeftIcon
          onClickButton={{ onClick: handelResetFilter }}
        />
      )}
    </Stack>
  );
}

export type FilterHeaderType = {
  handelResetFilter?: () => void;
  search?: {
    value: string;
    // eslint-disable-next-line no-unused-vars
    setValue: (x: string) => void;
    placeholder?: string;
  };
  filters: FilterTypes[];
  showFiltersByDefault?: string[];
  // eslint-disable-next-line no-unused-vars
  setShowFilters?: (x: string[]) => void;
  sort?: sortComponentType;
  dateRangeSelector?: {
    name: string;
    // eslint-disable-next-line no-unused-vars
    setValue: (x: any) => void;
  };
};
