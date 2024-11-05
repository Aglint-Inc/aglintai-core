import { useMeetingList } from '@requests/hooks';

import { UIButton } from '@/components/Common/UIButton';

import { useSelfSchedulingDrawer } from '../../hooks/useSelfSchedulingDrawer';
import {
  setStepScheduling,
  useSelfSchedulingFlowStore,
} from '../../store/store';

function ButtonMain() {
  const { stepScheduling, isSendingToCandidate, fetchingPlan } =
    useSelfSchedulingFlowStore((state) => ({
      stepScheduling: state.stepScheduling,
      isSendingToCandidate: state.isSendingToCandidate,
      fetchingPlan: state.fetchingPlan,
    }));

  const { resetStateSelfScheduling, onClickPrimary } =
    useSelfSchedulingDrawer();

  const { data } = useMeetingList();
  const isDebrief = data.some(
    (ele) => ele?.interview_session?.session_type === 'debrief',
  );

  const primaryButtonText = () => {
    if (stepScheduling === 'slot_options') {
      if (isDebrief) {
        return 'Schedule';
      } else {
        return 'Continue';
      }
    } else if (stepScheduling === 'self_scheduling_email_preview') {
      return 'Send to Candidate';
    }
  };
  return (
    <>
      <UIButton
        fullWidth
        size={'md'}
        variant='secondary'
        onClick={() => {
          if (isSendingToCandidate || fetchingPlan) return;
          if (stepScheduling === 'slot_options') {
            resetStateSelfScheduling();
          } else if (stepScheduling === 'self_scheduling_email_preview') {
            setStepScheduling('slot_options');
          }
        }}
      >
        {stepScheduling === 'slot_options' ? 'Close' : 'Back'}
      </UIButton>

      <UIButton
        fullWidth
        variant='default'
        isLoading={isSendingToCandidate}
        size={'md'}
        data-testid='self-scheduling-primary-btn'
        onClick={async () => {
          if (isSendingToCandidate) return;
          await onClickPrimary();
        }}
      >
        {primaryButtonText()}
      </UIButton>
    </>
  );
}

export default ButtonMain;
