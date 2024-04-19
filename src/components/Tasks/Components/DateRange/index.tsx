/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import {
  DateRangeCalendar,
  LocalizationProvider,
} from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs from 'dayjs';

function DateRange({
  onChange,
  value,
}: {
  onChange: (x: any) => void;
  value: any[];
}) {
  return (
    <Stack
      sx={{
        '.MuiDateRangeCalendar-root > div:first-child': {
          //   bgcolor: 'red.400',
          display: 'none',
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangeCalendar
          disablePast
          defaultValue={
            value.length
              ? [dayjs(value[0]), dayjs(value[1])]
              : [dayjs(), dayjs()]
          }
          calendars={1}
          onChange={onChange}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DateRange;
