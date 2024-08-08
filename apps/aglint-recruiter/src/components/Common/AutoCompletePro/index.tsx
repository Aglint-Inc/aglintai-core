import { Autocomplete, Stack, Typography } from '@mui/material';
import React from 'react';

import UITextField from '../UITextField';

function AutoCompletePro<T>({
  value,
  options,
  label,
  required,
  placeholder,
  onChange,
  getSelectLabel = (x) => x as string,
  getOptionLabel = (props, option) => <li {...props}>{String(option)}</li>,
  error,
  onFocus = () => {},
}: {
  value: T;
  options: T[];
  label?: string;
  placeholder?: string;
  required?: Boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: T) => void;
  // eslint-disable-next-line no-unused-vars
  getSelectLabel?: (value: T) => string;
  getOptionLabel?: (
    // eslint-disable-next-line no-unused-vars
    a: React.HTMLAttributes<HTMLLIElement>,
    // eslint-disable-next-line no-unused-vars
    b: T,
  ) => React.ReactNode;
  error?: string;
  onFocus?: () => void;
}) {
  return (
    <>
      {Boolean(label) && (
        <Stack direction={'row'}>
          <Typography>{label}</Typography>
          {required && (
            <Typography sx={{ color: 'var(--error-9)', pl: 0.5 }}>*</Typography>
          )}
        </Stack>
      )}
      <Autocomplete
        fullWidth
        value={value}
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        options={options}
        getOptionLabel={getSelectLabel}
        renderOption={getOptionLabel}
        renderInput={(params) => (
          <UITextField
            {...params}
            error={Boolean(error)}
            helperText={error?.length ? error : null}
            onFocus={onFocus}
            required
            name={label}
            // label={label}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
}

export default AutoCompletePro;
