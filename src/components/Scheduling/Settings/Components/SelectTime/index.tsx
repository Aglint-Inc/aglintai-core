import {
    LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SpecializedTimePicker from '@/src/components/Common/SpecializedTimePicker';

function SelectTime({
  i,
  value,
  onSelect,
}: {
  i: number;
  value: any;
  onSelect: any;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SpecializedTimePicker
        defaultValue={value}
        //   label=''
        onChange={(value) => {
          onSelect(value, i);
        }}
      />
    </LocalizationProvider>
  );
}

export default SelectTime;
