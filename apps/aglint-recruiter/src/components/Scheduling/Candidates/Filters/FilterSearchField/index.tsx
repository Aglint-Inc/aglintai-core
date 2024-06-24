import { InputAdornment } from '@mui/material';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import UITextField from '@/src/components/Common/UITextField';

import { setFilter, useFilterCandidateStore } from '../../filter-store';

function FilterSearchField() {
  const textSearch = useFilterCandidateStore(
    (state) => state.filter.textSearch,
  );
  return (
    <>
      <UITextField
        width='250px'
        height={32}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <GlobalIcon iconName='search' size='5' />
            </InputAdornment>
          ),
        }}
        placeholder='Search by name.'
        value={textSearch}
        onChange={(e) => {
          setFilter({ textSearch: e.target.value });
        }}
      />
    </>
  );
}

export default FilterSearchField;
