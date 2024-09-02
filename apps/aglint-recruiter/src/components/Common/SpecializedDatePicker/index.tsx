import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';
import React from 'react';

import { DateIcon } from '../../CompanyDetailComp/SettingsSchedule/Components/DateSelector';
import UITextField from '../UITextField';

export default function SpecializedDatePicker({
  label,
  value,
  maxDate,
  minDate,
  disabled = false,
  disableFuture = false,
  monthView,
  onChange,
}: {
  maxDate?: Dayjs;
  minDate?: Dayjs;
  disableFuture?: boolean;
  monthView?: boolean;
  disabled?: boolean;
  label: string;
  value: Dayjs;
  required?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={disabled ? null : value}
        maxDate={maxDate || dayjs('2100-01-01T00:00:00.000')}
        minDate={minDate || dayjs('2000-01-01T00:00:00.000')}
        disableFuture={disableFuture}
        views={monthView ? ['year', 'month'] : ['year', 'day']}
        format='DD/MM/YYYY'
        disabled={disabled}
        onChange={(e) => {
          onChange(e);
        }}
        slots={{
          // textField: UITextField as any,
          textField: (params: any) => {
            return (
              <UITextField
                {...params}
                InputProps={{ sx: { width: '150px' }, ...params.InputProps }}
              />
            );
          },
          openPickerIcon: DateIcon,
        }}
      />
    </LocalizationProvider>
  );
}
