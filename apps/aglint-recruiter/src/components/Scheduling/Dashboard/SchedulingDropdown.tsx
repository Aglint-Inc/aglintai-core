import { MenuItem, SelectChangeEvent, Stack } from '@mui/material';

import SelectionComp from '../../NewAssessment/Common/components/selection';

const SchedulingDropdown = <T extends any>({
  type,
  onChange,
}: {
  type: T;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: SelectChangeEvent<T>) => void;
}) => {
  const cards = [
    { label: 'Past Week', value: 'day' },
    { label: 'Past Month', value: 'week' },
    { label: 'Past Year', value: 'month' },
    { label: 'All Time', value: 'year' },
  ].map(({ label, value }, i) => (
    <MenuItem key={i} value={value}>
      <Stack sx={{fontSize:'12px'}}>{label}</Stack>
    </MenuItem>
  ));
  return (
    <SelectionComp value={type} onChange={onChange} height={30}>
      {cards}
    </SelectionComp>
  );
};

export default SchedulingDropdown;
