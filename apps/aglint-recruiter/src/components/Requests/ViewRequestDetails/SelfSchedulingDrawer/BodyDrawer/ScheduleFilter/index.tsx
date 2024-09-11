import { ButtonSolid } from '@devlink/ButtonSolid';
import { Stack, Typography } from '@mui/material';

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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refetch: () => {},
  });

  return (
    <Stack spacing={2}>
      <ErrorConflicts />
      <Stack spacing={1} width={'100%'}>
        <Typography variant='body1'>Date Range</Typography>
        <RangePicker
          dateRange={localFilters.dateRange}
          setDateRange={(value) => {
            setLocalFilters({
              dateRange: value,
            });
          }}
        />
      </Stack>
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
    </Stack>
  );
}

export default ScheduleFilter;
