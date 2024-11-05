import { UIButton } from '@/common/UIButton';

import { useFindAvailibility } from '../SelfSchedulingDrawer/_common/hooks/useFindAvailibility';
import {
  setIsSelfScheduleDrawerOpen,
  useSelfSchedulingFlowStore,
} from '../SelfSchedulingDrawer/_common/store/store';

const DebriefSchedule = () => {
  const { onClickFindAvailability } = useFindAvailibility();

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
          await onClickFindAvailability();
          setIsSelfScheduleDrawerOpen(true);
        }}
      >
        Schedule Debrief
      </UIButton>
    </>
  );
};

export default DebriefSchedule;
