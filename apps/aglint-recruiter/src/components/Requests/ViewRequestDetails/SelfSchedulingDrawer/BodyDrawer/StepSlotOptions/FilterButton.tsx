import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Filter } from 'lucide-react';
import { useSelfSchedulingFlowStore } from '../../store';
import ScheduleFilter from '../ScheduleFilter';

function FilterButton() {
  const { filterLoading, anchorEl } = useSelfSchedulingFlowStore((state) => ({
    filterLoading: state.filterLoading,
    anchorEl: state.anchorEl,
  }));
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <UIButton
            size={'sm'}
            leftIcon={<Filter />}
            onClick={() => {
              setOpen(true);
            }}
            isLoading={filterLoading}
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
          <ScheduleFilter />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FilterButton;
