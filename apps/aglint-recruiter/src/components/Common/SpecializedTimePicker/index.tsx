import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs, { type Dayjs } from 'dayjs';
import * as React from 'react';

import UITextField from '../UITextField';

const SpecializedTimePicker = ({
  label,
  defaultValue,
  value,
  onChange,
  minutesStep = 5,
  maxTime = undefined,
  minTime = undefined,
  disable,
  disableIgnoringDatePartForTimeValidation = false,
}: {
  label?: string;
  defaultValue?: Dayjs;
  value?: Dayjs;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
  minutesStep?: number;
  maxTime?: Dayjs;
  minTime?: Dayjs;
  disable?: boolean;
  disableIgnoringDatePartForTimeValidation?: boolean;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        minutesStep={minutesStep}
        defaultValue={defaultValue}
        label={label}
        value={value}
        onChange={(date: dayjs.Dayjs | null) => {
          if (date && dayjs(date).isValid()) onChange(date);
          else onChange(null);
        }}
        slots={{
          textField: UITextField as any,
        }}
        maxTime={maxTime}
        minTime={minTime}
        disabled={disable}
        disableIgnoringDatePartForTimeValidation={
          disableIgnoringDatePartForTimeValidation
        }
      />
    </LocalizationProvider>
  );
};

export default SpecializedTimePicker;
