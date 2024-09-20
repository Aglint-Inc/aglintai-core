import { FilterDropDownDash } from './FilterDropDownDash';

const SchedulingDropdown = ({
  type,
  setType,
}: {
  type: string;
  // eslint-disable-next-line no-unused-vars
  setType: any;
}) => {
  return (
    <FilterDropDownDash
      itemList={[
        { label: 'Past Week', value: 'day' },
        { label: 'Past Month', value: 'week' },
        { label: 'Past Year', value: 'month' },
        { label: 'All Time', value: 'year' },
      ]}
      onChange={setType}
      value={type}
    />
  );
};

export default SchedulingDropdown;
