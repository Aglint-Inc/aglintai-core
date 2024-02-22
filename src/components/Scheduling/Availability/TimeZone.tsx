import { Autocomplete } from '@mui/material';
import countryTimeZone from 'countries-and-timezones';
import React from 'react';

import { StateAvailibility } from './availability.types';
import UITextField from '../../Common/UITextField';

const TimeZone = ({ timeZone, setTimeZone }) => {
  return (
    <div style={{ width: '200px' }}>
      <Autocomplete
        options={getTimezoneList()}
        onChange={(event: any, newValue: StateAvailibility['timeZone']) => {
          if (!newValue) return;
          setTimeZone(newValue);
        }}
        renderInput={(params) => (
          <UITextField
            rest={{ ...params }}
            placeholder='(UTC +05:30 ) Asia/Calcutta'
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  width: '150px !important',
                },

                // width: '200px',
              },
              fullWidth: true,
              // classes: { formControl: 'tasfdha' },
            }}
          />
        )}
        defaultValue={timeZone}
        value={timeZone}
        freeSolo
        disablePortal
        fullWidth
      />
    </div>
  );
};

export default TimeZone;

const getTimezoneList = () => {
  let timezone = countryTimeZone.getAllTimezones();
  return Object.keys(timezone).map((key) => ({
    label: `(UTC ${timezone[String(key)].utcOffsetStr} ) ` + key,
    value: timezone[String(key)].name,
  }));
};
