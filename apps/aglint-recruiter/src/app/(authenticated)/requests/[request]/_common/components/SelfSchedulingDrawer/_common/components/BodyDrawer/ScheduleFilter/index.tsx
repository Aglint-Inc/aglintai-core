import { UIButton } from '@/components/Common/UIButton';
import { RangePicker } from '@/jobs/job/application/components/ScheduleDialog';

import { useSelfSchedulingDrawer } from '../../../hooks/useSelfSchedulingDrawer';
import {
  setLocalFilters,
  useSelfSchedulingFlowStore,
} from '../../../store/store';
import DateRangeField from './DateRangeField';
import ErrorConflicts from './ErrorConflicts';
import PreferedInterviewers from './PreferedInterviewers';
import ToogleList from './ToogleList';

function ScheduleFilter() {
  const { localFilters } = useSelfSchedulingFlowStore((state) => ({
    localFilters: state.localFilters,
  }));

  const { filterSlots } = useSelfSchedulingDrawer();

  return (
    <div className='space-y-2'>
      <ErrorConflicts />
      {/* <div className='w-full space-y-1'>
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
      </div> */}
      <ToogleList />
      <DateRangeField />
      <PreferedInterviewers />
      <UIButton variant='secondary' onClick={() => filterSlots()}>
        Apply Filters
      </UIButton>
    </div>
  );
}

export default ScheduleFilter;
