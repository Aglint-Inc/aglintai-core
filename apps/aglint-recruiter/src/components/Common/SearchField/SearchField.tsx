//new component
import { InputAdornment, Stack } from '@mui/material';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';

import UITextField from '../UITextField';

export default function SearchField({
  value,
  onChange,
  onClear,
  onFocus,
  onBlur,
  placeholder,
  isFullWidth = false,
}: {
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClear: any;
  isFullWidth?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <UITextField
      height={26}
      width={isFullWidth ? undefined : '250px'}
      fullWidth={isFullWidth}
      onFocus={onFocus}
      onBlur={onBlur}
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
