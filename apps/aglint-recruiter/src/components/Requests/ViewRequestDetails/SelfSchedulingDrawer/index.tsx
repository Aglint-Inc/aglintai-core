
import UIDrawer from '@/components/Common/UIDrawer';
import BodyDrawer from './BodyDrawer';
import ButtonMain from './ButtonGroup';
import Calendar from './Calendar';
import { useSelfSchedulingDrawer } from './hooks';
import { useSelfSchedulingFlowStore } from './store';

function SelfSchedulingDrawer({ refetch }: { refetch: () => void }) {
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

  const { resetStateSelfScheduling } = useSelfSchedulingDrawer({
    refetch,
  });

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
            <ButtonMain refetch={refetch} />
          ) : (
            <></>
          )
        }
        calendar={<Calendar />}
      >
        <BodyDrawer />
      </UIDrawer>
    </>
  );
}

export default SelfSchedulingDrawer;
