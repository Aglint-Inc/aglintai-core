import { InputAdornment } from '@mui/material';
import React from 'react';

import Icon from '@/src/components/Common/Icons/Icon';
import UITextField from '@/src/components/Common/UITextField';

import { setFilter } from '../../store';

function FilterSearchField() {
  return (
    <>
      <UITextField
        rest={{
          style: {
            borderRadius: '41px',
          },
        }}
        InputProps={{
          sx: {
            borderRadius: '10px',
            minWidth: '250px',
          },
          endAdornment: (
            <InputAdornment position='end'>
              <Icon variant='JobSearch' height='14' />
            </InputAdornment>
          ),
        }}
        placeholder='Search by name'
        onChange={(e) => {
          setFilter({ textSearch: e.target.value });
        }}
      />
    </>
  );
}

export default FilterSearchField;
