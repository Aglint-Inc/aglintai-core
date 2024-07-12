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
  isFullWidth = false,
}: {
  value: string;
  placeholder?: string;
  onChange: (
    // eslint-disable-next-line no-unused-vars
    x: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onClear: any;
  isFullWidth?: boolean;
}) {
  return (
    <UITextField
      height={32}
      width={isFullWidth ? undefined : '250px'}
      fullWidth={isFullWidth}
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
