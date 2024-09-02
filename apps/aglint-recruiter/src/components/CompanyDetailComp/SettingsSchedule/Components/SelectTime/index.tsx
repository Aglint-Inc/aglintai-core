import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';

import { GlobalIcon } from '@/devlink/GlobalIcon';

function SelectTime({
  i,
  value,
  onSelect,
  disable,
  minTime = undefined,
  maxTime = undefined,
  width = 'auto',
  disableIgnoringDatePartForTimeValidation,
}: {
  i?: number;
  value: any;
  onSelect: any;
  disable?: boolean;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  width?: string;
  disableIgnoringDatePartForTimeValidation?: boolean;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker
        defaultValue={value}
        onChange={(value) => {
          onSelect(value, i);
        }}
        format='hh:mm A'
        disabled={disable}
        minTime={minTime}
        maxTime={maxTime}
        disableIgnoringDatePartForTimeValidation={
          disableIgnoringDatePartForTimeValidation
        }
        slots={{
          openPickerIcon: ClockIcon,
        }}
        ampm={false}
        slotProps={{
          textField: {
            sx: { width: width },
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default SelectTime;

export function ClockIcon() {
  return <GlobalIcon iconName='schedule' />;
}
