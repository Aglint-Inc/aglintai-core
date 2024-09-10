import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Filter } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

import { useSelfSchedulingFlowStore } from '../../store';
import ScheduleFilter from '../ScheduleFilter';

function FilterButton() {
  const { filterLoading } = useSelfSchedulingFlowStore((state) => ({
    filterLoading: state.filterLoading,
  }));

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <UIButton size={'sm'} leftIcon={<Filter />} isLoading={filterLoading}>
            Filters
          </UIButton>
        </PopoverTrigger>
        <PopoverContent
          style={{
            width: '520px',
            padding: '16px',
            backgroundColor: '#fff',
          }}
        >
          <ScheduleFilter />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FilterButton;
