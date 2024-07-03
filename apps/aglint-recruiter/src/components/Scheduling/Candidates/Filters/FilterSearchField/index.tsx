import React from 'react';

import SearchField from '@/src/components/Common/SearchField/SearchField';

import { setFilter, useFilterCandidateStore } from '../../filter-store';

function FilterSearchField() {
  const textSearch = useFilterCandidateStore(
    (state) => state.filter.textSearch,
  );
  return (
    <>
      <SearchField
        value={textSearch}
        onChange={(e) => {
          setFilter({ textSearch: e.target.value });
        }}
        placeholder='Search by name.'
        onClear={() => setFilter({ textSearch: '' })}
      />
    </>
  );
}

export default FilterSearchField;
