import { Stack } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { GlobalIcon } from '@/devlink/GlobalIcon';
function DateSelect({
  getDate,
  dateRef,
  selectedDates,
}: {
  getDate: any;
  dateRef: any;
  selectedDates: any[];
}) {
  return (
    <Stack
      sx={{
        '& .MuiDayCalendar-weekContainer .Mui-disabled': {
          bgcolor: '#f56600aa',
          content: '"✦"',
          color: 'var(--accent-12)',
        },
        '& .MuiDayCalendar-weekContainer .Mui-disabled:after': {
          content: '"✦"',
          color: 'var(--accent-11)',
          fontSize: '10px',
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          minDate={dayjs(`1-1-${dayjs().year()}`)}
          maxDate={dayjs(`12-31-${dayjs().year()}`)}
          format='MM/DD/YYYY'
          ref={dateRef}
          onChange={getDate}
          shouldDisableDate={(date) => {
            return selectedDates
              .map((item) => item.date)
              .includes(dayjs(date).format('DD MMM YYYY'));
          }}
          slots={{
            openPickerIcon: DateIcon,
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DateSelect;

export function DateIcon() {
  return (
    <GlobalIcon iconName='calendar_today'  size={5} weight={'regular'}/>
  );
}
