import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';

import { useSelfSchedulingDrawer } from '../hooks';
import { setStepScheduling, useSelfSchedulingFlowStore } from '../store';

function ButtonMain({ refetch }: { refetch: () => void }) {
  const { stepScheduling, isSendingToCandidate } = useSelfSchedulingFlowStore(
    (state) => ({
      stepScheduling: state.stepScheduling,
      isSendingToCandidate: state.isSendingToCandidate,
    }),
  );

  const { resetStateSelfScheduling, onClickPrimary } = useSelfSchedulingDrawer({
    refetch,
  });

  const primaryButtonText = () => {
    if (
      stepScheduling === 'preference' ||
      stepScheduling === 'pick_date' ||
      stepScheduling === 'slot_options'
    ) {
      return 'Continue';
    } else if (stepScheduling === 'self_scheduling_email_preview') {
      return 'Send to Candidate';
    }
  };
  return (
    <>
      <ButtonSoft
        size={2}
        color={'neutral'}
        textButton={stepScheduling === 'pick_date' ? 'Close' : 'Back'}
        onClickButton={{
          onClick: () => {
            if (stepScheduling === 'pick_date') {
              resetStateSelfScheduling();
            } else if (stepScheduling === 'slot_options') {
              setStepScheduling('preference');
            } else if (stepScheduling === 'preference') {
              setStepScheduling('pick_date');
            } else if (stepScheduling === 'self_scheduling_email_preview') {
              setStepScheduling('slot_options');
            }
          },
        }}
      />

      <ButtonSolid
        isLoading={isSendingToCandidate}
        size={2}
        textButton={primaryButtonText()}
        onClickButton={{
          onClick: async () => {
            await onClickPrimary();
          },
        }}
      />
    </>
  );
}

export default ButtonMain;
