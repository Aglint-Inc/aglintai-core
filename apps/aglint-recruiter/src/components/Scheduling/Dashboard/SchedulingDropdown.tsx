import { FilterDropDownDash } from './FilterDropDownDash';

const SchedulingDropdown = ({
  type,
  setType,
}: {
  type: string;
  // eslint-disable-next-line no-unused-vars
  setType: any;
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
