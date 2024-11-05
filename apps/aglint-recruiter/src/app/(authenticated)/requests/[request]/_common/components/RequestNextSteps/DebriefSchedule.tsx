import { dayjsLocal } from '@aglint/shared-utils';
import { useRequest } from '@request/hooks';

import { UIButton } from '@/common/UIButton';

import { useFindAvailibility } from '../SelfSchedulingDrawer/_common/hooks/useFindAvailibility';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '../SelfSchedulingDrawer/_common/store/store';

const DebriefSchedule = () => {
  const { findAvailibility } = useFindAvailibility();
  const { requestDetails } = useRequest();

  const { fetchingPlan } = useSelfSchedulingFlowStore();

  return (
    <>
      <UIButton
        variant='default'
        size='sm'
        data-testid='schedule-debrief-btn'
        isLoading={fetchingPlan}
        onClick={async () => {
          if (fetchingPlan) return;
          const scheduleStartDate = dayjsLocal().isAfter(
            requestDetails.schedule_start_date,
            'date',
          )
            ? dayjsLocal().toISOString()
            : requestDetails.schedule_start_date;
          const scheduleEndDate = dayjsLocal(scheduleStartDate).add(3, 'day');
          await findAvailibility({
            filters: initialFilters,
            dateRange: {
              start_date: scheduleStartDate,
              end_date: scheduleEndDate.toISOString(),
            },
          });

          setIsSelfScheduleDrawerOpen(true);
        }}
      >
        Schedule Debrief
      </UIButton>
    </>
  );
};

export default DebriefSchedule;
