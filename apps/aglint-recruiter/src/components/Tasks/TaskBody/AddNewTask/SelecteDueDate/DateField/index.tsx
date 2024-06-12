import { Stack } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
function DateField({
  getDate,
  dateRef,
  defaultDate,
  onClose,
}: {
  getDate: any;
  dateRef?: any;
  defaultDate?: any;
  onClose?: any;
}) {
  return (
    <Stack
      width={'100%'}
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
        <DesktopDateTimePicker
          // disablePast
          defaultValue={dayjs(defaultDate)}
          format='DD ddd, MMM YYYY hh:mm'
          ref={dateRef}
          // onChange={getDate}
          onClose={onClose}
          onAccept={getDate}
          value={dayjs(defaultDate)}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DateField;
