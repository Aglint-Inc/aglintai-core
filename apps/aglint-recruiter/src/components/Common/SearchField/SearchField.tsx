//new component
import { InputAdornment, Stack } from '@mui/material';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';

import UITextField from '../UITextField';

export default function SearchField({
  value,
  onChange,
  onClear,
  placeholder,
}: {
  value: string;
  placeholder?: string;
  onChange: any;
  onClear: any;
}) {
  return (
    <UITextField
      height={32}
      width='250px'
      InputProps={{
        endAdornment: value ? (
          <Stack
            onClick={onClear}
            sx={{
              '&:hover': {
                backgroundColor: 'var(--neutral-3)',
                cursor: 'pointer',
              },
            }}
          >
            <GlobalIcon iconName='close' size={5} />
          </Stack>
        ) : (
          <InputAdornment position='end'>
            <GlobalIcon iconName='search' size='5' />
          </InputAdornment>
        ),
      }}
      placeholder={placeholder || ''}
      value={value}
      onChange={onChange}
    />
  );
}
