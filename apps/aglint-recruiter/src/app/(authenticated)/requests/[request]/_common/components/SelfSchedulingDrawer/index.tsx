import { useMeetingList } from '@requests/hooks';
import { useEffect } from 'react';

import UIDrawer from '@/components/Common/UIDrawer';

import BodyDrawer from './_common/components';
import ButtonMain from './_common/components/ButtonGroup';
import Calendar from './_common/components/Calendar';
import { useSelfSchedulingDrawer } from './_common/hooks/useSelfSchedulingDrawer';
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
  const { data: allSessions } = useMeetingList();
  const { resetStateSelfScheduling } = useSelfSchedulingDrawer();

  useEffect(() => {
    return () => {
      resetStateSelfScheduling();
    };
  }, []);

  const isDebrief = allSessions.some(
    (ele) => ele?.interview_session?.session_type === 'debrief',
  );

  return (
    <>
      <UIDrawer
        size='full'
        open={isSelfScheduleDrawerOpen}
        onClose={() => {
          if (fetchingPlan || isSendingToCandidate) return;
          resetStateSelfScheduling();
        }}
        title={isDebrief ? 'Scheduled Debiref' : 'Self Scheduling Request'}
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
