import { Stack } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
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
          color: '#000',
        },
        '& .MuiDayCalendar-weekContainer .Mui-disabled:after': {
          content: '"✦"',
          color: '#f56600',
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

export function DateIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 14 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.5 2.5C3.8125 2.52083 3.97917 2.6875 4 3V4.5H10V3C10.0208 2.6875 10.1875 2.52083 10.5 2.5C10.8125 2.52083 10.9792 2.6875 11 3V4.5H12C12.5625 4.52083 13.0312 4.71875 13.4062 5.09375C13.7812 5.46875 13.9792 5.9375 14 6.5V7.5V8.5V16.5C13.9792 17.0625 13.7812 17.5312 13.4062 17.9062C13.0312 18.2812 12.5625 18.4792 12 18.5H2C1.4375 18.4792 0.96875 18.2812 0.59375 17.9062C0.21875 17.5312 0.0208333 17.0625 0 16.5V8.5V7.5V6.5C0.0208333 5.9375 0.21875 5.46875 0.59375 5.09375C0.96875 4.71875 1.4375 4.52083 2 4.5H3V3C3.02083 2.6875 3.1875 2.52083 3.5 2.5ZM13 8.5H1V16.5C1 16.7917 1.09375 17.0312 1.28125 17.2188C1.46875 17.4062 1.70833 17.5 2 17.5H12C12.2917 17.5 12.5312 17.4062 12.7188 17.2188C12.9062 17.0312 13 16.7917 13 16.5V8.5ZM12 5.5H2C1.70833 5.5 1.46875 5.59375 1.28125 5.78125C1.09375 5.96875 1 6.20833 1 6.5V7.5H13V6.5C13 6.20833 12.9062 5.96875 12.7188 5.78125C12.5312 5.59375 12.2917 5.5 12 5.5Z'
        fill='#68737D'
      />
    </svg>
  );
}
