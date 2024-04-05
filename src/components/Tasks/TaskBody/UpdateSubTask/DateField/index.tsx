import { Stack } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
function DateField({
  getDate,
  dateRef,
  defaultDate,
}: {
  getDate: any;
  dateRef: any;
  defaultDate: any;
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
        <DesktopDateTimePicker
          defaultValue={dayjs(defaultDate)}
          format='DD dddd, MMM YYYY'
          ref={dateRef}
          onChange={getDate}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DateField;
