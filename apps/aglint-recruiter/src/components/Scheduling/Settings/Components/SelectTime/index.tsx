import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import { GlobalIcon } from '@/devlink/GlobalIcon';

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
      />
    </LocalizationProvider>
  );
}

export default SelectTime;

export function ClockIcon() {
  return (
    <GlobalIcon iconName='schedule' />
    // <svg
    //   width='14'
    //   height='14'
    //   viewBox='0 0 12 12'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M11.25 6C11.2344 5.04688 11 4.17188 10.5469 3.375C10.0781 2.57812 9.4375 1.9375 8.625 1.45312C7.79688 0.984375 6.92188 0.75 6 0.75C5.07812 0.75 4.20312 0.984375 3.375 1.45312C2.5625 1.9375 1.92188 2.57812 1.45312 3.375C1 4.17188 0.765625 5.04688 0.75 6C0.765625 6.95312 1 7.82812 1.45312 8.625C1.92188 9.42188 2.5625 10.0625 3.375 10.5469C4.20312 11.0156 5.07812 11.25 6 11.25C6.92188 11.25 7.79688 11.0156 8.625 10.5469C9.4375 10.0625 10.0781 9.42188 10.5469 8.625C11 7.82812 11.2344 6.95312 11.25 6ZM0 6C0.015625 4.90625 0.28125 3.90625 0.796875 3C1.32812 2.09375 2.0625 1.35938 3 0.796875C3.95312 0.265625 4.95312 0 6 0C7.04688 0 8.04688 0.265625 9 0.796875C9.9375 1.35938 10.6719 2.09375 11.2031 3C11.7188 3.90625 11.9844 4.90625 12 6C11.9844 7.09375 11.7188 8.09375 11.2031 9C10.6719 9.90625 9.9375 10.6406 9 11.2031C8.04688 11.7344 7.04688 12 6 12C4.95312 12 3.95312 11.7344 3 11.2031C2.0625 10.6406 1.32812 9.90625 0.796875 9C0.28125 8.09375 0.015625 7.09375 0 6ZM5.625 2.625C5.64062 2.39062 5.76562 2.26563 6 2.25C6.23438 2.26563 6.35938 2.39062 6.375 2.625V5.78906L8.46094 7.19531C8.63281 7.33594 8.66406 7.50781 8.55469 7.71094C8.41406 7.88281 8.24219 7.91406 8.03906 7.80469L5.78906 6.30469C5.67969 6.22656 5.625 6.125 5.625 6V2.625Z'
    //     fill='#68737D'
    //   />
    // </svg>
  );
}
