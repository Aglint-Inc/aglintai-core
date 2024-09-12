import { useSelfSchedulingFlowStore } from '../../store/store';
import SelfScheduleSuccess from '../SelfScheduleSuccess';
import LoaderSlots from '../ui/Loader';
import EmailPreviewSelfSchedule from './EmailPreviewSelfSchedule';
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
