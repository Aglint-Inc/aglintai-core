import { Stack } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
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
  var today = new Date();
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
        <DateCalendar
          // sx={calenderStyles}
          minDate={dayjs('1-1-2024')}
          defaultValue={dayjs(today)}
          onChange={getDate}
          ref={dateRef}
          shouldDisableDate={(date) => {
            return selectedDates.includes(dayjs(date).format('DD MMM YYYY'));
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DateSelect;
