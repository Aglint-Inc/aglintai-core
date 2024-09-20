import { Plus } from 'lucide-react';

import FilterButton from './UI/filterButton';
import { FilterOptions } from './UI/options';

export function AddFilterComp({
  filters,
  setVisible,
}: {
  filters: { id: string; label: string }[];
  // eslint-disable-next-line no-unused-vars
  setVisible: (index: number) => void;
}) {
  return (
    <FilterButton
      text='Add'
      slotLeftIcon={<Plus size={14} />}
      popover={
        <FilterOptions
          optionList={filters}
          selectedItems={[]}
          setSelectedItems={(val) => setVisible(val as unknown as number)}
          nested={false}
        />
      }
    />
  );
}
