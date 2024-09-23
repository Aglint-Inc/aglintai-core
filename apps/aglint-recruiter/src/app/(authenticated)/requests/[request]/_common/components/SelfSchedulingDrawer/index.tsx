import UIDrawer from '@/components/Common/UIDrawer';

import BodyDrawer from './_common/components/BodyDrawer';
import ButtonMain from './_common/components/ButtonGroup';
import Calendar from './_common/components/Calendar';
import { useSelfSchedulingDrawer } from './_common/hooks/hooks';
import { useSelfSchedulingFlowStore } from './_common/store/store';

function SelfSchedulingDrawer() {
  const {
    isSelfScheduleDrawerOpen,
    stepScheduling,
    fetchingPlan,
    isSendingToCandidate,
  } = useSelfSchedulingFlowStore((state) => ({
    isSelfScheduleDrawerOpen: state.isSelfScheduleDrawerOpen,
    stepScheduling: state.stepScheduling,
    fetchingPlan: state.fetchingPlan,
    isSendingToCandidate: state.isSendingToCandidate,
  }));

  const { resetStateSelfScheduling } = useSelfSchedulingDrawer();

  return (
    <>
      <UIDrawer
        size='full'
        open={isSelfScheduleDrawerOpen}
        onClose={() => {
          if (fetchingPlan || isSendingToCandidate) return;
          resetStateSelfScheduling();
        }}
        title={'Self Scheduling Request'}
        slotBottom={
          !fetchingPlan && stepScheduling !== 'success_screen' ? (
            <ButtonMain />
          ) : (
            <></>
          )
        }
        calendar={<Calendar />}
      >
        <div className='w-[550px]'>
          <BodyDrawer />
        </div>
      </UIDrawer>
    </>
  );
}

export default SelfSchedulingDrawer;
