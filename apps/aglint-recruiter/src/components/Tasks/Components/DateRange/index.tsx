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
  disablePast = true,
}: {
  onChange: (x: any) => void;
  value: any[];
  disablePast?: boolean;
}) {
  return (
    <Stack
      sx={{
        '.MuiDateRangeCalendar-root > div:first-child': {
          display: 'none',
        },
        '&>div': {
          height: 334,
        },
        '& .MuiDayCalendar-weekContainer': {
          columnGap: '6.5px',
          py: '1px',
        },
        '& .MuiDateRangePickerDay-rangeIntervalPreview': {
          border: 'none',
        },
        '& .MuiDayCalendar-weekContainer .MuiButtonBase-root': {
          border: 'none',
          fontWeight: 400,
          height: '32.7px',
          width: '32.7px',
          fontSize: '0.72rem',
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
          calendars={1}
          onChange={onChange}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DateRange;
