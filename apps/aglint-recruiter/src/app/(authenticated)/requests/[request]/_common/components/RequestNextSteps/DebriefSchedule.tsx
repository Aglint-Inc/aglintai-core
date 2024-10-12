import { dayjsLocal } from '@aglint/shared-utils';

import { UIButton } from '@/common/UIButton';

import { useFindAvailibility } from '../SelfSchedulingDrawer/_common/hooks/useFindAvailibility';
import {
  initialFilters,
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '../SelfSchedulingDrawer/_common/store/store';

const DebriefSchedule = () => {
  const { findAvailibility } = useFindAvailibility();

  const { fetchingPlan } = useSelfSchedulingFlowStore();

  return (
    <>
      <UIButton
        variant='default'
        size='sm'
        isLoading={fetchingPlan}
        onClick={async () => {
          if (fetchingPlan) return;
          await findAvailibility({
            filters: initialFilters,
            dateRange: {
              start_date: dayjsLocal().toISOString(),
              end_date: dayjsLocal().add(14, 'day').toISOString(),
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
