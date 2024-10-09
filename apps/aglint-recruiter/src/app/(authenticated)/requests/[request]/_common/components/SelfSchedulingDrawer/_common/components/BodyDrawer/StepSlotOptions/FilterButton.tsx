import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Filter } from 'lucide-react';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { useSelfSchedulingFlowStore } from '../../../store/store';
import ScheduleFilter from '../ScheduleFilter';

function FilterButton() {
  const { filterLoading } = useSelfSchedulingFlowStore((state) => ({
    filterLoading: state.filterLoading,
  }));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <UIButton
            size={'sm'}
            leftIcon={<Filter />}
            isLoading={filterLoading}
            onClick={() => setIsOpen(true)}
          >
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
          <ScheduleFilter setIsOpen={setIsOpen} />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FilterButton;
