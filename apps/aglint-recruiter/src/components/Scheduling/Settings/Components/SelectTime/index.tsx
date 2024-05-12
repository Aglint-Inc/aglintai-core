import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import SpecializedTimePicker from '@/src/components/Common/SpecializedTimePicker';

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
      <SpecializedTimePicker
        defaultValue={value}
        //   label=''
        onChange={(value) => {
          onSelect(value, i);
        }}
        disable={disable}
        minTime={minTime}
        maxTime={maxTime}
        disableIgnoringDatePartForTimeValidation={
          disableIgnoringDatePartForTimeValidation
        }
      />
    </LocalizationProvider>
  );
}

export default SelectTime;
