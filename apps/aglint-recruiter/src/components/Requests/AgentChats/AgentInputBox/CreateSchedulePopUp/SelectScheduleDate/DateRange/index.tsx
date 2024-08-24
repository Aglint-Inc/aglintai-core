/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import {
  DateRangeCalendar,
  LocalizationProvider,
} from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangeProps {
  onChange: (date: [Dayjs, Dayjs]) => void;
  value: [Dayjs, Dayjs];
  disablePast?: boolean;
  calendars?: 1 | 2 | 3;
}

function DateRange({
  onChange,
  value,
  disablePast = true,
  calendars = 1,
}: DateRangeProps) {
  return (
    <Stack
      sx={{
        '.MuiDateRangeCalendar-root > div:first-child': {
          display: 'none',
          p: '0px',
        },
        '.MuiDayCalendar-slideTransition': {
          minHeight: 220,
        },
        // '& .MuiDayCalendar-weekContainer': {
        //   margin: '0px',
        // },
        // '& .MuiDayCalendar-weekContainer div div': {
        //   p: '0.5px 1.7px',
        //   height: '38px',
        // },
        // '&>div': {
        //   height: 334,
        //   width: '100%',
        // },
        // '& .MuiDateRangeCalendar-monthContainer': {
        //   width: '100%',
        // },
        // '& .MuiDayCalendar-weekContainer .MuiButtonBase-root': {
        // },
        // '& .MuiPickersSlideTransition-root': {
        //   minHeight: 235,
        // },
      }}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangeCalendar
          sx={{
            '& .MuiPickersCalendarHeader-root': {
              marginTop: '11px',
              marginBottom: '3px',
              paddingLeft: '24px',
              paddingRight: '12px',
            },
            '& .MuiPickersSlideTransition-root': {
              minWidth: '320px',
            },
            '& .MuiPickersDay-root': {
              fontFamily: 'var(--text)',
              fontWeight: '400',
              fontSize: 'var(--font-size-2)',
              lineHeight: 'var(--line-height-2)',
              letterSpacing: 'var(--letter-spacing-1)',
              color: 'var(--neutral-12)',
              width: '32px',
              height: '32px',
              margin: '0 2px',
              borderRadius: '50%',
              padding: '0',
              backgroundColor: 'transparent',
            },
          }}
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
