import SelfScheduleSuccess from '../SelfScheduleSuccess';
import { useSelfSchedulingFlowStore } from '../store';
import EmailPreviewSelfSchedule from './EmailPreviewSelfSchedule';
import LoaderSlots from './Loader';
import StepSlotOptions from './StepSlotOptions';

function BodyDrawer() {
  const { stepScheduling, fetchingPlan } = useSelfSchedulingFlowStore(
    (state) => ({
      stepScheduling: state.stepScheduling,
      fetchingPlan: state.fetchingPlan,
    }),
  );

  return (
    <>
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
    </>
  );
}

export default BodyDrawer;
