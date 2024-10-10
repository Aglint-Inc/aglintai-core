import { ErrorBoundary } from 'react-error-boundary';

import { UIBadge } from '@/common/UIBadge';

import { useSelfSchedulingFlowStore } from '../store/store';
import EmailPreviewSelfSchedule from './EmailPreviewSelfSchedule';
import SelfScheduleSuccess from './SelfScheduleSuccess';
import StepSlotOptions from './StepSlotOptions';
import LoaderSlots from './ui/Loader';

function BodyDrawer() {
  const { stepScheduling, fetchingPlan } = useSelfSchedulingFlowStore(
    (state) => ({
      stepScheduling: state.stepScheduling,
      fetchingPlan: state.fetchingPlan,
    }),
  );

  return (
    <>
      <ErrorBoundary
        fallback={
          <>
            <UIBadge
              textBadge={'Error self scheduling. Please contact support'}
            />
          </>
        }
      >
        {!fetchingPlan ? (
          <>
            {stepScheduling === 'slot_options' ? (
              <StepSlotOptions />
            ) : stepScheduling === 'self_scheduling_email_preview' ? (
              <EmailPreviewSelfSchedule />
            ) : stepScheduling === 'success_screen' ? (
              <SelfScheduleSuccess />
            ) : (
              ''
            )}
          </>
        ) : (
          <LoaderSlots />
        )}
      </ErrorBoundary>
    </>
  );
}

export default BodyDrawer;
