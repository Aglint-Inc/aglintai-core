import { Stack } from '@mui/material';
import React from 'react';

import DateRangeSelector from './DateRangeSelector';
import { FiltersComponent, FilterTypes } from './FilterComponents';
import SearchComponent from './SearchComponent';
import SortComponent, { sortComponentType } from './SortComponent';

export default function FilterHeader({
  search,
  filters,
  sort,
  dateRangeSelector,
  showFiltersByDefault,
  setShowFilters = (x) => {
    x;
  },
}: FilterHeaderType) {
  return (
    <Stack
      direction={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      gap={2}
    >
      {Boolean(search) && <SearchComponent {...search} />}
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
    </Stack>
  );
}

export type FilterHeaderType = {
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
