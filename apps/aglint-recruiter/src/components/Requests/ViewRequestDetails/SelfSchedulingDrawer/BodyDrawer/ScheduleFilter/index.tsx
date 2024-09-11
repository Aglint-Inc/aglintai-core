import { ButtonSolid } from '@devlink/ButtonSolid';
import { Typography } from '@mui/material';

import { RangePicker } from '@/components/ApplicationDetail/SlotBody/InterviewTabContent/_common/components/ScheduleDialog';

import { useSelfSchedulingDrawer } from '../../hooks';
import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store';
import DateRangeField from './DateRangeField';
import ErrorConflicts from './ErrorConflicts';
import PreferedInterviewers from './PreferedInterviewers';
import ToogleList from './ToogleList';

function ScheduleFilter() {
  const { localFilters } = useSelfSchedulingFlowStore((state) => ({
    localFilters: state.localFilters,
  }));

  const { filterSlots } = useSelfSchedulingDrawer({
    refetch: () => {
      //
    },
  });

  return (
    <div className='space-y-2'>
      <ErrorConflicts />
      <div className='space-y-1 w-full'>
        <Typography variant='body1'>Date Range</Typography>
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
      <ButtonSolid
        color={'neutral'}
        onClickButton={{
          onClick: filterSlots,
        }}
        textButton={'Apply Filters'}
        size={2}
      />
    </div>
  );
}

export default ScheduleFilter;
