import { InputAdornment } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

import Icon from '../Icons/Icon';
import UITextField from '../UITextField';

type SearchComponentType = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (x: string) => void;
  placeholder?: string;
};

const SearchComponent = ({
  value,
  setValue,
  placeholder,
}: SearchComponentType) => {
  return (
    <Stack>
      <UITextField
        width='400px'
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Icon variant='JobSearch' height='14' />
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </Stack>
  );
};

export default SearchComponent;
