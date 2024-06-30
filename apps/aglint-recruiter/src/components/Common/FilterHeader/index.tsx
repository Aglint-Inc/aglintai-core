import { Stack } from '@mui/material';
// import { Dayjs } from 'dayjs';
import React from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';

import SearchField from '../SearchField/SearchField';
import DateRangeSelector from './DateRangeSelector';
import { FiltersComponent, FilterTypes } from './FilterComponents';
import SortComponent, { sortComponentType } from './SortComponent';

export default function FilterHeader({
  search,
  handelResetAll,
  filters,
  isResetAll,
  sort,
  dateRangeSelector,
  showFiltersByDefault,
  setShowFilters = (x) => {
    x;
  },
}: FilterHeaderType) {
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
      {isResetAll && (
        <ButtonGhost
          textButton='Reset All'
          size={2}
          iconName='refresh'
          isLeftIcon
          onClickButton={{ onClick: handelResetAll }}
        />
      )}
    </Stack>
  );
}

export type FilterHeaderType = {
  handelResetAll?: () => void;
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
  isResetAll?: boolean;
  dateRangeSelector?: {
    name: string;
    values: string[];
    // eslint-disable-next-line no-unused-vars
    setValue: (x: any) => void;
  };
};
