import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SpecializedTimePicker from '@/src/components/Common/SpecializedTimePicker';

function SelectTime({
  i,
  value,
  onSelect,
  disable,
}: {
  i?: number;
  value: any;
  onSelect: any;
  disable?: boolean;
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
      />
    </LocalizationProvider>
  );
}

export default SelectTime;
