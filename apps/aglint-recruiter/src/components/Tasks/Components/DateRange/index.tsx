/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import {
  DateRangeCalendar,
  LocalizationProvider,
} from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

function DateRange({
  onChange,
  value,
  disablePast = true,
  calendars = 1,
}: {
  onChange: (date: [Dayjs, Dayjs]) => void;
  value: [Dayjs, Dayjs];
  disablePast?: boolean;
  calendars?: 1 | 2 | 3;
}) {
  return (
    <Stack
      sx={{
        '.MuiDateRangeCalendar-root > div:first-child': {
          display: 'none',
          p: '0px',
        },
        '& .MuiDayCalendar-weekContainer': {
          margin: '0px',
        },
        '& .MuiDayCalendar-weekContainer div div': {
          p: '0.5px 1.7px',
          height: '38px',
        },
        '&>div': {
          height: 334,
          width: '100%',
          px: '7px',
        },
        '& .MuiDateRangeCalendar-monthContainer': {
          width: '100%',
        },
        '& .MuiDayCalendar-weekContainer .MuiButtonBase-root': {
          border: 'none',
          fontWeight: 400,
          height: '32.7px',
          width: '32.7px',
          fontSize: '0.72rem',
        },
        '& .MuiPickersSlideTransition-root': {
          minHeight: 235,
        },
      }}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangeCalendar
          disablePast={disablePast}
          defaultValue={
            value.length
              ? [dayjs(value[0]), dayjs(value[1])]
              : [dayjs(), dayjs()]
          }
          calendars={calendars}
          onChange={onChange}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DateRange;
