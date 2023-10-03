import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import * as React from 'react';

export default function SpecializedTimePicker({
  label,
  value,
  disabled = false,
  onChange,
  setValue,
}: {
  disabled?: boolean;
  label: string;
  value: Dayjs;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  setValue?: (e: any) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={disabled ? null : value}
        disabled={disabled}
        onChange={(e) => {
          if (onChange) onChange(e);
          if (setValue) setValue(e);
        }}
      />
    </LocalizationProvider>
  );
}
