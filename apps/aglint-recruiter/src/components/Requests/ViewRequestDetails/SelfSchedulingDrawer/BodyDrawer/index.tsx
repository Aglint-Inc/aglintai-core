import { Stack } from '@mui/material';

import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';

import SelfScheduleSuccess from '../SelfScheduleSuccess';
import StepSlotOptions from '../StepSlotOptions';
import { useSelfSchedulingFlowStore } from '../store';
import EmailPreviewSelfSchedule from './EmailPreviewSelfSchedule';
import StepScheduleFilter from './StepScheduleFilter';
import SelectDateRange from './StepSelectDate/StepSelectDate';

function BodyDrawer() {
  const { stepScheduling, fetchingPlan } = useSelfSchedulingFlowStore(
    (state) => ({
      stepScheduling: state.stepScheduling,
      fetchingPlan: state.fetchingPlan,
    }),
  );

  return (
    <div>
      {!fetchingPlan ? (
        <>
          {stepScheduling === 'pick_date' ? (
            <SelectDateRange />
          ) : stepScheduling === 'preference' ? (
            <StepScheduleFilter />
          ) : stepScheduling === 'slot_options' ? (
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
        <Stack height={'calc(100vh - 96px)'}>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            height={'100%'}
            alignItems={'center'}
          >
            <Stack height={'150px'} width={'150px'}>
              <CandidateSlotLoad />
            </Stack>
          </Stack>
        </Stack>
      )}
    </div>
  );
}

export default BodyDrawer;
