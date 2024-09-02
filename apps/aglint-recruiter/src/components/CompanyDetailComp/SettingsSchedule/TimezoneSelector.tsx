import { Autocomplete, Stack, Typography } from '@mui/material';
import React from 'react';

import timeZones from '@/src/utils/timeZone';

import UITextField from '../../Common/UITextField';

type TZ = (typeof timeZones)[number];

export type TimezoneObj = {
  [key in keyof TZ]: TZ[key];
};

type TimezoneSelectorProps = {
  value: TimezoneObj;
  setValue: any;
  // setValue: (value: TimezoneObj) => void;
  disabled: boolean;
};

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
  disabled,
  setValue,
  value,
}) => {
  return (
    <Stack spacing={'var(--space-2)'} width={420}>
      <Autocomplete
        disabled={disabled}
        disableClearable
        options={timeZones}
        value={value}
        onChange={(event, value) => {
          if (value) {
            setValue(value);
          }
        }}
        autoComplete={false}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Typography variant='body1' color={'var(--neutral-12)'}>
                {option.label}
              </Typography>
            </li>
          );
        }}
        renderInput={(params) => {
          return (
            <UITextField
              rest={{ ...params }}
              labelSize='medium'
              label=''
              placeholder='Ex. America/Los_Angeles (GMT-08:00)'
              InputProps={{
                ...params.InputProps,
                autoComplete: 'new-password',
              }}
            />
          );
        }}
      />
    </Stack>
  );
};

export default TimezoneSelector;
