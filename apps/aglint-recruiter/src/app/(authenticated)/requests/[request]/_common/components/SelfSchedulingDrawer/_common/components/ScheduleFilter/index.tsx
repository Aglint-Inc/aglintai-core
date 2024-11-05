import { UIButton } from '@/components/Common/UIButton';
import { RangePicker } from '@/jobs/job/application/components/ScheduleDialog';

import { useFilterSlots } from '../../hooks/useFilterSlots';
import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store/store';
import DateRangeField from './DateRangeField';
import ErrorConflicts from './ErrorConflicts';
import PreferedInterviewers from './PreferedInterviewers';
import ToogleList from './ToogleList';

function ScheduleFilter({
  setIsOpen,
}: {
  setIsOpen: (_value: boolean) => void;
}) {
  const { localFilters } = useSelfSchedulingFlowStore((state) => ({
    localFilters: state.localFilters,
  }));

  const { filterSlots } = useFilterSlots();

  return (
    <div className='space-y-2'>
      <ErrorConflicts />
      <div className='w-full space-y-1'>
        <span className='text-base font-medium'>Date Range</span>
        {localFilters.dateRange && (
          <RangePicker
            dateRange={localFilters.dateRange}
            setDateRange={(value) => {
              setLocalFilters({
                dateRange: value,
              });
            }}
          />
        )}
      </div>
      <ToogleList />
      <DateRangeField />
      <PreferedInterviewers />
      <UIButton
        variant='secondary'
        onClick={() => {
          filterSlots();
          setIsOpen(false);
        }}
        data-testid='schedule-filter-apply-btn'
      >
        Apply Filters
      </UIButton>
    </div>
  );
}

export default ScheduleFilter;
