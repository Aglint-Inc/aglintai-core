import { InputAdornment } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';

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
        width='250px'
        height={32}
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <GlobalIcon iconName={'search'} size={'5'} />
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
