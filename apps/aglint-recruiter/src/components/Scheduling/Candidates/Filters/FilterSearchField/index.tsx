import { InputAdornment } from '@mui/material';
import React from 'react';

import Icon from '@/src/components/Common/Icons/Icon';
import UITextField from '@/src/components/Common/UITextField';

import { setFilter, useFilterCandidateStore } from '../../filter-store';

function FilterSearchField() {
  const textSearch = useFilterCandidateStore(
    (state) => state.filter.textSearch,
  );
  return (
    <>
      <UITextField
        height={32}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Icon variant='Search' width='14' height='14' />
            </InputAdornment>
          ),
        }}
        placeholder='Search by Name'
        value={textSearch}
        onChange={(e) => {
          setFilter({ textSearch: e.target.value });
        }}
        width='250px'
      />
    </>
  );
}

export default FilterSearchField;
