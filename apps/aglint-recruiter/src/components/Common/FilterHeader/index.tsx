import { Button } from '@components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import SearchField from '../SearchField/SearchField';
import DateRangeSelector from './DateRangeSelector';
import { FiltersComponent, type FilterTypes } from './FilterComponents';
import SortComponent, { type sortComponentType } from './SortComponent';

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
  handelResetAll =
    handelResetAll ||
    function () {
      filters.forEach((filter) => {
        switch (filter.type) {
          case 'filter':
          case 'nested-filter': {
            filter.setValue([]);
            break;
          }
          case 'multi-section-filter': {
            filter.setValue({});
            break;
          }
        }
      });
    };
  const isFiltersActive = filters.some((filter) => {
    switch (filter.type) {
      case 'filter': {
        return filter.value.length > 0;
      }
      case 'nested-filter': {
        return Object.keys(filter.value).length > 0;
      }
      case 'multi-section-filter': {
        return Object.values(filter.value).some((value) => value.length > 0);
      }
    }
  });

  const [debouncedSearch, setDebouncedSearch] = useState(search?.value ?? '');
  useEffect(() => {
    if (search?.setValue) {
      const timeout = setTimeout(() => search.setValue(debouncedSearch), 400);
      return () => clearTimeout(timeout);
    }
  }, [debouncedSearch]);

  return (
    <div className='flex w-full flex-row items-center justify-between'>
      <div className='flex flex-row space-x-2'>
        {Boolean(search) && (
          <SearchField
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            onClear={() => setDebouncedSearch('')}
            placeholder={search.placeholder}
            height='h-9'
          />
        )}
        <div className='flex flex-grow flex-row justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex flex-row gap-2'>
              <FiltersComponent
                filters={filters}
                showFilters={showFiltersByDefault}
                setShowFilters={setShowFilters}
              />
              {Boolean(dateRangeSelector) && (
                <DateRangeSelector {...dateRangeSelector} />
              )}
              {isResetAll && isFiltersActive && (
                <Button
                  variant='ghost'
                  disabled={!isFiltersActive}
                  size='md'
                  onClick={handelResetAll}
                >
                  <RotateCcw className='mr-2 h-4 w-4' />
                  Reset All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {Boolean(sort) && <SortComponent {...sort} />}
    </div>
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
  filters?: FilterTypes[];
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
    disablePast?: boolean;
  };
};
