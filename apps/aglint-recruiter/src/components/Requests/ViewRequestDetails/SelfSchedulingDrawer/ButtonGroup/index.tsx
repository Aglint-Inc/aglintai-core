import { UIButton } from '@/components/Common/UIButton';
import { useSelfSchedulingDrawer } from '../hooks';
import { setStepScheduling, useSelfSchedulingFlowStore } from '../store';

function ButtonMain({ refetch }: { refetch: () => void }) {
  const { stepScheduling, isSendingToCandidate, fetchingPlan } =
    useSelfSchedulingFlowStore((state) => ({
      stepScheduling: state.stepScheduling,
      isSendingToCandidate: state.isSendingToCandidate,
      fetchingPlan: state.fetchingPlan,
    }));

  const { resetStateSelfScheduling, onClickPrimary } = useSelfSchedulingDrawer({
    refetch,
  });

  const primaryButtonText = () => {
    if (stepScheduling === 'slot_options') {
      return 'Continue';
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
