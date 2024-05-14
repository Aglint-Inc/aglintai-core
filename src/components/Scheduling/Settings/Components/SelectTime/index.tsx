import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

function SelectTime({
  i,
  value,
  onSelect,
  disable,
  minTime = undefined,
  maxTime = undefined,
  disableIgnoringDatePartForTimeValidation,
}: {
  i?: number;
  value: any;
  onSelect: any;
  disable?: boolean;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  disableIgnoringDatePartForTimeValidation?: boolean;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker
        defaultValue={value}
        onAccept={(value) => {
          onSelect(value, i);
        }}
        format='hh:mm A'
        disabled={disable}
        minTime={minTime}
        maxTime={maxTime}
        disableIgnoringDatePartForTimeValidation={
          disableIgnoringDatePartForTimeValidation
        }
        ampm={false}
      />
    </LocalizationProvider>
  );
}

export default SelectTime;
