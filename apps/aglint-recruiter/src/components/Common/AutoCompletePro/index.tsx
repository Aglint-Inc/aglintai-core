import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onFocus = () => {},
}: {
  value: T;
  options: T[];
  label?: string;
  placeholder?: string;
  required?: boolean;
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
        <div className='flex flex-row'>
          <span className='text-sm'>{label}</span>
          {required && <span className='pl-0.5 text-sm text-red-600'>*</span>}
        </div>
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
          <TextField
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
